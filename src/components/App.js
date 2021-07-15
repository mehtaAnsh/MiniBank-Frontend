import React, { Suspense, useState, lazy } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './header';
import Home from './home';
import Footer from './footer';

import './App.css';

import Dashboard from './dashboard';

const App = () => {
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
			<BrowserRouter>
				<Suspense fallback={loader}>
					<Header isLoggedIn={isLoggedIn} />
					<Toaster />
					<Switch>
						<div style={{ minHeight: '84.5vh' }}>
							<Route exact path="/dashboard" component={Dashboard} />
							<Route exact path="/">
								<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
							</Route>
						</div>
					</Switch>
					<Footer />
				</Suspense>
			</BrowserRouter>
		</div>
	);
};

export default App;
