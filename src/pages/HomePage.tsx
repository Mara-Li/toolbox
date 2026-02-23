import type React from "react";
import metadata from "../metadata.json" with { type: "json" }; // Charger les métadonnées
import Card from "./Card";
import "./HomePage.css";
import Meta from "../Meta.tsx";

const HomePage: React.FC = () => {
	return (
		<div className="home-container">
			<Meta project="/" />
			<h1>Mara-Li's toolbox</h1>
			<div className="card-container">
				{metadata
					.filter((x) => x.project !== "/")
					.map((data, index) => (
						<Card
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							title={data.title ?? "Titre non défini"}
							description={data.description ?? "Description non définie"}
							image={data.og_image}
							url={data.project}
						/>
					))}
			</div>
		</div>
	);
};

export default HomePage;
