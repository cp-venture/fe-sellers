import React, { useContext } from 'react';
import {
  LinkButton,
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  Input,
  Divider,
} from './authentication-form.style';
import { Facebook } from 'assets/icons/Facebook';
import { Google } from 'assets/icons/Google';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';
import simpleDDP from 'simpleddp';
import ws from 'isomorphic-ws';
let opts = {
  endpoint: "wss://accounts.craflo.com/websocket",
  SocketConstructor: ws,
  reconnectInterval: 5000
};
import {simpleDDPLogin} from "simpleddp-plugin-login"
const ddp =new simpleDDP(opts, [simpleDDPLogin])
let s = async ()=>{
  await ddp.connect()
  await ddp.login({
    password: "Aha@9857",
    user: {
      email: "wittycodes@gmail.com"
    }
  }).then((A)=>{
    // console.log(A)
    /*ddp.call("oauth/login", { challenge }, (oauthLoginError, redirectUrl) => {
      if (oauthLoginError) {
        reject(oauthLoginError);
      } else {
        resolve(redirectUrl);
      }
    });*/
  })
};
s().then(()=> {
    // console.log("Dhum machale")
})
/*
let g
fetch('https://demo.craflo.com/signin', {mode: 'cors'} ).then(function(response) {
  g = response.url // returns https://developer.mozilla.org/en-US/docs/Web/API/Response/flowers.jpg
  console.log(response.redirected, "pppadsfknadf")
  fetch(g, {method: 'POST'}).then(function(response) {
    console.log(response.url, "asdkadsfknadf")
  })
  });
*/

export default function SignInModal() {
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const toggleSignUpForm = () => {
    authDispatch({
      type: 'SIGNUP',
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: 'FORGOTPASS',
    });
  };

  const loginCallback = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', `${email}.${password}`);
      authDispatch({ type: 'SIGNIN_SUCCESS' });
      closeModal();
    }
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="welcomeBack" defaultMessage="Welcome Back" />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="loginText"
            defaultMessage="Login with your email &amp; password"
          />
        </SubHeading>
        <form onSubmit={loginCallback}>
          <Input
            type="email"
            placeholder={intl.formatMessage({
              id: 'emailAddressPlaceholder',
              defaultMessage: 'Email Address.',
            })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder={intl.formatMessage({
              id: 'passwordPlaceholder',
              defaultMessage: 'Password (min 6 characters)',
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            variant="primary"
            size="big"
            style={{ width: '100%' }}
            type="submit"
          >
            <FormattedMessage id="continueBtn" defaultMessage="Continue" />
          </Button>
        </form>
        <Divider>
          <span>
            <FormattedMessage id="orText" defaultMessage="or" />
          </span>
        </Divider>

        <Button
          variant="primary"
          size="big"
          style={{
            width: '100%',
            backgroundColor: '#4267b2',
            marginBottom: 10,
          }}
          onClick={loginCallback}
        >
          <IconWrapper>
            <Facebook />
          </IconWrapper>
          <FormattedMessage
            id="continueFacebookBtn"
            defaultMessage="Continue with Facebook"
          />
        </Button>

        <Button
          variant="primary"
          size="big"
          style={{ width: '100%', backgroundColor: '#4285f4' }}
          onClick={loginCallback}
        >
          <IconWrapper>
            <Google />
          </IconWrapper>
          <FormattedMessage
            id="continueGoogleBtn"
            defaultMessage="Continue with Google"
          />
        </Button>

        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id="dontHaveAccount"
            defaultMessage="Don't have any account?"
          />{' '}
          <LinkButton onClick={toggleSignUpForm}>
            <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up" />
          </LinkButton>
        </Offer>
      </Container>

      <OfferSection>
        <Offer>
          <FormattedMessage
            id="forgotPasswordText"
            defaultMessage="Forgot your password?"
          />{' '}
          <LinkButton onClick={toggleForgotPassForm}>
            <FormattedMessage id="resetText" defaultMessage="Reset It" />
          </LinkButton>
        </Offer>
      </OfferSection>
    </Wrapper>
  );
}
