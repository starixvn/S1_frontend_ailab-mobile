import React, { Component, createRef } from "react";

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

	SelectItem = (value, e) => {
		e.stopPropagation();
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

const Item = props => {
	return (
		<div className="dropdown-item" onClick={props.onClick}>
			{props.iconClassName ? <i className={props.iconClassName} /> : null}
			<span className="text">{props.displayText}</span>
		</div>
	);
};
export default IconDropdown;
