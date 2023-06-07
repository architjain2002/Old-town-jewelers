import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Stack,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Modal,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import './ChatBot.css';

function ChatBot({ closeProduct,socket}) {
  const [chats, setChats] = useState([]);
  const [open, setOpen] = useState(true);

  const onclose = () => {
    setOpen(false);
    closeProduct();
  };

  // const socket = io(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => {
    const user =
        localStorage.getItem("user") != ""
          ? localStorage.getItem("user")
          : "Guest";

      const newChat = `Hello ${user}, let's start your golden journey!`;
      const date=new Date();
      const showTime = date.toLocaleTimeString();
      // date.getHours()+ ':' + date.getMinutes()

      setChats([...chats, {"id":"chatbot_left","time":showTime,"chat":newChat}]);

    // socket.on("connect", () => {
    //   console.log("connected")
    //   const user =
    //     localStorage.getItem("user") != ""
    //       ? localStorage.getItem("user")
    //       : "Guest";

    //   const newChat = `Hello ${user}, let's start your golden journey!`;
    //   const date=new Date();
    //   const showTime = date.toLocaleTimeString();
    //   // date.getHours()+ ':' + date.getMinutes()

    //   setChats([...chats, {"id":1,"time":showTime,"chat":newChat}]);
    //   console.log(chats);  
    // });
  },[]);

  socket.on("Answer", (obj) => {

    const reply = obj.Reply;
    console.log(reply);
    const date=new Date();
    const showTime = date.toLocaleTimeString();
    setChats([...chats, {"id":"chatbot_left","time":showTime,"chat":reply}]);

    // setChats([...chats, reply]);
    console.log(chats);
    // console.log("We got the data");
  });

  const utility = (event) => {
    if(!(event!=null&&(event.key==="Enter"||event.type==="click")))
      return;
    const chat = document.getElementById("chat");
    if (!chat.value) {
      return;
    } else {
      //call socket.io
      const date=new Date();
      const showTime = date.toLocaleTimeString();
      setChats([...chats, {"id":"chatbot_right","time":showTime,"chat":chat.value}]);
      socket.emit("Question", chat.value);
    }
    chat.value="";
  };
  return (
    <Modal open={open} onClose={onclose}>
      <Grid
        sx={{
          position: "absolute",
          top: "50%",
          left: "87%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 600,
          bgcolor: "#EEFCF8",
          outline: "none",
          // border:"1px solid black",
          borderRadius: "5%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "cursive",
            color: "#035E7B",
            margin: "2rem",
          }}
        >
          Let's Chat
        </Typography>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor:"wheat",
            border: "2px solid #505C7A",   
            height: "400px",
            margin: "2px",
            overflow:"auto",
            marginBottom: "2rem",
          }}  
        >
        {chats&&chats.map((obj,i)=>{
          console.log(obj);
          return <Grid><Typography variant="h4" key={i} className={obj.id}
          sx={{
            fontFamily: "cursive",
            fontSize:"15px",
            fontWeight:"bold"
          }}>
          {obj.chat}
          </Typography>
          <Typography variant="h6" key={i} className={`time ${obj.id}`}
            sx={{
              fontFamily: "cursive",
              fontSize:"10px",
              fontWeight:"bold"
            }}>
            {obj.time}
          </Typography>
          </Grid>
        })}
        
        </Grid>   
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 800,
              fontSize: 25,
              letterSpacing: ".1rem",
              color: "white",
              width: "100%",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <TextField
              variant="standard"
              size="medium"
              label="Chat"
              color="primary"
              type="text"
              sx={{
                textAlign: "center",
                width: 0.8,
              }}
              id="chat"
              onKeyDown={(event)=>utility(event)}
            />
          </Typography>
          <Button
            size="small"
            onClick={(event)=>utility(event)}
          >
            <SendIcon sx={{ 
              color: "#035E7B",  
              }} 
              />
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default ChatBot;
