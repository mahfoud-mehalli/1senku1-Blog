import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import './Home.css'

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
      {postLists.length === 0 ? (
        <h1>Create Your First Post!!</h1>
      ) : (
        postLists.map((post) => (
          <div className="post" key={post.id}>
            <img src={post.selectedFile} alt="Post Pic" />
            <div className="post-info">
              <div className="title-delete">
                <h1>{post.title}</h1>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <div>
                    <button className="deletePost" onClick={() => {deletePost(post.id);}}>
                      <p>Delete</p>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f4f4f4" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                    </button> 
                    <button className="editPost" onClick={() => {}}>
                      <p>Edit</p>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/></g></svg>
                    </button>                  
                  </div>
                )}
              </div>
              <p>{post.description}</p>
              <h3>@{post.author.name}</h3>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  )
}

export default Home