const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
require("dotenv").config();

const port = process.env.WEBSITES_PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//for user Routes
const userRoutes = require("./server/routes/user");
app.use("/user", userRoutes);

// admin routes
const adminRoutes = require("./server/routes/admin");
app.use("/admin", adminRoutes);

const server = app.listen(8080, () => {
  console.log(`Listening to port ${port}`);
});

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  //created socket
  console.log("new connection" + socket.id);
  socket.on("Question", async (data) => {
    console.log("Clients Question: " + JSON.stringify(data));

    // socket.broadcast.emit("ChatBot Answer", data);
    const response = await axios
      .post("https://flask-app-python.azurewebsites.net/chat", {
        chat: data,
      })
      .then((response) => {
        console.log(response.data);
        socket.emit("Answer", response.data);
      });
    // const response = await fetch('http://127.0.0.1:5000/chat',{
    //     method: "POST",
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     body:{
    //         chat:data
    //     }
    // })
  });
});
