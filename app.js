var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const { jwtSecretKey } = require("./utils/jwt");
// const bodyParser = require("body-parser");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var login = require("./routes/login");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "apidoc/assets")));

// 拦截路由中间件
const whitelist = ["/", "/docs", "/users", "/user/login", "/user/register"];
const interceptorMiddleware = (req, res, next) => {
  console.log("req.path--- :>> ", req.path);

  if (whitelist.includes(req.path)) {
    return next();
  } else {
    const token = req.get("Token");
    console.log("token: ", token);
    try {
      const decoded = jwt.verify(token, jwtSecretKey);
      console.log("解码后的有效载荷:", decoded); // 解码后的有效载荷 😎
      return res.send({ message: "success", ...decoded });
    } catch (error) {
      console.error("无效的令牌 😞");
      return res.send({ message: "error token" });
    }
  }
};

// 应用拦截路由中间件
app.use(interceptorMiddleware);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/user", login);

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
// .connect("mongodb://localhost:27017/express-demo")
mongoose
  .connect("mongodb://49.235.101.249:27017/express-demo")
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log("数据库连接失败...", err);
  });
// const conn = mongoose.createConnection(
//   "mongodb://49.235.101.249:27017/express-demo"
// );
// // Deletes the entire 'mydb' database
// conn.dropDatabase();

module.exports = app;
