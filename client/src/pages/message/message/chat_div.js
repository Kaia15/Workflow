import Conversation from "../../../components/conversation";
import { Button, Divider, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


export default function ChatDiv({currentMessage,currentChat,userId,scrollRef}) {
  return (
    <div style={{flex: '14', display: 'flex', flexDirection: 'column'}}>
      <div style={{ flex: "2" }}>
        <div
          style={{
            margin: "20px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ flex: "9" }}>
            {currentChat && (
              <Conversation
                id={currentChat["members"].filter((m, id) => m !== userId)}
              />
            )}
          </div>
          <Button style={{ flex: "1" }}>
            <MenuIcon />
          </Button>
        </div>
      </div>
      <div style={{ flex: "12" }}>
        <Divider fullWidth style={{ margin: "1px 0px 0px 0px" }} />
        {currentMessage.length > 0 ? (
          currentMessage.map((mess, id) => {
            let style;
            // console.log(mess)
            const { sender, receiver } = mess;
            if (sender === userId)
              style = {
                backgroundColor: "#006AFF",
                color: "white",
                margin: "12px 10px 0px 44vw",
                width: "12vw",
                minHeight: "32px",
                borderRadius: "8px",
              };
            else
              style = {
                backgroundColor: "#E5E4E2",
                color: "black",
                margin: "20px 10px 0px 20px",
                width: "12vw",
                minHeight: "32px",
                borderRadius: "8px",
              };
            return (
              <div ref={scrollRef}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Typography style={{ ...style }}>{mess["text"]}</Typography>
                </div>
              </div>
            );
          })
        ) : (
          <Typography
            variant="h6"
            color="primary"
            style={{ textAlign: "center" }}
          >
            Send your first message
          </Typography>
        )}
      </div>
    </div>
  );
}
