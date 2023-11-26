import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from '@mui/material';

export default function SendingBar({newMessage,addMessage,setNewMessage}) {
  return (
    <div style={{ flex: '1', display: "flex", flexDirection: "row"}}>
      <TextField
        fontSize="small"
        style={{ margin: "12px", width: "48vw", borderRadius: "6px"}}
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}
        variant="outlined"
        size="small"
        color='primary'
        focused
      />
      <Button
        style={{ margin: "12px 4px" }}
        fontSize="medium"
        variant="contained"
        onClick={addMessage}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </div>
  );
}
