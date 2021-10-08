import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

const Detail = ({
	showDate,
	title,
	onClick,
	content,
	isOpen,
	isRead,
	onChange,
	isChecked
}) => {
	return (
		<div
			className={`account${isRead ? "" : " noread"}${
				isOpen ? " active" : ""
			}`}>
			<div className="info">
				<label className="checkbox">
					<input type="checkbox" onChange={onChange} />
					<i
						className={`icon icon-checkbox${
							isChecked ? "-checked" : ""
						}`}
					/>
				</label>
				<div className="introduction">
					<span className="title">{title}</span>
					<span>
						{moment(showDate).format("MM/DD/YYYY h:mm:ss A")}
					</span>
				</div>
				<button
					className={`icon icon-keyboard_arrow_down ${
						isOpen ? " active" : ""
					}`}
					onClick={onClick}
				/>
			</div>
			<div
				className="content backstage"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
	);
};

Detail.defaultProps = {
	isRead: false,
	isChecked: false,
	isOpen: false,
	content: ""
};

Detail.propTypes = {
	onChange: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	isRead: PropTypes.bool,
	isChecked: PropTypes.bool,
	isOpen: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	content: PropTypes.string,
	showDate: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired
};

export default Detail;
