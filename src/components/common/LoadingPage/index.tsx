import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from './Loading';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));

function App() {
	return (
		<div>
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<Suspense fallback={<Loading />}>
							<Home />
						</Suspense>
					)}
				/>
				<Route
					exact
					path="/about"
					render={() => (
						<Suspense fallback={<Loading />}>
							<About />
						</Suspense>
					)}
				/>
				<Route
					exact
					path="/contact"
					render={() => (
						<Suspense fallback={<Loading />}>
							<Contact />
						</Suspense>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
