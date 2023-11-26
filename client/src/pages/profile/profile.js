import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/context";
import {
    Typography,
    Divider,
} from "@mui/material";
import { checkAuth } from "../../auth/checkAuth";
import CoverPhoto from "./cover_photo";
import NavigationBar from "../../pages/message/navigation_bar";
import ProfileLogo from "./profile_logo";
import ProfileItems from "./profile_items";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
    // const { user, setUser } = useContext(AuthContext)
    const { profile, setProfile } = useContext(AuthContext);
    const { isValid, setIsValid } = useContext(AuthContext);
    const { expired, setExpired } = useContext(AuthContext);
    const { loading, setLoading } = useContext(AuthContext);

    const validToken = localStorage.getItem("validToken");
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
        const m = JSON.parse(validToken)["valid"];
        setIsValid(m);
        if (isValid || m) {
            setProfile(JSON.parse(localStorage.getItem("profile")));
        }
    }, []);

    return (
        <div>

            {loading ? (<p> Page is loading </p>) : isValid ? (
                <div>
                    {profile ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100vh",
                            }}
                        >
                            <div style={{ flex: "1"}}>
                                <div style={{display: 'flex', flexDirection: 'column', width: '100%', display: 'flex', justifyItems: 'center', alignItems: 'center'}}>
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                    style={{margin: '4px'}}
                                >
                                    Profile
                                </Typography>
                                <Divider variant="middle" style={{width: '75%', margin: '4px'}} />
                                </div>
                            </div>
                            <div style={{ flex: "9", display: "flex", flexDirection: "row" }}>
                                <div style={{ flex: "1" }}></div>
                                <div style={{ flex: "3" }}>
                                    <NavigationBar page="" />
                                </div>
                                <div
                                    style={{
                                        flex: "8",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "70%",
                                            height: "100%",
                                        }}
                                    >
                                        <CoverPhoto />
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                width: "100%",
                                            }}
                                        >
                                            <ProfileLogo profile={profile} />
                                            <div
                                                style={{
                                                    flex: "4",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <ProfileItems profile={profile} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ flex: "1" }}></div>
                            </div>
                        </div>) : (<div></div>)}
                </div>)
                : (<p> token is not valid </p>)
            }
        </div>
    );
};

export default Profile;
