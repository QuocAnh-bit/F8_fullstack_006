import express from "express";
// import bodyParser, { urlencoded } from "body-parser";
import session from "express-session";
import flash from "connect-flash";
import expressLayouts from "express-ejs-layouts";
import routerIndex from "./routes/index.js";
import routerUser from "./routes/users.js";
import routerAuth from "./routes/auth.js";
import authMiddleware from "./middlewares/auth.middleware.js";
const app = express();
const port = 8080;

// Static file
app.use(express.static("public"));

// setup template engine
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts);

//layout
app.set("layout", "layout/layout.default.ejs"); // thay đổi đường dẫn layout mặc định

// Parse Body
// app.use(bodyParser.urlencoded({ extended: false })); // Hỗ trowh nhận dữ liệu ở dạng : application/x-www-urlencoded
// app.use(bodyParser.json()); // Hỗ trowh nhận dữ liệu ở dạng : application/json

// từ bản express 4.16 trở lên
app.use(express.urlencoded());
app.use(express.json());

//Session
app.use(
  session({
    name: "f8_session_id",
    secret: "f8",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// routing
app.use(routerAuth);
app.use(authMiddleware);
app.use(routerIndex);
app.use("/users", routerUser);

// Listen
app.listen(port, () => {
  console.log("Server đang chạy : http://localhost:8080");
});
