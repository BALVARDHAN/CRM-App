const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const InfoDB = require("./InfoDB.js");

const port = process.env.PORT;
const accessToken = process.env.HUBSPOT_API_KEY;
const mongodbURI = process.env.MONGODB_URI;

mongoose.connect(mongodbURI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "conntection error"));
db.once("open", () => {
  console.log("Database Connected");
});

app.get("/fetch-data", async (req, res) => {
  const result = await InfoDB.find({});
  await InfoDB.deleteMany({});
  res.json(result[0]);
});

app.post("/form-submit", async (req, res) => {
  await InfoDB.deleteMany({});
  const newData = new InfoDB(req.body);
  await newData.save();
  res.json({ msg: "Form Submitted" });
});

app.post("/push-to-crm", async (req, res) => {
  const fetchedData = req.body;
  try {
    const data = {
      properties: {
        firstname: fetchedData["firstName"],
        lastname: fetchedData["lastName"],
        email: fetchedData["email"],
        phone: fetchedData["phoneNumber"],
        address: fetchedData["street"],
        city: fetchedData["city"],
        state: fetchedData["state"],
        zip: fetchedData["postalCode"],
        company: fetchedData["currentOrganization"],
      },
    };
    const response = await axios.post(
      "https://api.hubspot.com/crm/v3/objects/contacts",
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "fail", errorMsg: error.response.data.category });
  }
});

app.listen(port, () => {
  console.log("Server is Listening to PORT 5000");
});
