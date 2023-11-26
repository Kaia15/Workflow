import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function SettingButton({ cont,link }) {
  return (
    <div>
      <Link style={{ textDecoration: "none" }} to={link}>
        <Button
          disabled={cont === "settings" || cont === "service"}
          fontSize="large"
          fullWidth
        >
          <p style={{ color: "black" }}> {cont} </p>
        </Button>
      </Link>
      <Divider fullWidth />
    </div>
  );
}
