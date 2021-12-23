import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";

import axios from "axios";
const useStyles = makeStyles({
    root: {
      maxWidth: 345
    }
  });

const UnArchive = (props) => {

    const {unArchiveCells , setUnArchiveCells,archiveCells , setArchiveCells} = props;
    const classes = useStyles();
   
    const url = 'https://aircall-job.herokuapp.com/activities/';
    const updateCall = (id) => {
        
        console.log(id);
        const body = { is_archived: false };
        axios.post(url + id, body)
        .then(response => {
            let updatedCall;
            unArchiveCells.forEach(item => {
                if(item.id === id){
                    item.is_archived = false;
                    updatedCall = item;
                }
            });
            console.log(unArchiveCells);
            setUnArchiveCells(unArchiveCells.filter(item => item.id !== id));
            archiveCells.push(updatedCall);
        });

    }
    const renderCard = (card, index) =>{
        return(
                <Card className={classes.root} key ={index}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        {card.from}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {card.to}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={() => updateCall(card.id)} >
                        {card.is_archived ? (
                            <FavoriteIcon   style={{ fill: 'black' }}/>
                        ):(
                            <FavoriteIcon/>
                        )}
                        
                        </IconButton>
               


                    </CardActions>
                    </Card>
        );
    }

    return (
        <div className="FirstTab">

        {/* First tab content will go here */}
        {unArchiveCells.map(renderCard)}
        </div>
    );
};
export default UnArchive;
