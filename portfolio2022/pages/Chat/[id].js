import React from 'react';
import styled from 'styled-components';
import SideBar from '../../components/sideBar';
import ChatScreen from '../../components/ChatScreen';
import {auth, db} from '../firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import GetRecipientEmail from "../../utils/getRecipientEmail";


function Chat({chat, messages}) {
    const [user] = useAuthState(auth);

    return(
    <Container>
        <Head>
            <title>Chat with {GetRecipientEmail(chat.users, user)}</title>
        </Head>
        <SideBar />
        <ChatContainer >
            <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>
    </Container>
)
;
}

export default Chat;

export async function getServerSideProps(context){
    const ref = db
        .collection("chats")
        .doc(context.query.id);

    const messageRef = await ref
        .collection('messages')
        .orderBy("timestamp","asc")
        .get();

    const messages =  messageRef.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate()
            .getTime()    }));
//prep the chats
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
};

return {
    props: {
        messages: JSON.stringify(messages),
        chat: chat
    }
}

}




const Container = styled.div`
display: flex;

`;
const Head = styled.div``;
const ChatContainer = styled.div`
flex: 1;
  height: 100vh;
  overflow: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-styles : none;
  scrollbar-width: none;
  
`;