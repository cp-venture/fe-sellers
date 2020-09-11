import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import SignInForm from './login';
import SignOutForm from './register';
import ForgotPassForm from './forgot-password';
import { AuthContext } from 'contexts/auth/auth.context';
import Iframe from 'react-iframe'
import { openModal, closeModal } from '@redq/reuse-modal';
import PageLoading from "components/PageLoading/PageLoading";

export default function AuthenticationForm() {
  const { authState, authDispatch } = useContext<any>(AuthContext);
  const [state, setState] = React.useState({
    pageLoaded: false
  })

  React.useEffect(function mount() {
    let eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    let eventer = window[eventMethod];
    let messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    //let messageEvent = eventMethod == "attachEvent" ? "onGuestAuthPageLoad" : "GuestAuthPageLoad";


    // Listen to message from child window
    eventer(messageEvent,function(e) {
      console.log("catched hahahhah")
      console.log('parent received message!:  ',e.data);
      if(e.data == 'GuestAuthPageLoad'){
        setState({pageLoaded: true})
      }
      if(e.data == 'GuestAuthSuccess'){
        authDispatch({
          type: 'SIGNIN_SUCCESS',
        });
      }

    },false);
  });

  let RenderForm;

  if (authState.currentForm === 'signIn') {
    RenderForm = SignInForm;
  }

  if (authState.currentForm === 'signUp') {
    RenderForm = SignOutForm;
  }

  if (authState.currentForm === 'forgotPass') {
    RenderForm = ForgotPassForm;
  }



  return  (<>
      {!state.pageLoaded? <PageLoading /> : <></>}
        <iframe id="myIframe"
                 style={{ display: !state.pageLoaded? 'none': 'initial', maxWidth:'410px', width:'100%', minHeight: '642px', height: '100%', overflow:'visible'}}
                 src="https://demo.craflo.com/signin"
                 width="100%"
                 height="100%"
                 scrolling="no"
                 frameBorder="0"
        />
    </>)
}
