import { linkOptions } from "./constants";
import { Button } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function NavigationBar({page}) {
  return (
    <div
      style={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {(page === "message") && <div>
      <img
      src= 'https://img.pikbest.com/best/video_preview_img/2309/9201236.jpg!w700wp'
      style={{
        height: "80%",
        width: "80%",
        margin: "16px",
        borderRadius: "8px",
      }}
      />
      </div>}
      {linkOptions.map((link) => {
        return (
          <Link
            style={{ textDecoration: "none", textAlign: "center" }}
            to={`/${link}`}
          >
            <Button
              variant="outlined"
              style={{
                height: "36px",
                color: "black",
                margin: "10px 0px",
                width: "150px",
              }}
            >
              {link}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
