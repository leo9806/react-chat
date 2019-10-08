import React from 'react';
// css in js, renders the css when the page renders 
import { makeStyles } from '@material-ui/core/styles'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: 'flex',
    alignItems: 'center' // aligns the text with the chat head
  },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey' // acts as separator
  },
  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px'
  },
  chatBox: {
    width: '85%',

  },
  button: {
    width: '15%'
  }
}));

const Dashboard = () => {

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Chat application
        </Typography>
        <Typography variant="h5" component="h5">
          Topic placeholder
        </Typography>

        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {
                ['topic'].map(topic => (
                  <ListItem key={topic} button>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))
              }
            </List>
          </div>
          <div className={classes.chatWindow}>
            {
              [{from: 'user', msg: 'hello'}].map((chat, index) => (
                <div key={index} className={classes.flex}>
                  <Chip label={chat.from} className={classes.chip} />
                  <Typography variant="p">{chat.msg}</Typography>
                </div>
              ))
            }
          </div>
        </div>

        <div className={classes.flex}>
        </div>
      </Paper>
    </div>
  )
}

export default Dashboard
