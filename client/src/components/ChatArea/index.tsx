import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useSendMessageMutation, useGetMessagesQuery } from '../../services/api';
import { jwtDecode } from 'jwt-decode';  // Import jwt-decode

interface ChatAreaProps {
  selectedUser: string | null;
}

const ChatArea: React.FC<ChatAreaProps> = ({ selectedUser }) => {
  const [message, setMessage] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch messages for the selected user
  const { data: messages, isLoading: isMessagesLoading } = useGetMessagesQuery({ receiverId: selectedUser as string }, { skip: !selectedUser });



  const [sendMessage] = useSendMessageMutation();

  // Extract user id from JWT token stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the token
        setUserId(decodedToken.userId); // Assuming the token has a `userId` field
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  const handleSendMessage = () => {
  if (selectedUser && message) {
    console.log("Sending message to: ", selectedUser);
    console.log("Message content: ", message);
    
    sendMessage({
      
        receiverId: selectedUser,
        content: message,
        media: null,  // Assuming no media is being sent for now
      
    })
      .unwrap()
      .then((response) => {
        console.log("Message sent successfully: ", response);
        setMessage('');
      })
      .catch((error) => {
        console.error("Error sending message: ", error);
      });
  }
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="chat-area"
    >
      <div style={{ height: '80%', overflowY: 'scroll' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {isMessagesLoading ? (
            <p>Loading...</p>
          ) : (
            messages.data.getMessages?.map((msg: any) => (
              <Box
                key={msg.id}
                sx={{
                  alignSelf: msg.senderId === userId ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.senderId === userId ? 'lightblue' : 'lightgray',
                  padding: 1,
                  borderRadius: 1,
                  maxWidth: '70%',
                }}
              >
                {msg.content}
              </Box>
            ))
          )}
        </Box>
      </div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Type a message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={isMessagesLoading || !message.trim()}
        >
          Send
        </Button>
      </Box>
    </motion.div>
  );
};

export default ChatArea;
