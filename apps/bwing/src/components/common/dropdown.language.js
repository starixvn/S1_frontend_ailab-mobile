import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { siteInfo } from "../../config";
import DefLangs from "../../datas/defLangs";

const languageList = () => {
	let _siteInfo = siteInfo();
	return _siteInfo.siteLangList.map(l => DefLangs[l]);
};

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
		this.setState({ isOpen: !this.state.isOpen });
	};
	SelectItem = value => {
		this.setState({ isOpen: false });
		this.props.onSelectItem(value);
	};

	render() {
		let currentSelect = null;
		let rows = languageList().map(item => {
			let content = (
				<>
					<img src={item.img} alt={item.value} />
					<span>{item.displayText}</span>
				</>
			);

			if (item.value === this.props.langId) {
				currentSelect = content;
			}
			return (
				<li
					key={`${this.props.mainKey}-${item.value}`}
					onClick={this.SelectItem.bind(this, item.value)}>
					{content}
				</li>
			);
		});

		return (
			<div
				ref={this.wrapper}
				className={`language${this.state.isOpen ? " open" : ""}`}
				onClick={this.ClickDropdown}>
				<div className="text">
					{currentSelect}
					<i className="icon icon-arrow_drop_down"></i>
				</div>
				<div className="languageOption">
					<ul>{rows}</ul>
				</div>
			</div>
		);
	}
}

DropdownBox.propTypes = {
	onSelectItem: PropTypes.func,
	mainKey: PropTypes.string,
	langId: PropTypes.string
};

export default DropdownBox;
