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
        maxWidth: 345,
        marginBottom:40,
        marginRight:10,
        height:170
    }
  });

const Archive = (props) => {

    const {feedCells , setFeedCells,archiveCells , setArchiveCells} = props;
    const classes = useStyles();
   
    const url = 'https://aircall-job.herokuapp.com/activities/';
    const updateCall = (id) => {
        
        console.log(id);
        const body = { is_archived: false };
        axios.post(url + id, body)
        .then(response => {
            let updatedCall;
            archiveCells.forEach(item => {
                if(item.id === id){
                    item.is_archived = false;
                    updatedCall = item;
                }
            });
        
            setArchiveCells(archiveCells.filter(item => item.id !== id));
            feedCells.push(updatedCall);
        });

    }
    const renderCard = (card, index) =>{
        const created = new Date(card.created_at);
        const createdTime = created.getHours() + " : " + created.getMinutes();
        return(
                <Card className={classes.root} key ={index}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        {card.from}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {card.to}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {createdTime}
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
        {archiveCells.map(renderCard)}
        </div>
    );
};
export default Archive;
