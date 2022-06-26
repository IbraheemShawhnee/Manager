if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
}
const BACKEND_PORT = process.env.PORT || 5000;
const MONGOD_PORT = process.env.DB_PORT || 27017;

//	PACKAGES
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash")
const passport = require("passport");
const LocalStrategy = require("passport-local")
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const User = require("./models/user");

// Routes
const { isLoggedIn, isAdmin } = require("./middlewares/middleware");
const billsRoutes = require("./routes/bills")
const workersRoutes = require("./routes/workers")
const logsRoutes = require("./routes/logs")
const payeesRoutes = require("./routes/payees")
const chequesRoutes = require("./routes/cheques")
const usersRoutes = require("./routes/users")

// Error handling
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");

//	DB CONNECTION

dbUrl = process.env.DB_URL || "mongodb://localhost:" + MONGOD_PORT + "/managerDB"
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log("Connection to the Database was established successfully!")
	})
	.catch(err => {
		console.log("An ERROR occurred while attempting to connect to the Database")
		console.log(err)
	})
mongoose.connection.once("open", async () => {
	if (await User.countDocuments().exec() < 1) {
		let email = process.env.ADMIN_EMAIL || "";
		let name = process.env.ADMIN_USERNAME || "admin"
		let password = process.env.ADMIN_PASSWORD || "admin";
		let phoneNumber = process.env.ADMIN_PHONE_NUMBER || "";
		let admin = true;
		try {
			const user = new User({ name: name, email: email, phoneNumber: phoneNumber, isAdmin: admin, isSuper: admin, username: name });
			await User.register(user, password);
			console.log("username: " + name)
			console.log("password: " + password)
		}
		catch (e) {
			console.log(e)
		}
	}
})

const secret = process.env.SECRET || "whatawonderfullsecret!"
const secure = process.env.SECURE_COOKIES === "true" || false;

const store = MongoStore.create({
	mongoUrl: dbUrl,
	touchAfter: 24 * 60 * 60,
	crypto: {
		secret
	}
});

const sessionConfig = {
	store,
	name: "managerSession",
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		secure: secure,
		expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
		maxAge: (1000 * 60 * 60 * 24 * 7),
	}
}

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());
app.use(mongoSanitize({
	replaceWith: '_'
}));

app.use(passport.initialize());
app.use(passport.session());

const scriptSrcUrls = [
	"https://stackpath.bootstrapcdn.com",
	"https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
	"https://stackpath.bootstrapcdn.com",
	"https://cdn.jsdelivr.net/"
];
const connectSrcUrls = [

];
const fontSrcUrls = [
	"https://cdn.jsdelivr.net",
];
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: [],
			connectSrc: ["'self'", ...connectSrcUrls],
			scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
			styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
			workerSrc: ["'self'", "blob:"],
			childSrc: ["blob:"],
			objectSrc: [],
			imgSrc: [
				"'self'",
				"blob:",
				"data:",
				"https://images.unsplash.com",
			],
			fontSrc: ["'self'", ...fontSrcUrls],
		},
	})
);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//	Main Middleware
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

//	Routes and their Authorizations
app.use("/bills", isLoggedIn, isAdmin, billsRoutes);
app.use("/payees", isLoggedIn, isAdmin, payeesRoutes);
app.use("/workers", isLoggedIn, isAdmin, workersRoutes);
app.use("/logs", isLoggedIn, logsRoutes)
app.use("/cheques", isLoggedIn, isAdmin, chequesRoutes);
app.use("/", usersRoutes)

//		Home page;
app.get("/", (req, res) => {
	res.render("home")
})

app.all('*', (req, res, next) => {
	next(new ExpressError("Page  Not Found", 404));
})

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Oh No, Something Went Wrong!"
	return res.status(statusCode).render("error", { pageTitle: "Error", err: err })
})

app.listen(BACKEND_PORT, () => {
	console.log("Server has started on PORT:" + BACKEND_PORT);
})