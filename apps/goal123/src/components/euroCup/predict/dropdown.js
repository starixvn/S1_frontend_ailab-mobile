import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { sportsImgUrl } from "../../../config";

const Dropdown = ({ placeholder, options, onSelect, disable }) => {
	const [isActive, setIsActive] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const ref = useRef(null);

	const handleItemClick = item => {
		onSelect(typeof item === "string" ? item : item.countryId);
		setSelectedItem(item);
		setIsActive(false);
	};

	useEffect(() => {
		const handleClickOutside = e => {
			if (ref.current && !ref.current.contains(e.target)) {
				setIsActive(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className={`dropdown ${selectedItem ? "check" : ""}`} ref={ref}>
			<button
				type="button"
				className="btn"
				onClick={() => {
					setIsActive(prev => !prev);
				}}>
				{(typeof selectedItem === "string"
					? selectedItem
					: selectedItem?.countryName) || placeholder}
			</button>
			{!disable && (
				<div
					className={`dropdown-container ${
						isActive ? "active" : ""
					}`}>
					{options.map(item => {
						if (typeof item === "string") {
							return (
								<div
									className="dropdown-item"
									style={{ pointerEvents: "auto" }}
									key={item}
									onClick={() => handleItemClick(item)}>
									{item}
								</div>
							);
						}
						return (
							<div
								className="dropdown-item"
								style={{ pointerEvents: "auto" }}
								key={item.countryId}
								onClick={() => handleItemClick(item)}>
								<img
									src={`${sportsImgUrl}/Country%20Team/${item.imageName}`}
									alt=""
								/>
								{item.countryName}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

Dropdown.defaultProps = {
	disable: false
};

Dropdown.propTypes = {
	placeholder: PropTypes.string.isRequired,
	options: PropTypes.any.isRequired,
	onSelect: PropTypes.func.isRequired,
	disable: PropTypes.bool
};

export default Dropdown;
