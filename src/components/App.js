import React, { Suspense, useState, lazy } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './header';
import Home from './home';
import Footer from './footer';
import { AuthContext } from '../context/AuthContext';

import './App.css';

const Dashboard = lazy(() => import('./dashboard'));
const Transfer = lazy(() => import('./transfer'));
const Transactions = lazy(() => import('./transactions'));

const App = () => {
	const [userDetails, setUserDetails] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const loader = () => (
		<div className="d-flex justify-content-center" data-aos="fade-out">
			<div className="spinner-border" role="status" style={{ marginTop: '50vh' }}>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);

	return (
		<div style={{ minHeight: '100vh' }}>
			<AuthContext.Provider value={{ isLoggedIn, userDetails }}>
				<BrowserRouter>
					<Suspense fallback={loader}>
						<Header setUserDetails={setUserDetails} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
						<Toaster />
						<Switch>
							<div style={{ minHeight: '84.5vh' }}>
								<Route exact path="/dashboard" component={Dashboard} />
								<Route exact path="/transfer" component={Transfer} />
								<Route exact path="/transactions" component={Transactions} />
								<Route exact path="/">
									<Home
										setUserDetails={setUserDetails}
										isLoggedIn={isLoggedIn}
										setIsLoggedIn={setIsLoggedIn}
									/>
								</Route>
							</div>
						</Switch>
						<Footer />
					</Suspense>
				</BrowserRouter>
			</AuthContext.Provider>
		</div>
	);
};

export default App;
