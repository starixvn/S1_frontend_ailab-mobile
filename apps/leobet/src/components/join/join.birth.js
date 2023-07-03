import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

const Birthday = ({
	i18n,
	monthOptions,
	dropdownStateHandler,
	monthSelectedIdx,
	dateOptions,
	daySelectedIdx,
	yearOptions,
	yearSelectedIdx,
	testAttr
}) => {
	return (
		<div className="infoModule parts">
			<Dropdown
				testAttr={`${testAttr}_m`}
				i18n={i18n}
				mainKey="profile-month"
				options={monthOptions}
				colName="Birth_m"
				onSelectItem={dropdownStateHandler.bind(null, "Birth_m")}
				selectedIdx={monthSelectedIdx}
				birthDayIcon={true}
			/>
			<Dropdown
				testAttr={`${testAttr}_d`}
				mainKey="profile-day"
				options={dateOptions}
				colName="Birth_d"
				onSelectItem={dropdownStateHandler.bind(null, "Birth_d")}
				selectedIdx={daySelectedIdx}
			/>
			<Dropdown
				testAttr={`${testAttr}_y`}
				mainKey="profile-year"
				options={yearOptions}
				colName="Birth_y"
				onSelectItem={dropdownStateHandler.bind(null, "Birth_y")}
				selectedIdx={yearSelectedIdx}
			/>
		</div>
	);
};

Birthday.defaultProps = {
	monthSelectedIdx: null,
	daySelectedIdx: null,
	yearSelectedIdx: null
};

Birthday.propTypes = {
	monthOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	dateOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	yearOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	monthSelectedIdx: PropTypes.number,
	daySelectedIdx: PropTypes.number,
	yearSelectedIdx: PropTypes.number,
	dropdownStateHandler: PropTypes.func.isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

class Dropdown extends Component {
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
					testAttr={this.props.testAttr}
					key={`${this.props.mainKey}-${item.id ?? i}`}
					displayText={displayText}
					onClick={this.SelectItem.bind(this, i)}
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
			<div className="inputBox" ref={this.wrapper}>
				{this.props.birthDayIcon && <i className="icon icon-cake" />}
				<button
					className="dropdown"
					onClick={this.ClickDropdown}
					data-testid={`${this.props.testAttr}_displayText`}>
					{this.props.defaultOption ?? selected}
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

const Item = props => {
	return (
		<div
			className="dropdown-item"
			onClick={props.onClick}
			data-testid={`${props.testAttr}_item`}>
			{props.displayText}
		</div>
	);
};

export default Birthday;
