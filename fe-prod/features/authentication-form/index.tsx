import React, { useContext } from "react";
import { AuthContext } from "reaction-contexts/AuthContext";
import Iframe from "react-iframe";
import SignInForm from "./login";
import SignOutForm from "./register";
import ForgotPassForm from "./forgot-password";


export default function AuthenticationForm() {
  const { authState } = useContext<any>(AuthContext);
  let RenderForm, url;

  if (authState.currentForm === "signIn") {
    //RenderForm = SignInForm;
    url = "/signin";
  }

  if (authState.currentForm === "signUp") {
    //RenderForm = SignOutForm;
    url = "/signup";
  }

  if (authState.currentForm === "forgotPass") {
    //RenderForm = ForgotPassForm;
    url = "/change-password";
  }

  return (
    <Iframe url={url}
      width="458px" height="561.6px" id="myId"
      frameBorder={0}
      styles={{ border: 0 }}
      display="block"
      position="relative" scrolling="no"
    />);
}
