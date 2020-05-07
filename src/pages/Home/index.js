import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import './style.css';

export default function Home() {
   const[listPost, setListPost] = useState([]);

   useEffect(() => {
      firebase.getAllPosts().then(posts =>{
         let newPostList = [];

         posts.forEach(post =>{
            newPostList.push(post.data());
         });

         setListPost(newPostList.reverse()); 
      });

   },[]);

   return(
      <div className="home">
         <ul>
            {listPost.map(post =>(
               <li key={post.key}>
                  <h2>{post.title}</h2>
                  <p>Autor: <strong>{post.name}</strong></p>
                  <img src={post.url} alt="Capa"/>
                  <p>{post.description}</p>
               </li>
            ))}
         </ul>
      </div>
   );
}