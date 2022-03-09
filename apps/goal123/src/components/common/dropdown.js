import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

export class DropdownBox extends Component {
	constructor(props) {
		super(props);
		document.addEventListener("mousedown", this.handleClickOutside);
		this.state = { isOpen: false };
		this.wrapper = createRef(null);
	}

	handleClickOutside = e => {
		if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
			this.setState({ isOpen: false });
		}
	};

	ClickDropdown = () => {
		this.setState(prev => ({ isOpen: !prev.isOpen }));
		if (this.props.clickDropdown) {
			this.props.clickDropdown(this.props.colName);
		}
	};

	SelectItem = value => {
		this.setState({ isOpen: false });
		this.props.onSelectItem(value, this.props.colName);
	};

	render() {
		const arr = this.props.options.map((item, i) => {
			const displayText = item.displayText
				? item.displayText
				: this.props.i18n?.[item.displayKey];
			return (
				<Item
					key={`${this.props.mainKey}-${
						item.id ?? item.displayKey ?? i
					}-${displayText}`}
					displayText={displayText}
					idx={i}
					onClick={this.SelectItem}
				/>
			);
		});

		let selected = null;
		if (this.props.options[this.props.selectedIdx]) {
			const _s = this.props.options[this.props.selectedIdx];

			if (_s.displayText) {
				selected = _s.displayText;
			} else {
				selected = this.props.i18n[_s.displayKey];
			}
		} else {
			selected = this.props.placeholder;
		}

		return (
			<div
				ref={this.wrapper}
				className={`dropdown${this.state.isOpen ? " open" : ""}`}
				onClick={this.ClickDropdown}>
				<button className="btn">
					{this.props.important && <span className="txt-red">*</span>}
					<span className="text">{selected}</span>
				</button>
				<div
					className={`dropdown-container${
						this.state.isOpen ? " open" : ""
					}`}>
					{arr}
				</div>
			</div>
		);
	}
}

DropdownBox.defaultProps = {
	colName: "",
	options: [],
	mainKey: "",
	placeholder: "",
	i18n: {},
	clickDropdown: null,
	selectedIdx: null,
	important: false
};

DropdownBox.propTypes = {
	colName: PropTypes.string,
	onSelectItem: PropTypes.func.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string),
	options: PropTypes.arrayOf(PropTypes.object),
	selectedIdx: PropTypes.number,
	mainKey: PropTypes.string,
	clickDropdown: PropTypes.func,
	placeholder: PropTypes.string,
	important: PropTypes.bool
};

const Item = props => {
	const handleClick = e => {
		e.stopPropagation();
		props.onClick(props.idx);
	};
	return (
		<div
			className="dropdown-item"
			data-testid="dp-item"
			onClick={handleClick}>
			<span className="text">{props.displayText}</span>
		</div>
	);
};

Item.defaultProps = {
	displayText: "",
	idx: null
};

Item.propTypes = {
	onClick: PropTypes.func.isRequired,
	displayText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	idx: PropTypes.number
};

export default DropdownBox;
