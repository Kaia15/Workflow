import { ListItem, ListItemText, Divider, List } from "@mui/material";

export default function ProfileItems({profile}) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 540,
        bgcolor: "background.paper",
        margin: "20px 0px 0px 0px",
      }}
    >
      <ListItem>
        <ListItemText primary="Name" secondary={profile["name"]} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Email" secondary={profile["email"]} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <Divider />
    </List>
  );
}
