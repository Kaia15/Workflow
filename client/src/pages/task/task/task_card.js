import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
    Card,
    CardContent,
    CardActions,
  } from "@mui/material";
  import Field from "../../../components/fields";

export default function TaskCard({it,setEdit,setTaskId,handleDelete,onSubmit,taskId,style,edit}) {
  console.log(edit)
  return (
    <div>
    {
        (it !== null) && (
        <div>
            <Card
        sx={{
          maxWidth: "200",
          margin: "16px 0px 0px 16px",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: style[it["priority"]],
              }}
              style={{ margin: "6px 8px 6px 4px" }}
            />
            {it["title"].toUpperCase()}
          </Typography>
          <Typography sx={{ mb: 2, mt: 1.2 }} color="text.secondary">
            <CalendarTodayIcon style={{ margin: "-2px 2px" }} /> by{" "}
            {it["deadline"]}
          </Typography>
          <Typography variant="body2">{`${it["notes"]}...`}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setEdit(!edit);
              setTaskId(it["_id"]);
            }}
            style={{ margin: "0px 5px" }}
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(it["_id"]);
            }}
            variant="outlined"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      {taskId === it["_id"] && <Field onSubmit={onSubmit} task={it} />}
        </div>
        )
    }
    </div>
  );
}
