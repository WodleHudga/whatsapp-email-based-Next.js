import React from 'react';
import Head from "next/head";
import styled from "styled-components";
import {Button} from "@mui/material";
import {auth, provider} from "./firebase";

function Login() {
    const signIn = () =>{
        auth.signInWithPopup(provider).catch(alert);

    }
    return (
        <Container>
            <Head>
                <title>Login here</title>
            </Head>
            <LoginContainer>
            <Logo src=" http://pngimg.com/uploads/whatsapp/whatsapp_PNG21.png"/>
                <Button variant="outlined" onClick={signIn}>sign in with Google</Button>
            </LoginContainer>
        </Container>
    );
}

export default Login;


const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background: whitesmoke;
`;
const LoginContainer = styled.div`
  display: flex;
  padding: 100px;
  align-items: center;
  background-color:white;
  border-radius: 5px;
  box-shadow: 0 4px 14px -3px rgba(0,0,0.7);
  flex-direction: column;
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin: 50px;
  
`;
