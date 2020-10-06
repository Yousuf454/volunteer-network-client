import React, { useContext, useState } from 'react';
import "firebase/auth";
import { handelGoogleSignIn, initializeFirebase } from './authoManager';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import './Login.scss'
import Logo from '../../images/logos/Group 1329.png';
import gogoleInconstants from '../../images/google.png'
const SignUp = () => {

  // login and reg state
  const [newUser, setNewUser] = useState(false);
  // pdivate pathc redirect
  const [loggedinUser, setloggedinUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" }}

    // initialize Firebase
    initializeFirebase()
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        sucess: false,
    });
     // google sing in ========================
     const googleSignIn = () => {
       handelGoogleSignIn()
        .then(res => {
          setUser(res);
          setloggedinUser(res);
          history.replace(from);
        })
     }
    return (
      <>
      <div className="logo">
          <img src={Logo} alt=""/>
      </div>
        <div className="Goole_sign">
          <h1>Logi In</h1>
          <button onClick={googleSignIn}><img src={gogoleInconstants} alt=""/><p>Continue With Google</p></button>
        </div>
    </>
  );
};

export default SignUp;