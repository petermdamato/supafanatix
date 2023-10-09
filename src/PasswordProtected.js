import React from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const PasswordProtected = () => {
  return (
    <div className='login-page'>
      <Box
      sx={{
        backgroundColor:'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '300px',
        margin: '260px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    >
      <TextField
        label="Username"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
      />
      <Box
        variant="contained"
        color="secondary"
                sx={{ padding:'8px 12px',borderRadius:'4px',marginTop: '20px',
        border: '1px white solid',
        color: "#fff" }}
      >
        Login
      </Box>
    </Box>
    </div>
  );
};

export default PasswordProtected;

