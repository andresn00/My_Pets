import React, { useContext } from 'react';
import {UserContext}from '../Providers/UserProvider';
import {Route,Redirect} from 'react-router-dom';

export default function ProtectedVetRoute(props){
   
    const {user, userLoaded}=useContext(UserContext)
    if (userLoaded){
        if(!user){
            return(<Redirect to={props.redirectTo}></Redirect>)
        }
        else {
            if (!user.isVet) {
                return(<Redirect to={props.redirectTo}></Redirect>)
            }
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