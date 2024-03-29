require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
const cors = require("cors");

var path = require("path");
var cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
var logger = require("morgan");

const expressLayouts = require("express-ejs-layouts");

const session = require("express-session");
const flash = require("connect-flash");

const validateMessage = require("./middlewares/validate.message");
const authMiddleware = require("./middlewares/auth.middleware");
const guestMiddleware = require("./middlewares/guest.middleware");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const roleRouter = require("./routes/roles");
const shortenUrlsRouter = require("./routes/shorten-urls");
const apiRouter = require("./routes/api");

const passport = require("passport");
const localPassport = require("./passports/local.passport");
const googlePassport = require("./passports/google.passport");
const githubPassport = require("./passports/github.passport");

const { User } = require("./models/index");

var app = express();
app.use(
  cookieSession({
    name: "session",
    keys: ["user"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(flash());
app.use(validateMessage);

// Cấu hình passport
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "https://f8-fullstack-006-4mbb.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

passport.use("local", localPassport);
passport.use("google", googlePassport);
passport.use("github", githubPassport);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);
app.use("/auth", guestMiddleware, authRouter);

//Gọi auth.middleware
app.use(authMiddleware);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/roles", roleRouter);
app.use("/shorten-urls", shortenUrlsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
