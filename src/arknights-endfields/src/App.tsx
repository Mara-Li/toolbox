import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Meta from "../../Meta.tsx";
import "./App.css";

export const App: React.FC = () => {
	console.log("EndfieldsApp rendered");
	// try to initialize inputs from saved values
	const savedInputs = (() => {
		try {
			const raw = localStorage.getItem("arknightsInputs");
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	})();

	const [oroberyl, setOroberyl] = useState<number>(savedInputs?.oroberyl ?? 0);
	const [origeometry, setOrigeometry] = useState<number>(
		savedInputs?.origeometry ?? 0,
	);
	const [ticket, setTicket] = useState<number>(savedInputs?.ticket ?? 0);
	const [bondQuota, setBondQuota] = useState<number>(
		savedInputs?.bondQuota ?? 0,
	);
	const [aicQuotaNumber, setAicQuotaNumber] = useState<number>(
		savedInputs?.aicQuotaNumber ?? 0,
	);
	const [aicQuotaPrice, setAicQuotaPrice] = useState<number>(
		savedInputs?.aicQuotaPrice ?? 70,
	);

	// compute derived values in a memo so they only change when inputs change
	const { aicTicket, bondTicket, totalTicket, totalPull, resourcesValue } =
		React.useMemo(() => {
			const roValue = origeometry * 75;
			const aic = Math.min(5, Math.floor(aicQuotaNumber / aicQuotaPrice));
			const bond = Math.floor(bondQuota / 25);
			const tTicket = ticket + aic + bond;
			const pulls = Math.floor((oroberyl + roValue) / 500) + tTicket;
			return {
				aicTicket: aic,
				bondTicket: bond,
				totalTicket: tTicket,
				totalPull: pulls,
				resourcesValue: oroberyl + roValue,
			};
		}, [
			oroberyl,
			origeometry,
			ticket,
			bondQuota,
			aicQuotaNumber,
			aicQuotaPrice,
		]);

	// persist input values so they survive reload
	React.useEffect(() => {
		const inputs = {
			oroberyl,
			origeometry,
			ticket,
			bondQuota,
			aicQuotaNumber,
			aicQuotaPrice,
		};
		localStorage.setItem("arknightsInputs", JSON.stringify(inputs));
	}, [oroberyl, origeometry, ticket, bondQuota, aicQuotaNumber, aicQuotaPrice]);

	return (
		<div className="arknights-container">
			<Meta project="/arknights-endfields/" />
			<a
				href="/"
				className="home-button"
				aria-label="Back to the list of projects"
			>
				<Icon icon="mdi:home" width="32" height="32" />
			</a>
			<h1>Arknights Endfields</h1>
			<h2>How much can I pull?</h2>

			<div className="inputs-grid">
				<label>
					Oroberyl
					<input
						type="number"
						value={oroberyl}
						onChange={(e) => setOroberyl(Number(e.target.value))}
					/>
				</label>
				<label>
					Origeometry
					<input
						type="number"
						value={origeometry}
						onChange={(e) => setOrigeometry(Number(e.target.value))}
					/>
				</label>
				<label>
					Tickets already owned
					<input
						type="number"
						value={ticket}
						onChange={(e) => setTicket(Number(e.target.value))}
					/>
				</label>
				<label>
					Bond quota
					<input
						type="number"
						value={bondQuota}
						onChange={(e) => setBondQuota(Number(e.target.value))}
					/>
				</label>
				<label>
					AIC quota
					<input
						type="number"
						value={aicQuotaNumber}
						onChange={(e) => setAicQuotaNumber(Number(e.target.value))}
					/>
				</label>
				<label>
					AIC ticket price
					<input
						type="number"
						value={aicQuotaPrice}
						onChange={(e) => setAicQuotaPrice(Number(e.target.value))}
					/>
				</label>
			</div>

			<div className="result-box">
				<h2>Results</h2>
				<div className="result-grid">
					<div className="result-item total-ticket">
						<span className="result-label">Pulls via resources</span>
						<span className="result-value">
							{Math.floor(resourcesValue / 500)}
						</span>
					</div>
					<div className="result-item total-ticket">
						<span className="result-label">Total tickets</span>
						<span className="result-value">{totalTicket}</span>
					</div>
					<div className="result-item">
						<span className="result-label">Bond tickets</span>
						<span className="result-value">{bondTicket}</span>
					</div>

					<div className="result-item">
						<span className="result-label">AIC tickets</span>
						<span className="result-value">{aicTicket}</span>
					</div>

					<div className="result-item total-ticket">
						<span className="result-label">Ressources only</span>
						<span className="result-value">{resourcesValue}</span>
					</div>
				</div>
				<div className="total-pulls">
					<span>Total pulls</span>
					<span className="total-value">{totalPull}</span>
				</div>
			</div>
			<button
				type="button"
				className="reset-button"
				onClick={() => {
					setOroberyl(0);
					setOrigeometry(0);
					setTicket(0);
					setBondQuota(0);
					setAicQuotaNumber(0);
					setAicQuotaPrice(70);
					localStorage.removeItem("arknightsInputs");
				}}
			>
				Reset
			</button>
			<br />
		</div>
	);
};
