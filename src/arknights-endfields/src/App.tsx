import { useState } from "react";
import { Icon } from "@iconify/react";
import Meta from "../../Meta.tsx";
import "./App.css";

export const App: React.FC = () => {
	console.log("EndfieldsApp rendered");
	const [oroberyl, setOroberyl] = useState<number>(0);
	const [origeometry, setOrigeometry] = useState<number>(0);
	const [ticket, setTicket] = useState<number>(0);
	const [bondQuota, setBondQuota] = useState<number>(0);
	const [aicQuotaNumber, setAicQuotaNumber] = useState<number>(0);
	const [aicQuotaPrice, setAicQuotaPrice] = useState<number>(70);

	const origeometryValue = origeometry * 75;
	const aicTicket = Math.min(5, Math.floor(aicQuotaNumber / aicQuotaPrice));
	const bondTicket = Math.floor(bondQuota / 25);
	const totalTicket = ticket + aicTicket + bondTicket;
	const totalPull = Math.floor((oroberyl + origeometryValue) / 500) + totalTicket;

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
					AIC price (per ticket)
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
					<div className="result-item">
						<span className="result-label">Tickets owned</span>
						<span className="result-value">{totalTicket}</span>
					</div>
					<div className="result-item">
						<span className="result-label">AIC tickets</span>
						<span className="result-value">{aicTicket}</span>
					</div>
					<div className="result-item">
						<span className="result-label">Bond tickets</span>
						<span className="result-value">{bondTicket}</span>
					</div>
					<div className="result-item">
						<span className="result-label">Oroberyl + origeometry</span>
						<span className="result-value">{oroberyl + origeometryValue}</span>
					</div>
					<div className="result-item">
						<span className="result-label">Pulls via resources</span>
						<span className="result-value">{Math.floor((oroberyl + origeometryValue) / 500)}</span>
					</div>
				</div>
				<div className="total-pulls">
					<span>Total pulls</span>
					<span className="total-value">{totalPull}</span>
				</div>
			</div>
		</div>
	);
};
