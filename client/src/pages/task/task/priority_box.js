import Box from "@mui/material/Box";

export default function PriorityBox({style, priority_text}) {
    return (
        <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "0px 4px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: style[priority_text],
                        margin: "20px",
                      }}
                    ></Box>
                    <p> {priority_text} </p>
        </div>
    )
}