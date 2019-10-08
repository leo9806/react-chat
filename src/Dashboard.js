import React from 'react';
// css in js, renders the css when the page renders 
import { makeStyles } from '@material-ui/core/styles'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Context} from './Store';

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

  // context store
  const {allChats, sendChatAction, user} = React.useContext(Context);

  // getting the the topics from all the chats in the store
  const topics = Object.keys(allChats);

  // local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState('');

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Chat application
        </Typography>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>

        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {
                topics.map(topic => (
                  <ListItem key={topic} button 
                    onClick={(e) => changeActiveTopic(e.target.innerText)}>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))
              }
            </List>
          </div>
          <div className={classes.chatWindow}>
            {
              allChats[activeTopic].map((chat, index) => (
                <div key={index} className={classes.flex}>
                  <Chip label={chat.from} className={classes.chip} />
                  <Typography variant="body1" gutterBottom>{chat.msg}</Typography>
                </div>
              ))
            }
          </div>
        </div>

        <div className={classes.flex}>
          <TextField
            label="Write a message..."
            className={classes.chatBox}
            value={textValue}
            onChange={(event) => changeTextValue(event.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => {
              sendChatAction({from: user, msg: textValue, topic: activeTopic});
              changeTextValue(''); // clear text value
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  )
}

export default Dashboard
