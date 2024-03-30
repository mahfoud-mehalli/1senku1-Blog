import React, { useState, useEffect } from "react";
import { TextField, Button } from '@material-ui/core';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]); // Setting the selected file to state
  };

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {

    const file = selectedFile ? selectedFile : null; // Handling case when file is not selected
    const fileUrl = file ? URL.createObjectURL(file) : null; // Generating a URL for preview or other purposes
    
    try {
      await addDoc(postsCollectionRef, {
        title,
        description,
        selectedFile: fileUrl,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      });
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  },);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <TextField required onChange={(event) => {setTitle(event.target.value);}} variant="outlined" label="Title" fullWidth />
        <TextField required onChange={(event) => {setDescription(event.target.value);}} variant="outlined" label="Post Description" fullWidth multiline />
        <input type="file" onChange={handleFileUpload} />
        <Button onClick={createPost} variant="contained" size="large" type="submit" fullWidth>Create Post</Button>
      </div>
    </div>
  );
}

export default CreatePost;