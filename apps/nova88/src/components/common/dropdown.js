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
					key={`${this.props.mainKey}-${item.id}`}
					displayText={displayText}
					onClick={this.SelectItem.bind(null, i)}
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
					<span className="text">
						{this.props.defaultOption ?? selected}
					</span>
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
	defaultOption: null,
	placeholder: "",
	selectedIdx: null,
	clickDropdown: null,
	i18n: {}
};

DropdownBox.propTypes = {
	colName: PropTypes.string,
	onSelectItem: PropTypes.func.isRequired,
	clickDropdown: PropTypes.func,
	selectedIdx: PropTypes.number,
	mainKey: PropTypes.string.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string),
	placeholder: PropTypes.string,
	defaultOption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	options: PropTypes.arrayOf(PropTypes.object).isRequired
};

const Item = props => {
	return (
		<div className="dropdown-item" onClick={props.onClick}>
			<span className="text">{props.displayText}</span>
		</div>
	);
};

Item.defaultProps = {
	displayText: ""
};

Item.propTypes = {
	onClick: PropTypes.func.isRequired,
	displayText: PropTypes.string
};

export default DropdownBox;
