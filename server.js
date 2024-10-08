const express = require("express");
const path = require("path");
const videoRoute = require("./routes/videoRoute.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve the frontend files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.use("/video", videoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//knliby.com?id=dskdnskndksndsknd