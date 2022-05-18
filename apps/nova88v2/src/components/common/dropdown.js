import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { defCurrencyToClass } from "./common";

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
					currencyId={item.id}
					key={`${this.props.mainKey}-${item.id ?? i}-${displayText}`}
					displayText={displayText}
					onClick={this.SelectItem.bind(this, i)}
					flag={this.props.flag}
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

		const inputBoxClassName = [
			`inputBox`,
			...this.props.inputBoxClassName,
			this.props.checked === false && "error"
		]
			.filter(Boolean)
			.join(" ");

		return (
			<>
				<div
					className={`infoModule${
						this.props.className ? ` ${this.props.className}` : ""
					}`}
					data-testid={this.props.testAttr}
					ref={this.wrapper}>
					<div
						className={`inputInfo ${
							this.props.showTips ? " active" : ""
						}`}>
						{this.props.infoText}
					</div>
					<div className={inputBoxClassName}>
						{this.props.showDot && (
							<span className="text-red">*</span>
						)}
						{this.props.colName === "Currency" && (
							<i className="icon icon-coin-dollar" />
						)}
						{this.props.birthDayIcon && (
							<i className="icon icon-cake" />
						)}
						<button
							onBlur={this.props.onBlur}
							className="dropdown btn"
							data-testid="dropdown_btn"
							onClick={this.ClickDropdown}>
							<div>
								{this.props.options[this.props.selectedIdx] && (
									<div
										className={`flag ${
											defCurrencyToClass[
												this.props.options[
													this.props.selectedIdx
												].id
											]
										}`}
									/>
								)}
								<span
									className="text"
									data-testid={`${this.props.testAttr}_dropdown-text`}>
									{this.props.defaultOption ?? selected}
								</span>
							</div>

							<i className="icon icon-keyboard_arrow_down" />
						</button>
						{this.props.hideInfo ? null : (
							<div className="icon-module">
								<i
									className="icon icon-information"
									onClick={this.props.clickInfo}
								/>
							</div>
						)}
						<div
							className={`dropdown-container${
								this.state.isOpen ? " active" : ""
							}`}>
							{arr}
						</div>
					</div>
					{this.props.rightBtn ?? null}
				</div>
				<div
					className={`tip${this.props.warningMsg ? " active" : ""}`}
					data-testid={this.props.testAttr}>
					{this.props.warningMsg}
				</div>
			</>
		);
	}
}

DropdownBox.defaultProps = {
	colName: "",
	defaultOption: null,
	placeholder: "",
	selectedIdx: null,
	clickDropdown: null,
	i18n: {},
	checked: null,
	showTips: "",
	clickInfo: null,
	infoText: "",
	warningMsg: "",
	testAttr: "",
	hideInfo: false,
	onBlur: () => null,
	birthDayIcon: false,
	showDot: false,
	className: "",
	inputBoxClassName: ""
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
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	checked: PropTypes.bool,
	showTips: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	clickInfo: PropTypes.func,
	infoText: PropTypes.string,
	warningMsg: PropTypes.string,
	testAttr: PropTypes.string,
	hideInfo: PropTypes.bool,
	onBlur: PropTypes.func,
	birthDayIcon: PropTypes.bool,
	showDot: PropTypes.bool,
	className: PropTypes.string,
	inputBoxClassName: PropTypes.string
};

const Item = props => {
	return (
		<div
			className="dropdown-item"
			data-testid="dropdown-item"
			onClick={props.onClick}>
			{props.flag && props.currencyId && (
				<div
					className={`flag ${defCurrencyToClass[props.currencyId]}`}
				/>
			)}
			<span className="text">{props.displayText}</span>
		</div>
	);
};

Item.defaultProps = {
	displayText: ""
};

Item.propTypes = {
	onClick: PropTypes.func.isRequired,
	displayText: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DropdownBox;
