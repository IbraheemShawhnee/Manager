import { Route, Routes, useParams, Navigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Landing";

import Login from "./pages/Users/login";
import Register from "./pages/Users/register";
import ChangePassword from "./pages/Users/changePassword";

import Bills from "./pages/Bills/index";
import Bill from "./pages/Bills/show";
import NewBill from "./pages/Bills/new"

import Workers from "./pages/Workers/index";
import Worker from "./pages/Workers/show";

import Logs from "./pages/Logs/index";
import Log from "./pages/Logs/show";

import Payees from "./pages/Payees/index";
import Payee from "./pages/Payees/show";
import NewPayee from "./pages/Payees/new"

import Cheques from "./pages/Cheques/index";
import Cheque from "./pages/Cheques/show";


import Error from "./components/error";
import NotFound from "./components/notFound";
import { useEffect, useState } from "react";

import "./App.css"

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState(null);
	const [permission, setPermission] = useState(false);
	useEffect(() => {
		const getUser = async () => {
			await axios.get("/api/login")
				.then((res) => {
					if (res.status === 200) {
						return res.data;
					}
					throw new Error("Not logged in");
				}).then(res => {
					if (res.user) {
						console.log(res.user);
						setUser(res.user);
						setPermission(res.user.isAdmin || res.user.isSuper);
					}
				}).catch(err => {
					console.log(err);
				});
		};
		getUser();
	}, []);

	const toggle = () => {
		setIsOpen(!isOpen);
	}

	return (
		<>
			<Sidebar isOpen={isOpen} toggle={toggle} user={user} />
			<Navbar toggle={toggle} user={user} />
			<Routes>
				<Route path="/" exact element={<Home user={user} />} />

				{/* General Routes */}
				<Route path="/login" exact element={!user ? <Login /> : <Navigate to="/" />} />
				<Route path="/changePassword" exact element={user && <ChangePassword />} />
				{/* Bills Routes */}
				<Route path="/bills" exact element={permission ? <Bills /> : <Login />} />
				<Route path="/bills/new" exact element={<NewBill />} />
				<Route path="/bills/:id" exact element={<Bill />} />
				<Route path="/bills/:id/edit" exact element={<Test />} />
				{/* Workers Routes */}
				<Route path="/workers" exact element={<Workers />} />
				<Route path="/workers/new" exact element={permission ? <Register /> : <Home />} />
				<Route path="/workers/:id" exact element={<Worker />} />
				<Route path="/workers/:id/edit" exact element={<Test />} />
				{/* Logs Routes */}
				<Route path="/logs" exact element={<Logs />} />
				<Route path="/logs/new" exact element={<Test />} />
				<Route path="/logs/:id" exact element={<Log />} />
				<Route path="/logs/:id/edit" exact element={<Test />} />
				<Route path="/myLogs" exact element={<Test />} />
				{/* Payees Routes */}
				<Route path="/payees" exact element={<Payees />} />
				<Route path="/payees/new" exact element={<NewPayee />} />
				<Route path="/payees/:id" exact element={<Payee />} />
				<Route path="/payees/:id/edit" exact element={<Test />} />
				{/* Cheques Routes */}
				<Route path="/cheques" exact element={<Cheques />} />
				<Route path="/cheques/new" exact element={<Test />} />
				<Route path="/cheques/:id" exact element={<Cheque />} />
				<Route path="/cheques/:id/edit" exact element={<Test />} />
				{/* Errors */}
				<Route path="/500" exact element={<Error />} />
				<Route path="*" exact element={<NotFound />} />
			</Routes >
		</>
	);
}

export default App;

function Test() {
	let params = useParams();
	return (
		<>
			<h1>You have arrived</h1>
			<h1>{params.id}</h1>
		</>
	)
}