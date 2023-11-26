import { Button, Typography, Avatar } from "@mui/material"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { deepOrange } from '@mui/material/colors';


export default function ProfileLogo({profile}) {
    return (
        <div style = {{flex: "2", display: 'flex', justifyContent:'start', alignItems: 'start'}}>
            <div style={{display: 'flex', flexDirection: 'column', display: 'flex', justifyContent:'center', alignItems: 'center', margin: '20px 0px 0px 0px'}}>
            {/* <Typography gutterBottom variant="h5" component="div" style = {{margin: '10px'}}>
            Profile
            </Typography> */}
            <Avatar sx={{ bgcolor: deepOrange[400], width: "80px", height: "80px",margin: '4px' }}> {profile['name'][0].toUpperCase()} </Avatar>
            <Link style = {{textDecoration: 'none'}} to = '/editprofile'>
            <Button style = {{color: 'black', width: '100%', margin: '12px 0px'}} variant = "outlined">
                Edit profile
            </Button>
            </Link>
            </div>
        </div>
    )
}