import React, { useState, useEffect } from "react";
import { TextField, Button } from '@material-ui/core';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './EditPost.css'


function EditPost({ postId }) {
  // const { postId } = postId;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  const { postId: paramPostId } = useParams(); // Use a different variable name

  useEffect(() => {
    console.log("postId: ", paramPostId)
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", paramPostId)); // Use the new variable name
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setTitle(postData.title);
          setDescription(postData.description);
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.log("Error fetching post:", error);
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId, paramPostId]);

  const updatePost = async () => {
    try {
      // Check if title or description is empty
      if (!title || !description) {
        console.error("Title or description is empty");
        return;
      }
  
      // Update the post if title and description are not empty
      await updateDoc(doc(db, "posts", paramPostId), {
        title: title,
        description: description
      });
      console.log("Post updated successfully");
      navigate("/"); // Navigate back to the home page after updating the post
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="updatePostPage">
      <div className="CPupdatePostPage">
      <h1>Edit Post</h1>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
        fullWidth
      />
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
        fullWidth
        multiline
      />
      <p>The Image Can't Be Changed</p>
      <Button onClick={updatePost} variant="contained" size="large" fullWidth>
        Update
      </Button>
      </div>
    </div>
  );
}

export default EditPost;
