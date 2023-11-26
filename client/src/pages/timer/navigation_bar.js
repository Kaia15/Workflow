import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "@mui/material";
import { linkOptions } from "../message/constants";

export default function NavigationBarTimer() {
    return (
        <div style={{
            display: "flex",
            // justifyItems: "center",
            // alignItems: "center",
            flexDirection: "row",
        }}>
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
                        margin: "10px 8px",
                        width: "150px",
                    }}
                    >
                    {link}
                    </Button>
                </Link>
                );
            })}
        </div>
    )
}