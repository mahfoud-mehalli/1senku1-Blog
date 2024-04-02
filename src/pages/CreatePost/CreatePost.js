import React, { useState, useEffect } from "react";
import { TextField, Button } from '@material-ui/core';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import './CreatePost.css'

function CreatePost({ isAuth }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [titleError, setTitleError] = useState(""); // State to hold title error message
  const [descriptionError, setDescriptionError] = useState(""); // State to hold description error message
  const [fileError, setFileError] = useState(""); // State to hold file error message

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]); // Setting the selected file to state
  };

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    let errorOccurred = false;

    // Check if title is empty
    if (!title) {
      setTitleError("Title cannot be empty");
      errorOccurred = true;
    } else {
      setTitleError("");
    }

    // Check if description is empty
    if (!description) {
      setDescriptionError("Description cannot be empty");
      errorOccurred = true;
    } else {
      setDescriptionError("");
    }

    // Check if file is empty
    if (!selectedFile) {
      setFileError("Please select a file");
      errorOccurred = true;
    } else {
      setFileError("");
    }

    if (errorOccurred) {
      return; // Stop function execution if any error occurred
    }

    const fileUrl = URL.createObjectURL(selectedFile); // Generating a URL for preview or other purposes
    
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
  }, [isAuth, navigate]); // Added dependencies for useEffect

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <TextField
          required
          error={!!titleError}
          helperText={titleError}
          onChange={(event) => {setTitle(event.target.value);}}
          variant="outlined"
          label="Title"
          fullWidth
        />
        <TextField
          required
          error={!!descriptionError}
          helperText={descriptionError}
          onChange={(event) => {setDescription(event.target.value);}}
          variant="outlined"
          label="Post Description"
          fullWidth
          multiline
        />
        <input type="file" onChange={handleFileUpload} />
        {fileError && <p style={{ color: "red" }}>{fileError}</p>} {/* Display file error message */}
        <Button onClick={createPost} variant="contained" size="large" fullWidth>Create Post</Button>
      </div>
    </div>
  );
}

export default CreatePost;
