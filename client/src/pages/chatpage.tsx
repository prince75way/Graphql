// pages/ChatPage.tsx
import React, { useState } from 'react';
import { useGetAllUsersQuery } from '../services/api';
import {  Grid, Paper } from '@mui/material';
import UserList from '../components/UserList'
import ChatArea from '../components/ChatArea';

const ChatPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { data: users, error: usersError, isLoading: isUsersLoading } = useGetAllUsersQuery();

  if (isUsersLoading) {
    return <div>Loading users...</div>;
  }

  if (usersError) {
    return <div>Error loading users!</div>;
  }

  return (
    <Grid container spacing={2} sx={{ height: '100vh' }}>
      {/* Left Column: User List */}
      <Grid item xs={3}>
        <Paper sx={{ height: '100%', padding: 2, display: 'flex', flexDirection: 'column' }}>
          <UserList users={users.data.getAllUsers} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
        </Paper>
      </Grid>

      {/* Right Column: Chat Area */}
      <Grid item xs={9}>
        {selectedUser ? (
          <Paper sx={{ height: '100%', padding: 2 }}>
            <ChatArea selectedUser={selectedUser} />
          </Paper>
        ) : (
          <div>Please select a user to start chatting</div>
        )}
      </Grid>
    </Grid>
  );
};

export default ChatPage;
