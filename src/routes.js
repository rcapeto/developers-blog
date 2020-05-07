import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/Home';
import Login from './pages/Login';
import Erro from './pages/Erro';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewPost from './pages/New';

export default function Routes() {
   return(
      <BrowserRouter>
         <Header/>
         <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route path="/dashboard/new" component={NewPost}/>
            <Route path="*" component={Erro}/>
         </Switch>
      </BrowserRouter>
   );
}