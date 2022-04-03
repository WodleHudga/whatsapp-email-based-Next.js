import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../pages/firebase";
import {useRouter} from "next/router";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from "@material-ui/icons/AttachFile";
import {Avatar, IconButton} from "@material-ui/core";
import {useCollection} from "react-firebase-hooks/firestore";
import Message from './Message';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import firebase from "firebase/compat/app";
import TimeAgo from 'timeago-react';
import GetRecipientEmail from "../utils/getRecipientEmail";



function ChatScreen({chat, messages}) {
    console.log(chat, messages)
    const [user] = useAuthState(auth);

    const EndOfMessageRef = useRef(null);

    const scrollToBottom = () =>{
        EndOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
    const [input, setInput] = useState("");


    const router = useRouter();

    const [messagesSnapshot] =
        useCollection( db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp", 'asc')
        );

    const [recipientSnapshot] =
        useCollection(db.collection("users").where('email', '==', GetRecipientEmail(chat.users, user))
        );


    const showMessage = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map((message) =>(
                <Message
                key={message.id}
                user={message.data().user}
                message={{
                ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }}
                />
            ));
        }
        else{
            return JSON.parse(messages).map((message) =>(
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ));
        }

    };

    const SendMessage = (e) =>{
         e.preventDefault();
        db.collection("users")
            .doc(user.uid)
            .set(
                {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),

            },{merge: true}
            );
        db.collection('chats').doc(router.query.id).collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user.email,
                photoURL: user.photoURL,
            })
        setInput("");
        scrollToBottom();
    };
     const recipient = recipientSnapshot?.docs?.[0]?.data();
    const RecipientEmail = GetRecipientEmail(chat.users, user );

      return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL}/>
                ) : (
                    <Avatar>{RecipientEmail[0]}</Avatar>
                )}

                <HeaderInformation>
                    <h4>{RecipientEmail}</h4>
                    {recipientSnapshot ? (
                        <p>Last active: {" "}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />

                            ): (
                                "Unavailable"
                            )}
                        </p>
                    ): (
                        <p>loading last active...</p>
                    )}

                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessage()}
                <EndOfMessage ref={EndOfMessageRef}/>
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonIcon />
                <Input value={input} onChange={ e => setInput(e.target.value)}/>
                <button hidden disabled={!input} type="submit" onClick={SendMessage} >send message</button>
                <MicIcon />
            </InputContainer>
        </Container>
    );
}

export default ChatScreen;

const InputContainer = styled.form`
display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  background-color: white;
bottom: 0;
  z-index: 100;
  outline: none;
  border: none;
  
`;

const Input = styled.input`
flex: 1;
  align-items: center;
  padding: 10px;
  position:sticky;
  bottom: 0;
  outline: none;
  border: none;
  background-color: whitesmoke;
  
`;

const EndOfMessage = styled.div`
margin-bottom: 50px;
`;

const MessageContainer = styled.div`
    padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
  
`;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;
  > h3{
    margin-bottom: 3px;
  }
  > p{
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;