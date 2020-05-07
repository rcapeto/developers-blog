import React, { useState, useEffect } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import firebase from '../../firebase';

export default function Login() {
   const[email, setEmail] = useState('');
   const[password, setPassword] = useState('');
   const[message, setAlert] = useState('');
   const history = useHistory();

   useEffect(() => {
      if(firebase.getCurrent()){
         history.push('/dashboard');
      }
   }, []);

   async function handleSubmit(e){
      e.preventDefault();

      if(email !== '' && password !== ''){

         try{
            await firebase.login(email, password).then(() => {
               history.push('/dashboard');

            }).catch(error =>{

                  if(error.code === 'auth/wrong-password'){
                     setAlert('Senha inválida, tente novamente.');
                     setPassword('');

                  } else if(error.code === 'auth/user-not-found'){
                     setAlert('Esse usuário não existe, por favor, tente novamente.');

                     setEmail('');
                     setPassword('');
                  }
            });

         }catch(error){
            console.error(error.message);
         }

      } else {
         setAlert('Por favor, digite todos os campos.');

         return;
      }
   }

   return(
      <div className="login">
         <h1>Login</h1>
         <form onSubmit={handleSubmit}>
            <p>{message}</p>
            <label>E-mail:</label>
            <input 
               type="email" 
               autoCorrect="false"
               autoFocus
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
            <button type="submit">Entrar</button>
            <Link to="/register">
               <FiLogIn size={16} color="#7159c1"/> Criar uma conta
            </Link>
         </form>
      </div>
   );
}