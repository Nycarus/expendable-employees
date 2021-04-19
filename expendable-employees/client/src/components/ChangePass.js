import React from "react";
import {makeStyles, Button} from '@material-ui/core/';
import {Grid, Paper } from '@material-ui/core';
import {TextField, Typography} from "@material-ui/core";
import {getUserToken} from "../utils/userSession";
import axios from "axios";


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    categoryText: {
        marginBottom: theme.spacing(4),
    },
    dividerStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    registerButton: {
        width: "10rem",
        marginTop: theme.spacing(4),
    },
    paperStyle: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    }
}));

function checkPassword(){

    let newPassword = document.getElementById('newPass').value
    let oldPassword = document.getElementById('oldPass').value
    let confPassword = document.getElementById('confPass').value

    //let lengthRequirement = document.getElementById('lengthReq')
    let req1 = false;
    //let notSameRequirement = document.getElementById('notSameReq')
    let req2 = false;
    //let confirmationRequirement = document.getElementById('confirmReq')
    let req3 = false;
    
    //let acceptable = document.getElementById('allGood')

    if(newPassword.length < 8){
        //lengthRequirement.style.display = 'block'
        req1 = false;
    } else {
        //lengthRequirement.style.display = 'none'
        req1 = true;
    }

    if(newPassword === oldPassword){
        //notSameRequirement.style.display='block'
        req2 = false;
    } else {
        
        //notSameRequirement.style.display='none'
        req2 = true;
    }

    if(newPassword !== confPassword){
        //confirmationRequirement.style.display='block'
        req3 = false;
    } else {
        //confirmationRequirement.style.display='none'
        req3 = true;
    }


    if(req1 && req2 && req3){
        console.log("password good");
        let token = getUserToken();
        if(token != null){
            axios({
                method : "post",
                data : {
                    "password" : newPassword
                },
                url : "http://localhost:3001/api/reset/password",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "+token
            }}).catch(error => {
                console.log(error);
            });
        }
        //acceptable.style.display='block'
    } else {
        //acceptable.style.display='none'
    }
}


export default function ChangePass() {
    const classes = useStyles();

    return(
        <React.Fragment>
            <Grid container>
                <Grid item xs/>
                <Grid item xs={5}>
                    <Paper className={classes.paperStyle}>
                        <Typography className={classes.categoryText} variant="h5">
                            Account Information
                        </Typography>
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            required
                            name="oldPass"
                            label="Old Password"
                            id="oldPass"
                            type="password"
                            color="secondary"/>
                        <br/>
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            required
                            name="newPass"
                            label="New Password"
                            id="newPass"
                            type="password"
                            color="secondary"/>
                        <br/>
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            required
                            name="confPass"
                            label="Confirm New Password"
                            id="confPass"
                            type="password"
                            color="secondary"/>
                        
                        <Button
                            className={classes.registerButton}
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={checkPassword}>
                            Register
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs>
                    {/* min 8 characters, old can't be same as new, new and confirm have to be the same  
                    <br />
                    <br />
                    <br />
                    <Typography id='lengthReq'  style={{display:'none'}}> New password must be at least 8 characters  </Typography> <br />
                    <Typography id='notSameReq' style={{display:'none'}}> New password must be different from old password </Typography> <br /> 
                    <Typography id='confirmReq' style={{display:'none'}}> New password does not match Confirmation password  </Typography> <br />
                    <Typography id='allGood' style={{display:'none'}}> Your new password is valid and has been accepted   </Typography> <br />
                    */}
                </Grid>
            </Grid>
        </React.Fragment>
    )

}