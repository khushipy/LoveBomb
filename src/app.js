import React, { useState } from 'react';
import {
  AppContainer,
  NoteContainer,
  TextInput,
  SaveButton,
  Message,
  Timestamp
} from './style';

const App = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSave = () => {
    if (!text.trim()) return;
    const timestamp = new Date().toLocaleString();
    setMessages([{ text, timestamp }, ...messages]);
    setText('');
  };

  return (
    <AppContainer>
      <NoteContainer>
        <TextInput
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something sweet... 💌"
        />
        <SaveButton onClick={handleSave}>Save Love Note</SaveButton>
      </NoteContainer>
      {messages.map((msg, idx) => (
        <Message key={idx}>
          {msg.text}
          <Timestamp>{msg.timestamp}</Timestamp>
        </Message>
      ))}
    </AppContainer>
  );
};

export default App;
