
//
// declaring variables
//
const express       = require("express"),
      config        = require("./config"),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      methodOverride= require("method-override"),
      passport      = require("passport"),
      cookieParser  = require("cookie-parser"),
      LocalStrategy = require("passport-local"),
      User          = require("./models/user"),
      emailObj      = require("./emailConfig"),
      app           = express();


// requiring ROUTES

const indexRoute    = require("./routes/indexRoute"),
      loginRoute    = require("./routes/loginRoute"),
      registerRoute = require("./routes/registerRoute"),
      userRoute     = require("./routes/userRoute"),
      reviewRoute   = require("./routes/reviewRoute");

//
// connection
//
mongoose.Promise = global.Promise;
mongoose.connect(config.db.connection, {
    useNewUrlParser: true
}).then( () => {
  console.log("Connected to DB");   
}).catch( err => {
    console.log(err.message);
});




//
// aplication SET
//
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//
// aplication USE
//
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Love of my life",
    resave: false,
    saveUninitialized: false
}));
//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
   // res.locals.success = req.flash('success');
    //res.locals.error = req.flash('error');
    next();
});
//
// aplication ROUTES use
//

app.use("/", userRoute);
app.use("/", reviewRoute);
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/",indexRoute);



// app listener
app.listen(config.app.port);