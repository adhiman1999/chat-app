import React from "react";
import "./AddConversation.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import axios from "axios";

function AddConversation({ currentUser, setConversations, conversations }) {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  /* const [friendId, setFriendId] = React.useState(null);
  const [conversation, setConversation] = React.useState({
    senderId: "",
    receiverId: "",
  }); */

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInput = (e) => {
    setUsername(e.target.value);
  };
  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://morning-scrubland-01222.herokuapp.com/user?userId_username=" +
          username
      );

      return res.data.data._id;
    } catch (err) {
      console.log(err);
    }
  };
  const createConv = async (friendId) => {
    let conversation = {
      senderId: currentUser.id,
      receiverId: friendId,
    };
    try {
      const res = await axios.post(
        "https://morning-scrubland-01222.herokuapp.com/conversation",
        conversation
      );
      setConversations([...conversations, res.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    getUser().then((friendId) => createConv(friendId).then(setOpen(false)));
  };
  return (
    <div>
      <AddCircleOutlinedIcon onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Start a conversation with someone insert their username and we'll
            create a conversation for you.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="username"
            onChange={handleInput}
            value={username}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddConversation;
