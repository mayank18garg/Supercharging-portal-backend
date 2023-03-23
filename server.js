const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require('cors');

const port = process.env.PORT;

connectDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/kpiData", require("./routes/kpiRoutes"));
app.use("/api/sessionData", require("./routes/sessionRoutes"));
app.use("/api/issueTicket", require("./routes/issueTicketRoutes"));
app.use("/api/userData", require("./routes/userDataRoutes"));
app.use("/api/contactInfo", require("./routes/contactInformationRoutes"));
// app.use("/api/contactInformation", require("./routes/contactInformationRoutes"));
app.use("/api/siteInfo", require("./routes/siteInfoRoutes"));

app.use(errorHandler);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
       next();
 });

app.listen(port, () => {
    console.log(`server running on the port ${port}`);
});


