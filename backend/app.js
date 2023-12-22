require("dotenv").config();

const ms = require("ms");
const cors = require("cors");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const Store = require("express-mysql-session")(session);

const app = express();
const server = http.createServer(app);
const listener = server.listen(3001, () => console.log(`[SERVER] Listen to port:`, listener.address().port));
const store = new Store({
    host: "localhost",
    port: 3306,
    user: process.env.DBUSERNAME || "root",
    password: process.env.DBPASSWORD || null,
    database: process.env.DBNAME
});

app.use(cors({
    origin: process.env.DOMAIN || "http://localhost:3000",
    credentials: true
}));

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "total_secret_cookie_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + ms("3 days")),
        maxAge: (Date.now() + ms("3 days")),
    },
    store: store
}));
app.use((req, res, next) => {
    if(!req.body) req.body = {};
    if(!req.file) req.file = {};
    if(!req.files) req.files = [];

    req.domain = process.env.DOMAIN || "http://localhost:3000";
    req.errors = {
        "404": {
            code: 404,
            message: "Cannot find page or data!"
        }
    }
    next();
});

app.use("/", require("./pages"));
app.use("/auth", require("./auth"));
app.get("*", (req, res) => res.status(404).send(req.errors['404']));