import { Card, CardMedia, CardActions, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Board({link,cont,urls,id}) {
  // console.log(link);
  return (
    <Card sx={{ maxWidth: 270, margin: "12px 0px" }}>
      <CardMedia
        component="img"
        height="140"
        style={{ backgroundImage: urls[id], margin: "32px 0px 4px 0px" }}
      />

      <Typography
        gutterBottom
        variant="h5"
        component="div"
        style={{ margin: "0px 18px" }}
      >
        {cont[0]}
      </Typography>

      <CardActions>
        <Link style={{ textDecoration: "none" }} to={link}>
          <Button
            size="small"
            variant="outlined"
            style={{ margin: "0px 10px" }}
            disabled={cont[0] === "active" || cont[0] === "music" || cont[0] == "reminders"}
          >
            {" "}
            Open board{" "}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
