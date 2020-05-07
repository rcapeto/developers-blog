import React, { useState, useEffect } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import firebase from '../../firebase';

export default function Register() {
   const[name, setName] = useState('');
   const[email, setEmail] = useState('');
   const[password, setPassword] = useState('');
   const[message, setMessage] = useState('');
   const history = useHistory();

   useEffect(() => {
      if(firebase.getCurrent()){
         history.push('dashboard');
      }
   }, []);

   async function handleRegister(e){
      e.preventDefault();

      if(name !== '' && email !== '' && password !== ''){
         try{
            await firebase.register(name, email, password).then(() => {
               history.push('/dashboard');

            }).catch(error => {
               setMessage(`Error: ${error.code}, por favor, tente novamente.`);
               setEmail('');
               setPassword('');
            });

         }catch(error){
            console.error(error);
         }
      } else {
         setMessage('Por favor, digite todos os campos.');
      }
   }

   return(
      <div className="register">
         <h1>Novo Usuário</h1>
         <form onSubmit={handleRegister}>
            <p>{message}</p>
            <label>Nome:</label>
            <input 
               autoCorrect="false"
               autoFocus
               placeholder="Digite o seu nome"
               value={name}
               onChange={e => setName(e.target.value)}
            />
            <label>E-mail:</label>
            <input 
               type="email" 
               autoCorrect="false"
               placeholder="exemplo@email.com"
               value={email}
               onChange={e => setEmail(e.target.value)}
            />
            <label>Senha:</label>
            <input 
               type="password" 
               autoCorrect="false"
               placeholder="Digite sua senha"
               value={password}
               onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Cadastrar</button>
            <Link to="/login">
               <FiArrowLeft size={16} color="#7159c1"/> Ir para login
            </Link>
         </form>
      </div>
   );
}