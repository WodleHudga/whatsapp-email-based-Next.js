import React from 'react';
import styled from 'styled-components';
import {Avatar} from '@material-ui/core';
import GetRecipientEmail from "../utils/getRecipientEmail";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from '../pages/firebase';
import {useCollection} from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";



function Chat({ id, users}) {
    const [user] = useAuthState(auth);

    const router = useRouter();

    const enterChat = () => {
        router.push(`/Chat/${id}`)
    }
    const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", GetRecipientEmail(users, user))

    );

    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = GetRecipientEmail(users, user)

    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar  src={recipient?.photoURL}/>
            ) : (
                <UserAvatar >{recipientEmail[0]}</UserAvatar>
            )
            }
            <p>{recipientEmail}</p>
        </Container>
    );
}

export default Chat;

const Container= styled.div`
display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover{
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;


`;
