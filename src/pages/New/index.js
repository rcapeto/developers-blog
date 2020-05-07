import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import firebase from '../../firebase';
import './style.css';

export default function NewPost() {
   const history = useHistory();
   const[title, setTitle] = useState('');
   const[description, setDescription] = useState('');
   const[url, setUrl] = useState('');
   const[message, setMessage] = useState('');
   const[progress, setProgress] = useState(0);
   const name = localStorage.getItem('userName');

   useEffect(() => {
      if(!firebase.getCurrent()){
         history.push('/login');
      }
   }, []);

   function handleCreateNewPost(e) {
      e.preventDefault();

      if(url !== '' && title !== '' && description !== ''){

         firebase.createNewPost(name,title,description,url).then(() => {
            alert('Post criado com sucesso!');
            history.push('/dashboard');
         });

      } else {
         setMessage('Por favor, digite todos os campos.')
      }
   }

   async function getFile(e) {
      if(e.target.files.length > 0){
         const file = e.target.files[0];

         if(file.type === 'image/png' || file.type === 'image/jpeg' ){
            downloadInStorage(file);

         } else {
            alert('Por favor selecione um arquivo "PNG" ou "JPEG"');
         }
      }
   }

   async function downloadInStorage(file){
      const uid = firebase.getUserUid();

      const uploadTask = firebase.storage.ref(`images/${uid}/${file.name}`).put(file);

      await uploadTask.on('state_changed', loading =>{
         setProgress(Math.round((loading.bytesTransferred / loading.totalBytes) * 100));
      }, error => {
         console.error(error.message);

      }, success =>{

         firebase.storage.ref(`images/${uid}/${file.name}`).getDownloadURL().then( url => {
            setUrl(url);
         });
      });
   }

   return(
      <div className="new-post">
      <h1>Novo Usuário</h1>
      <form onSubmit={handleCreateNewPost}>
         <p>{message}</p>
         <label>Imagem:</label>
         <input 
            type="file"
            onChange={getFile}
         />
         {url ? 
            <img src={url} alt="Capa"/>
         :
            <progress
               max="100"
               value={progress}
            ></progress>
         }
         <label>Título:</label>
         <input 
            autoCorrect="false"
            autoFocus
            placeholder="Digite um título para o seu post"
            value={title}
            onChange={e => setTitle(e.target.value)}
         />
         <label>Descrição:</label>
         <textarea 
            autoCorrect="false"
            placeholder="Crie uma descrição para o seu post"
            value={description}
            onChange={e => setDescription(e.target.value)}
         ></textarea>
         <button type="submit">Criar novo post</button>
         <Link to="/dashboard">
            <FiArrowLeft size={16} color="#7159c1"/> Voltar para dashboard
         </Link>
      </form>
   </div>
   );
}