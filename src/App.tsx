import type React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { App as RemoveBGApp } from "./remove_bg/src/App.tsx";
import { App as EndfieldsApp } from "./arknights-endfields/src/App.tsx";

const App: React.FC = () => {
	return (
		<HelmetProvider>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
				<Route path="/remove_bg/*" element={<RemoveBGApp />} />
				<Route path="/arknights-endfields/*" element={<EndfieldsApp />} />
				{/* fallback when nothing matches */}
				<Route path="*" element={<div style={{padding:20}}>Page introuvable.</div>} />
				</Routes>
			</Router>
		</HelmetProvider>
	);
};

export default App;
