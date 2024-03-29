import React from 'react';
import styled from 'styled-components';
import {Avatar, Button, IconButton} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator';
import {auth, db} from '../pages/firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import Chat from './Chat';


function SideBar() {
    const [user] =useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt('you can enter your email');

        if(!input) return null;

        if(EmailValidator.validate(input)&& !chatAlreadyExists(input) && input !== user.email){
            db.collection('chats').add({
               users: [user.email, input],

            })

        }
    };
    const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
        (chat) =>
            chat.data().users.find((user) => user === recipientEmail)?.length > 0);


    return(
    <Container>
        <Header>
            <UAvatar src={user.photoURL} onClick={() => auth.signOut() } />
            <IconContainer>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </IconContainer>
        </Header>
        <Search>
            <SearchIcon />
            <SearchInput placeholder="you can search here" />
        </Search>
        <SidebarButton onClick={createChat}>
            Start a new chat
        </SidebarButton>
        {chatsSnapshot?.docs.map((chat) => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users}
            />
        ))}

    </Container>
    );
}

export default SideBar;

const Container = styled.div`
flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 300px;
  overflow: scroll;

  ::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
   
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2px;
  padding: 20px;
  
`;
const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
  
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UAvatar = styled(Avatar)`
  cursor: pointer;
  :hover{
    opacity: 0.8;
    
  }
`;
const IconContainer = styled.div``;
