import React, {useState, useEffect} from 'react';
import './App.css';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader
} from "@chatscope/chat-ui-kit-react";

export function App() {
  
  const nameEl = '';
  const initialValue = [];
  const [allItems, setData] = useState(initialValue);

  const handleSubmit = e => {
    console.log('A name was submitted: ' + e);
    sendMessage(e);
  }
 
  useEffect(() => {
    fetch('https://slacbot-fischer-client.herokuapp.com/get-messages', {
      mode: 'cors',
      method: 'post'
    })
    .then(response => response.json())
    .then(response => {
      setData(response);
    })
  }, [allItems]);

  return (
    <div className="App">
      <div style={{ position: "fixed", height: "500px" , width: "350px", bottom: "0", right: "50px" }}>
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
                <ConversationHeader.Content>
                    <span style={{}}>
                      Chat With an Expert
                    </span>
                </ConversationHeader.Content>
            </ConversationHeader>
            <MessageList>
              {allItems.map(item => (
                <Message
                  model={{
                    message: item.text,
                    sender: item.from,
                    direction: item.direction,
                    position: "single"
                  }}>
                    <Message.Header sender={item.from} />
                </Message>
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" attachButton={false} onSend={handleSubmit}/>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
    
  );
}

function sendMessage(msgParam){
  let msgToSend = msgParam;

  msgToSend = msgToSend.replace(' ', '&');

  let fetchUrl = 'https://slacbot-fischer-client.herokuapp.com/send-message/'+msgToSend;

  fetch(fetchUrl, {
    mode: 'cors',
    method: 'post'
  })
  .then(response => response.text())
  .then(response => {
    console.log(response);
  });
}

export default App;
