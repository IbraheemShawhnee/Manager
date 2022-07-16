import React, { useEffect, useState } from "react";
import { Route, Routes, useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { AuthRoutes, AdminRoutes } from "./components/ProtectedRoutes";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Landing";

import Login from "./pages/Users/login";
import WorkerForm from "./pages/Workers/Form";
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
import PayeeForm from "./pages/Payees/Form"

import Cheques from "./pages/Cheques/index";
import Cheque from "./pages/Cheques/show";


import Error from "./components/error";
import NotFound from "./components/notFound";

import "./App.css"

import { getUser } from "./features/Users/userSlice";
export const UserContext = React.createContext();

function App() {
	const u = useSelector((state) => state.user.user);
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState(null);
	const dispatch = useDispatch();
	const User = async () => {
		await axios.get("/api/login")
			.then((res) => {
				if (res.status === 200) {
					return res.data;
				}
				throw new Error("Not logged in");
			}).then(res => {
				if (res.user) {
					// console.log(res.user);
					setUser(res.user);
				}
			}).catch(err => {
				console.log(err);
			});
	};
	useEffect(() => {
		dispatch(getUser());
		User();
	}, []);

	const toggle = () => {
		setIsOpen(!isOpen);
	}


	return (
		<>
			<UserContext.Provider value={{ user, setUser }}>
				<Sidebar isOpen={isOpen} toggle={toggle} />
				<Navbar toggle={toggle} />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/login" exact element={!user ? <Login /> : <Navigate to="/" />} />
					<Route element={<AuthRoutes />}>
						<Route path="/changePassword" exact element={<ChangePassword />} />
						<Route path="/logs" exact element={<Logs />} />
						<Route element={<AdminRoutes />}>
							{/* Bills Routes */}
							<Route path="/bills" exact element={<Bills />} />
							<Route path="/bills/new" exact element={<NewBill />} />
							<Route path="/bills/:id" exact element={<Bill />} />
							<Route path="/bills/:id/edit" exact element={<Test />} />
							{/* Workers Routes */}
							<Route path="/workers" exact element={<Workers />} />
							<Route path="/workers/new" exact element={<WorkerForm />} />
							<Route path="/workers/:id" exact element={<Worker />} />
							<Route path="/workers/:id/edit" exact element={<WorkerForm />} />
							{/* Logs Routes */}
							<Route path="/logs/new" exact element={<Test />} />
							<Route path="/logs/:id" exact element={<Log />} />
							<Route path="/logs/:id/edit" exact element={<Test />} />
							{/* Payees Routes */}
							<Route path="/payees" exact element={<Payees />} />
							<Route path="/payees/new" exact element={<PayeeForm />} />
							<Route path="/payees/:id" exact element={<Payee />} />
							<Route path="/payees/:id/edit" exact element={<PayeeForm />} />
							{/* Cheques Routes */}
							<Route path="/cheques" exact element={<Cheques />} />
							<Route path="/cheques/new" exact element={<Test />} />
							<Route path="/cheques/:id" exact element={<Cheque />} />
							<Route path="/cheques/:id/edit" exact element={<Test />} />
						</Route>
					</Route>
					{/* Errors */}
					<Route path="/500" exact element={<Error />} />
					<Route path="*" exact element={<NotFound />} />
				</Routes >
			</UserContext.Provider>
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