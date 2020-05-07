import React, { useState, useEffect } from 'react';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import './style.css';
import firebase from '../../firebase';

export default function Dashboard() {
   const history = useHistory();
   const [name, setName] = useState('');
   const[email, setEmail] = useState('');

   useEffect(() => {
      setEmail(localStorage.getItem('userEmail'));
      setName(localStorage.getItem('userName'));

      if(!firebase.getCurrent()){
         history.push('/login');
      } else {
         firebase.getUserNameAndEmail().then(user =>{
            setName(user.data().name);
            setEmail(user.data().email);

            localStorage.setItem('userName', user.data().name);
            localStorage.setItem('userEmail', user.data().email);
         });
      }
   }, []);

   function goToNew() {
      history.push('/dashboard/new');
   }

   function logout(){
      firebase.logout();
      localStorage.clear();
      history.push('/login');
   }

   return(
         <div className="dashboard">
            <div className="logout">
               <h1>Bem-vindo, {name}</h1>
               <button onClick={logout}><FiPower color="#e74c3c" size={18}/></button>
            </div>
            <p>Logado com: <strong>{email}</strong></p>
            <button onClick={goToNew}>Escrever novo post</button>
         </div>
   );
}