import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

import { Outlet } from "react-router-dom";

// Styles
import "./App.css";

// import components
import { Header, Footer } from "./components";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login(userData));
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => {
				console.log("Appwrite service :: Get current user :: Error ::", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return !loading ? (
		<div className="min-h-screen flex flex-wrap content-between bg-gray-400">
			<div className="w-full block">
				<Header />
				<main>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	) : null;
}

export default App;
