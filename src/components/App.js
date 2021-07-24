import React, { Suspense, useState, lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './header';
import Home from './home';
import Footer from './footer';
import { AuthContext } from '../context/AuthContext';

import './App.css';

const Verify = lazy(() => import('./verify'));
const Dashboard = lazy(() => import('./dashboard'));
const Transfer = lazy(() => import('./transfer'));
const UserTransactions = lazy(() => import('./userTransactions'));

const AdminHome = lazy(() => import('./admin/home'));
const AdminTransfer = lazy(() => import('./admin/transfer'));
const AdminUsers = lazy(() => import('./admin/users'));
const AdminAllTransactions = lazy(() => import('./admin/allTransactions'));

const App = () => {
	const [userDetails, setUserDetails] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const loader = () => (
		<div className="d-flex justify-content-center" data-aos="fade-out">
			<div className="spinner-border" role="status" style={{ marginTop: '50vh' }}>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);

	return (
		<div style={{ minHeight: '100vh' }}>
			<AuthContext.Provider value={{ isAdmin, isLoggedIn, userDetails }}>
				<BrowserRouter basename={`/MiniBank-Frontend`}>
					<Suspense fallback={loader}>
						<Header
							isAdmin={isAdmin}
							setIsAdmin={setIsAdmin}
							setUserDetails={setUserDetails}
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
						/>
						<Toaster />
						<Switch>
							<div style={{ minHeight: '84.5vh' }}>
								{/* Customer routes */}
								<Route exact path={`${process.env.PUBLIC_URL}/verify`}>
									<Verify setIsLoggedIn={setIsLoggedIn} />
								</Route>
								<Route exact path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />
								<Route exact path={`${process.env.PUBLIC_URL}/transfer`} component={Transfer} />
								<Route
									exact
									path={`${process.env.PUBLIC_URL}/userTransactions`}
									component={UserTransactions}
								/>

								{/* Admin routes*/}
								<Route exact path={`${process.env.PUBLIC_URL}/admin/home`} component={AdminHome} />
								<Route exact path={`${process.env.PUBLIC_URL}/admin/users`} component={AdminUsers} />
								<Route
									exact
									path={`${process.env.PUBLIC_URL}/admin/transfer`}
									component={AdminTransfer}
								/>
								<Route
									exact
									path={`${process.env.PUBLIC_URL}/admin/allTransactions`}
									component={AdminAllTransactions}
								/>

								<Route exact path={`${process.env.PUBLIC_URL}/`}>
									<Home
										setUserDetails={setUserDetails}
										isLoggedIn={isLoggedIn}
										setIsLoggedIn={setIsLoggedIn}
										isAdmin={isAdmin}
										setIsAdmin={setIsAdmin}
									/>
								</Route>
								<Redirect to={`/`}></Redirect>
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
