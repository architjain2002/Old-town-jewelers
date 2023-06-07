const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));

db.once("open", function () {
  console.log("Connected");
});

require("../models/admin");
require("../models/user");
require("../models/product");
require("../models/order");
require("../models/cart");
