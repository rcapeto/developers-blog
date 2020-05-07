import React, { useState } from 'react';
import Routes from './routes';
import firebase from './firebase';
import './global.css';

export default function App() {
  const [initialized, setInitialized] = useState(false);

  firebase.isInitialized().then(information => {
    setInitialized(information);
  });

  return (
    initialized !== false ? <Routes/> :  <h1 style={{
      color:'#fff',
      fontSize: '30px'
  }}>Carregando...</h1>
  );
}