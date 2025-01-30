// components/UserList.tsx
import React from 'react';
import { List, ListItemText, Divider, ListItemButton } from '@mui/material';
import { motion } from 'framer-motion';

interface UserListProps {
  users: { id: string; name: string }[];
  selectedUser: string | null;
  onSelectUser: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, selectedUser, onSelectUser }) => {
    
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="user-list"
    >
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <List>
        {users.map((user,key) => (
          <motion.div key={key} whileHover={{ scale: 1.05 }}>
            <ListItemButton
              selected={selectedUser === user.id}
              onClick={() => onSelectUser(user.id)}
              sx={{
                backgroundColor: selectedUser === user.id ? 'rgba(25,118,210,0.08)' : 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(25,118,210,0.12)',
                },
              }}
            >
              <ListItemText primary={user.name} />
            </ListItemButton>
            <Divider />
          </motion.div>
        ))}
      </List>
    </motion.div>
  );
};

export default UserList;
