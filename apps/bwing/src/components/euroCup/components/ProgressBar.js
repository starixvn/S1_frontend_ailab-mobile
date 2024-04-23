import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PropTypes from "prop-types";

const ProgressBar = ({ cur, target }) => {
	return (
		<div style={{ width: "47vw" }}>
			<div style={{ padding: "20px" }}>
				<CircularProgressbarWithChildren
					value={(cur / target) * 100}
					counterClockwise
					strokeWidth={4}
					styles={{
						root: {},
						path: {
							stroke: "gold"
						},
						trail: {
							stroke: "#102FAC",
							strokeLinecap: "butt",
							transform: "rotate(0.25turn)",
							transformOrigin: "center center"
						},
						text: {
							fill: "#f88",
							fontSize: "6px"
						}
					}}>
					<div
						style={{
							fontSize: 10,
							fontWeight: 600,
							color: "#fff"
						}}>
						Currently accumulated
					</div>
					<div
						style={{
							fontSize: 28,
							fontWeight: "bold",
							color: "#102FAC"
						}}>
						<span style={{ color: "#F9D64B" }}>{cur}</span>/
						<span>{target}</span>
					</div>
				</CircularProgressbarWithChildren>
			</div>
		</div>
	);
};

ProgressBar.propTypes = {
	cur: PropTypes.number.isRequired,
	target: PropTypes.number.isRequired
};

export default ProgressBar;
