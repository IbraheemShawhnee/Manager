import dotenv from "dotenv"
if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}
const PORT = process.env.PORT || 5000;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const CLIENT = `http://localhost:${FRONTEND_PORT}`;
const MONGOD_PORT = process.env.DB_PORT || 27017;

//	PACKAGES
import express from "express"
import path from "path"
import ejsMate from "ejs-mate"
import methodOverride from "method-override"
import mongoose from "mongoose"
import session from "express-session"
import flash from "connect-flash"
import passport from "passport"
import LocalStrategy from "passport-local"
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
import MongoStore from "connect-mongo"
import User from "./models/user.js"

//	Path
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
import { isLoggedIn, isAdmin } from "./middlewares/middleware.js"
import billsRoutes from "./routes/bills.js"
import workersRoutes from "./routes/workers.js"
import logsRoutes from "./routes/logs.js"
import payeesRoutes from "./routes/payees.js"
import chequesRoutes from "./routes/cheques.js"
import usersRoutes from "./routes/users.js"

// Error handling
import ExpressError from "./utils/ExpressError.js"
import catchAsync from "./utils/catchAsync.js"

//	DB CONNECTION

const dbUrl = process.env.DB_URL || "mongodb://localhost:" + MONGOD_PORT + "/managerDB"
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log("Connection to the Database was established successfully!")
	})
	.catch(error => {
		console.log("An ERROR occurred while attempting to connect to the Database")
		console.log(error)
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

//	Middlewares

//	Parsing JSON
app.use(express.urlencoded({ extended: true }));
//	Serving files
app.use(express.static(path.join(__dirname, "/public")));
//	Method Overriding
app.use(methodOverride("_method"));
//	Configuring Session
app.use(session(sessionConfig));
//	Flash
app.use(flash());
//	Helmet
app.use(helmet());
//	Mongo Sanitize
app.use(mongoSanitize({
	replaceWith: '_'
}));
//	--
app.use(express.json());
app.use(cors({
	origin: CLIENT,
	methods: "GET,POST,PUT,PATCH,DELETE",
	credentials: true,
}));

//	Passport session manager
app.use(passport.initialize());
app.use(passport.session());
//	Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configuring Helemt's Content Security Policy

const scriptSrcUrls = [
	"https://stackpath.bootstrapcdn.com",
	"https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
	"https://stackpath.bootstrapcdn.com",
	"https://cdn.jsdelivr.net/",
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
				"https://www.transparenttextures.com",
				"https://www.transparenttextures.com/patterns/carbon-fibre-big.png",
				"https://images.unsplash.com",
			],
			fontSrc: ["'self'", ...fontSrcUrls],
		},
	})
);


//	Main Middleware
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	//	Flasing
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

//	Routes and Authorizations
app.use("/api", APIRoutes)
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
	console.log(`(404)Request at: ${req.originalUrl}`);
	next(new ExpressError("Page  Not Found", 404));
})


app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Oh No, Something Went Wrong!"
	return res.status(statusCode).render("error", { pageTitle: "Error", err: err })
})
// Start server
app.listen(PORT, () => {
	console.log(`Server has started on PORT: ${PORT}`);
})