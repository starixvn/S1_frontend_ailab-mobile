import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

export class IconDropdown extends Component {
	constructor(props) {
		super(props);
		document.addEventListener("mousedown", this.handleClickOutside);
		this.state = {
			isOpen: false
		};
		this.wrapper = createRef(null);
	}

	handleClickOutside = e => {
		if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
			this.setState({ isOpen: false });
		}
	};

	ClickDropdown = () => {
		this.setState(prev => ({ isOpen: !prev.isOpen }));
	};

	SelectItem = value => {
		this.setState({ isOpen: false });
		this.props.onSelectItem(value);
	};

	render() {
		const arr = this.props.options.map((item, i) => {
			const displayText = item.displayText
				? item.displayText
				: this.props.i18n?.[item.displayKey];
			return (
				<Item
					key={`${this.props.mainKey}-${item.displayKey ?? i}`}
					displayText={displayText}
					iconClassName={this.props.options[i].iconClassName}
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
				<a className="btn">
					<i
						className={
							this.props.icon
								? this.props.icon
								: this.props.options[this.props.selectedIdx]
										?.iconClassName
						}
					/>
					<span className="text">{selected}</span>
				</a>
				<div className="dropdown-container">{arr}</div>
			</div>
		);
	}
}

IconDropdown.defaultProps = {
	options: [],
	mainKey: "",
	placeholder: "",
	icon: null,
	selectedIdx: null,
	i18n: {}
};

IconDropdown.propTypes = {
	onSelectItem: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.object),
	i18n: PropTypes.objectOf(PropTypes.string),
	mainKey: PropTypes.string,
	selectedIdx: PropTypes.number,
	placeholder: PropTypes.string,
	icon: PropTypes.string
};

const Item = props => {
	const handleClick = e => {
		e.stopPropagation();
		props.onClick(props.idx);
	};
	return (
		<div className="dropdown-item" onClick={handleClick}>
			<i className={props.iconClassName} />
			<span className="text">{props.displayText}</span>
		</div>
	);
};

Item.defaultProps = {
	iconClassName: "",
	displayText: "",
	idx: 0
};

Item.propTypes = {
	onClick: PropTypes.func.isRequired,
	iconClassName: PropTypes.string,
	displayText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	idx: PropTypes.number
};

export default IconDropdown;
