import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";

export const UserContext = createContext({ user: null, userLoaded: false });

class UserProvider extends Component {
  state = {
    user: null,
    userLoaded: false
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      console.log('userLoaded Provider', userAuth)
      const user = await generateUserDocument(userAuth);
      console.log('user', user)
      this.setState({ user, userLoaded: true });
     console.log("termina")
    });
  };
  render() {
    //if (!this.state.userLoaded) return <></>
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;