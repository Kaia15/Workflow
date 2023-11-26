import React, { useEffect, useState, useRef, useContext } from 'react'
import {
    Button, Box, Card, CardContent, CardHeader, ToggleButtonGroup,
    ToggleButton, Divider, TextField, Dialog, DialogActions, DialogTitle, DialogContent, Radio, FormControlLabel, RadioGroup
} from '@mui/material'
import Conversation from '../../../components/conversation';
import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
import { io } from 'socket.io-client'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../../context/context';
import SmsIcon from '@mui/icons-material/Sms';
import Add from '@mui/icons-material/Add';

export default function PopUpButton({setNewMemberId,contactIds,open,handleClose,userId,
  setOpen,handleClickOpen,handleNewChat, contactNames, newMemberId}) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Typography variant="h6" style={{ color: "black", margin: "10px 20px", flex: '1'}}>
        {" "}
        Chats{" "}
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"New Inbox?"}</DialogTitle>
        <DialogContent>
          <Typography color={"GrayText"} variant="h7">
            Suggested
          </Typography>
          <div
            style={{ height: "200px", overflowY: "scroll", margin: "16px 0px" }}
          >
            <RadioGroup>
              {contactNames.map((name, i) => {
                return (
                  <FormControlLabel
                    value={contactIds[i]}
                    control={<Radio />}
                    label={name}
                    onChange={(e) => setNewMemberId(e.target.value)}
                  />
                );
              })}
            </RadioGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel </Button>
          <Button
            onClick={() => {
              handleNewChat(userId, newMemberId);
              setOpen(false);
            }}
            autoFocus
          >
            Create new chat
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'end',
        flex: '1'}}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        size="small"
        style={{ 
          margin: '0px 8px 8px 0px',
        }}
      >
        <Add />
        <SmsIcon />
      </Button>
      </div>
    </div>
  );
}
