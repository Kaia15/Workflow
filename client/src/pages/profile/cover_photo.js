import { Box } from "@mui/material";

export default function CoverPhoto() {
  return (
    <div style={{ height: "32vh" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#DDB8A6",
        }}
        style={{ borderRadius: "8px" }}
      />
    </div>
  );
}
