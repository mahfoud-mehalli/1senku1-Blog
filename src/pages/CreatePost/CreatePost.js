import React, { useState, useEffect } from "react";
import { TextField, Button } from '@material-ui/core';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { ref,uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from "uuid";
import './CreatePost.css'

function CreatePost({ isAuth }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [titleError, setTitleError] = useState(""); // State to hold title error message
  const [descriptionError, setDescriptionError] = useState(""); // State to hold description error message
  const [fileError, setFileError] = useState(""); // State to hold file error message


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
    if (!imageUpload) {
      setFileError("Please select a file");
      errorOccurred = true;
    } else {
      setFileError("");
    }

    if (errorOccurred) {
      return; // Stop function execution if any error occurred
    }



    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

  try {
    // Upload image to Firebase Storage
    await uploadBytes(imageRef, imageUpload);

    // Get download URL of the uploaded image
    const imageUrl = await getDownloadURL(imageRef);

    // Add document to Firestore collection with image URL
    await addDoc(postsCollectionRef, {
      title,
      description,
      imageUrl, // Include image URL in Firestore document
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });

    alert('Post created successfully');
    navigate("/");
  } catch (error) {
    console.log(error);
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
        <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}} />
        {fileError && <p style={{ color: "red" }}>{fileError}</p>} {/* Display file error message */}
        <Button onClick={createPost} variant="contained" size="large" fullWidth>Create Post</Button>
      </div>
    </div>
  );
}

export default CreatePost;