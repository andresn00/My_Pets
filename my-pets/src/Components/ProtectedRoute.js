import React, { useContext } from 'react';
import {UserContext}from '../Providers/UserProvider';
import {Route,Redirect} from 'react-router-dom';

export default function ProtectedRoute(props){
   
    const authValue=useContext(UserContext)
    if (authValue.userLoaded){
        if(!authValue.user){
            return(<Redirect to={props.redirectTo}></Redirect>)
        }
        else{
            return(
            
            <Route exact path={props.path}>
                {props.children}

            </Route>)
        }
    }
    else{
        
        return null
    }
}