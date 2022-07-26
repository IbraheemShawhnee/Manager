import React, { useEffect, useState } from "react";
import { Route, Routes, useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AuthRoutes, AdminRoutes } from "./components/ProtectedRoutes";

import * as Components from "./components";
import * as Pages from "./pages/index";

import "./App.css"

import { getUser } from "./features/Users/userSlice";
export const UserContext = React.createContext();

function App() {

	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUser());
	}, []);

	const toggle = () => {
		setIsOpen(!isOpen);
	}
	const user = useSelector((state) => state.user.user);
	return (
		<>
			<UserContext.Provider value={{ user }}>
				<Components.Sidebar isOpen={isOpen} toggle={toggle} />
				<Components.Navbar toggle={toggle} />
				<Routes>
					<Route path="/" exact element={<Pages.Home />} />
					<Route path="/login" exact element={!user ? <Pages.Login /> : <Navigate to="/" />} />
					<Route element={<AuthRoutes />}>
						<Route path="/changePassword" exact element={<Pages.ChangePassword />} />
						<Route path="/logs" exact element={<Pages.Logs />} />
						<Route element={<AdminRoutes />}>
							{/* Bills Routes */}
							<Route path="/bills" exact element={<Pages.Bills />} />
							<Route path="/bills/new" exact element={<Pages.BillForm />} />
							<Route path="/bills/:id" exact element={<Pages.Bill />} />
							<Route path="/bills/:id/edit" exact element={<Pages.BillForm />} />
							{/* Workers Routes */}
							<Route path="/workers" exact element={<Pages.Workers />} />
							<Route path="/workers/new" exact element={<Pages.WorkerForm />} />
							<Route path="/workers/:id" exact element={<Pages.Worker />} />
							<Route path="/workers/:id/edit" exact element={<Pages.WorkerForm />} />
							{/* Logs Routes */}
							<Route path="/logs/new" exact element={<Pages.LogForm />} />
							<Route path="/logs/:id" exact element={<Pages.Log />} />
							<Route path="/logs/:id/edit" exact element={<Pages.LogForm />} />
							{/* Payees Routes */}
							<Route path="/payees" exact element={<Pages.Payees />} />
							<Route path="/payees/new" exact element={<Pages.PayeeForm />} />
							<Route path="/payees/:id" exact element={<Pages.Payee />} />
							<Route path="/payees/:id/edit" exact element={<Pages.PayeeForm />} />
							{/* Cheques Routes */}
							<Route path="/cheques" exact element={<Pages.Cheques />} />
							<Route path="/cheques/new" exact element={<Pages.ChequeForm />} />
							<Route path="/cheques/:id" exact element={<Pages.Cheque />} />
							<Route path="/cheques/:id/edit" exact element={<Pages.ChequeForm />} />
						</Route>
					</Route>
					{/* Errors */}
					<Route path="/500" exact element={<Components.Error />} />
					<Route path="*" exact element={<Components.NotFound />} />
				</Routes >
			</UserContext.Provider>
		</>
	);
}
export default App;