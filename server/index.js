import express from "express";
import cors from "cors";
import connectMongo from "./db/db.config.js";
import route from "./routes/index.js";
import expressSession from "express-session";
import passport from "passport";
import mongoStore from "connect-mongo";
import dotenv from "dotenv";
import passportConfig from "./config/passport.config.js";

const app = express();

dotenv.config();
connectMongo();

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);

app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      autoRemove: "interval",
      autoRemoveInterval: 3600,
    }),
  })
);

passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  express.urlencoded({
    extended: true,
  })
);

route(app);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
