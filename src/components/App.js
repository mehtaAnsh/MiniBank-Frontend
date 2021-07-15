import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './header';
import Home from './home';
import Footer from './footer';

import './App.css';

const App = () => {
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
					<Header />
					<Toaster />
					<Switch>
						<div style={{ minHeight: '84.5vh' }}>
							<Route exact path="/" component={Home} />
							<Redirect to="/" />
						</div>
					</Switch>
					<Footer />
				</Suspense>
			</BrowserRouter>
		</div>
	);
};

export default App;
