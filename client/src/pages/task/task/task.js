import React, { useContext, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/context";
import {
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PriorityBox from "./priority_box";
import TaskCollection from "./task_collection";
import Theme from "./theme";
import { images, linkOptions } from "../constant";

const style = { Low: "#b5e2ff", Medium: "#ffb6c1", High: "#f5c77e" };

const RenderTask = ({
  isValid,
  handleDelete,
  onSubmit,
}) => {
  const { tasks, setTasks } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const { taskId, setTaskId } = useContext(AuthContext);
  const d = new Date();
  let hr = new Date().getHours();
    console.log(taskId);
  const taskbycategory = (tasks, pr) => {
    return tasks.filter((t) => t["progress"] === pr);
  };

  const a = [
    taskbycategory(tasks, "Looking"),
    taskbycategory(tasks, "Cancel"),
    taskbycategory(tasks, "Done"),
  ];
  
  return (
    <div>
      {isValid && tasks !== null ? (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh"}}>
          <div
            style={{
              flex: "10",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ flex: "7", overflow: 'hidden'}}>
              <div style={{ margin: "1vh 1vw" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <PriorityBox style={style} priority_text={"Low"}/>
                    <PriorityBox style={style} priority_text={"Medium"}/>
                    <PriorityBox style={style} priority_text={"High"}/>
                </div>
                <Divider style={{ margin: "0px 0px 20px 0px" }} />

                {tasks.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <TaskCollection priority_text = {"Incoming"} a = {a} 
                        onSubmit={onSubmit}
                        setEdit = {setEdit} setTaskId = {setTaskId} handleDelete = {handleDelete}
                        edit = {edit}
                        style = {style}
                        idx = {0}
                        />
                    <TaskCollection priority_text = {"Done"} a = {a} 
                        onSubmit={onSubmit}
                        setEdit = {setEdit} setTaskId = {setTaskId} handleDelete = {handleDelete}
                        edit = {edit}
                        style={style}
                        idx = {2}
                        />
                    <TaskCollection priority_text = {"Cancel"} a = {a} 
                        onSubmit={onSubmit}
                        setEdit = {setEdit} setTaskId = {setTaskId} handleDelete = {handleDelete}
                        edit = {edit}
                        style={style}
                        idx = {1}
                        />
                  </div>
                ) : (
                  <div>
                    <p style={{ color: "black", margin: "30px 0px 0px 2vw" }}>
                      {" "}
                      You do not have any tasks in last 10 days.{" "}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Link to="/addtask" style={{ textDecoration: "none" }}>
                  <Button
                    style={{ margin: "20px 1.8vw", width: "200px" }}
                    variant="contained"
                  >
                    <AddIcon /> Add tasks
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div style={{ flex: "3", display: "flex", flexDirection: "column", borderRadius: '4px', backgroundColor: 'rgb(235, 236, 240)', margin: '8px'}}>
            {hr >= 18 && hr <= 24 ? (
              <Theme imageSource={images['light']}/>
            ) : (
              <Theme imageSource={images['dark']} />
            )}

            <Typography variant="h5" style={{ textAlign: "center" }}>
              {d.toDateString()}
            </Typography>
            <div style={{display:'flex', justifyItems: 'center', alignItems: 'center', flexDirection: 'column'}}>
              {linkOptions.map((link) => {
                return (
                  <Link style={{ textDecoration: "none" , textAlign: 'center'}} to={`/${link}`}>
                    <Button
                      variant="outlined"
                      style={{
                        height: "36px",
                        color: "black",
                        margin: "10px 0px",
                        width: '150px'
                      }}
                    >
                      {link}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ color: "black" }}> Your time is expired </p>
          <Link to="/login">
            <Button style={{ color: "black", margin: "0px 16vw" }}>
              LOGIN AGAIN
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RenderTask;
