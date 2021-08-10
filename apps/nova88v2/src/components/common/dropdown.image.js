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

	SelectItem = (value, e) => {
		e.stopPropagation();
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
					key={`${this.props.mainKey}-${item.id ?? i}`}
					displayText={displayText}
					onClick={this.SelectItem.bind(this, i)}
					ImgURL={this.props.ImgURL + item.image?.toLowerCase()}
					className={this.props.className}
				/>
			);
		});

		let displayText = null;
		let selectedImg = null;
		if (
			this.props.selectedIdx !== null &&
			this.props.options[this.props.selectedIdx]
		) {
			const _s = this.props.options[this.props.selectedIdx];
			if (_s.displayText) {
				displayText = _s.displayText;
			} else {
				displayText = this.props.i18n[_s.displayKey];
			}
			selectedImg = _s
				? this.props.ImgURL + _s.image?.toLowerCase()
				: null;
		}
		return (
			<div
				className="inputBox"
				ref={this.wrapper}
				data-testid={this.props.testAttr}>
				<button
					className={`dropdown${
						this.state.isOpen ? " dropdownbank" : ""
					}`}
					onClick={this.ClickDropdown}>
					<div className={this.props.className}>
						<img src={selectedImg} alt="" />
					</div>
					<span>{displayText}</span>
					<i className="icon icon-keyboard_arrow_down" />
				</button>

				<div
					className={`dropdown-container${
						this.state.isOpen ? " active" : ""
					}`}>
					{arr}
				</div>
			</div>
		);
	}
}

DropdownBox.defaultProps = {
	colName: "",
	clickDropdown: null,
	i18n: {},
	selectedIdx: null,
	testAttr: null
};

DropdownBox.propTypes = {
	colName: PropTypes.string,
	onSelectItem: PropTypes.func.isRequired,
	clickDropdown: PropTypes.func,
	selectedIdx: PropTypes.number,
	mainKey: PropTypes.string.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string),
	ImgURL: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	testAttr: PropTypes.string
};

const Item = props => {
	return (
		<div className="dropdown-item" onClick={props.onClick}>
			<div className={props.className}>
				<img src={props.ImgURL} alt="" />
			</div>
			<span className="text">{props.displayText}</span>
		</div>
	);
};

Item.defaultProps = {
	className: "",
	ImgURL: "",
	displayText: ""
};

Item.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	ImgURL: PropTypes.string,
	displayText: PropTypes.string
};

export default DropdownBox;
