const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

const PORT = 5000 || process.env.PORT;

app.use("/api", require("./routes/api/user"));
app.use("/api/vehicle", require("./routes/api/vehicle"));
app.use("/api/driver", require("./routes/api/driver"));
app.use("/api/itinerary", require("./routes/api/itinerary"));
app.use("/api/destination", require("./routes/api/destination"));

app.listen(PORT, () => console.log(`Server starts at port ${PORT}`));
