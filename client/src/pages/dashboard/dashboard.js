import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/context";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Divider, CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { checkAuth } from "../../auth/checkAuth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Board from "./board";
import SettingButton from "./setting_button";
import { urls, settings, contents } from "./constants";

const getUser = async (userId, user) => {
  const res = await axios.get(`http://localhost:8000/user/${userId}`, {
    headers: { token: `Bearer ${user.accessToken}` },
  });
  const data = await res.data;
  return data;
};

const getAllTasks = async (user) => {
  console.log(user["accessToken"]);
  const res = await axios.get("http://localhost:8000/task/", {
    headers: { token: `Bearer ${user.accessToken}` },
  });
  const data = await res.data;
  // console.log(data)
  return data;
};

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const { profile, setProfile } = useContext(AuthContext);
  const { isValid, setIsValid } = useContext(AuthContext);
  const { expired, setExpired } = useContext(AuthContext);
  const { loading, setLoading } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    checkAuth({ setExpired, setIsValid, setLoading });
    const tokenValidationInterval = setInterval(() => {
      checkAuth({ setExpired, setIsValid, setLoading });
      // console.log('check!!')
    }, 10000); // Adjust the interval as needed (e.g., every 60 seconds)

    // Clean up the interval when the component is unmounted
    return () => clearInterval(tokenValidationInterval);
  }, []);

  useEffect(() => {
    if (expired) {
      // Redirect to the login page if the token has expired
      history.push("/login");
    }
  }, [expired, history]);

  useEffect(() => {
    if (isValid) {
      const a = localStorage.getItem("user");
      const parseUser = JSON.parse(a);
      // console.log(parseUser)
      setUser(parseUser);
      if (parseUser !== null) {
        const pr = getUser(parseUser["id"], parseUser);
        pr.then((res) => {
          // console.log(res)
          const { password, ...rest } = res;
          localStorage.setItem("profile", JSON.stringify(rest));
          setProfile(rest);
        }).catch((err) => console.log(err));
      } else {
        // setProfile(null)
        localStorage.setItem("profile", JSON.stringify(null));
      }
    } else {
      // setProfile(null)
      localStorage.setItem("profile", JSON.stringify(null));
    }
  }, [isValid]);

  // console.log(isValid)

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : isValid ? (
        <div>
          {isValid && (
            <div>
              {user ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "100vh",
                  }}
                >
                  <div style={{ flex: "2", backgroundColor: "white" }}>
                    <div
                      style={{
                        height: "16vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <PersonIcon
                          fontSize="large"
                          style={{ color: "black" }}
                        />
                        <Link
                          style={{ textDecoration: "none", margin: "4px 0px" }}
                          to="/profile"
                        >
                          <Typography>@{user["name"].toUpperCase()}</Typography>
                        </Link>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Divider fullWidth />
                      {settings.length > 0 &&
                        settings.map((cont, id) => {
                          // let bgColor;
                          // let style;
                          let link = `/${cont}`;
                          return <SettingButton cont={cont} link={link} />;
                        })}
                      <Link style={{ textDecoration: "none" }} to="/">
                        <Button fontSize="large" fullWidth>
                          <p style={{ color: "black" }}>
                            {" "}
                            <ExitToAppIcon />
                          </p>
                        </Button>
                      </Link>
                      <Divider fullWidth />
                    </div>
                    <div style={{ height: "20vh" }}></div>
                  </div>
                  <div style={{ flex: "8", backgroundColor: "#EBECF0" }}>
                    <div style={{ height: "12vh" }}>
                      <div></div>
                      <h2 style={{ color: "#192841", padding: "40px 112px" }}>
                        {" "}
                        Hello, {user["name"]}
                      </h2>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto auto auto",
                        gridColumnGap: "20px",
                        color: "black",
                        height: "81vh",
                        margin: "0px 6vw",
                      }}
                    >
                      {contents.length > 0 &&
                        contents.map((cont, id) => {
                          // console.log(imgUrl)
                          const link = `/${cont[0]}`;
                          return (
                            <Board
                              cont={cont}
                              link={link}
                              urls={urls}
                              id={id}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Token is not valid.</p>
      )}
    </div>
  );
};

export default Dashboard;
