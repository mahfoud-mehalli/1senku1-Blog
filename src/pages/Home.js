import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Home = () => {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  });

  // const deletePost = async (id) => {
  //   const postDoc = doc(db, "posts", id);
  //   await deleteDoc(postDoc);
  // };

  return (
    <div className="home">
      <div className="postsContainer">
        {postLists.map((post) => {
          return(
            <div className="post" key={post.id}>
              <img src={post.selectedFile} alt="Post image" />
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <h3>@{post.author.name}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home