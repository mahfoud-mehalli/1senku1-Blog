import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Home = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);


  return (
    <div className="home">
      <div className="postsContainer">
        {postLists.map((post) => {
          return(
            <div className="post" key={post.id}>
              <img src={post.selectedFile} alt="Post Pic" />
              <div className="title-delete">
                <h1>{post.title}</h1>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button className="deletePost" onClick={() => {deletePost(post.id);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f4f4f4" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                    <p>Delete Post</p>
                  </button>                  
                )}
              </div>
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