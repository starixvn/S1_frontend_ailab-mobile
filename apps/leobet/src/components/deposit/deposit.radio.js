import React from "react";
import PropTypes from "prop-types";

const Radio = ({
	radioGroup,
	id,
	imgUrl,
	imgAlt,
	onChange,
	isSelect,
	className
}) => {
	return (
		<div className={className}>
			<input
				type="radio"
				name={radioGroup}
				id={id}
				value=""
				onChange={onChange}
				checked={isSelect}
			/>
			<label htmlFor={id}>
				<div />
			</label>
			<div className="bankName">
				<img src={imgUrl} alt={imgAlt} />
			</div>
		</div>
	);
};

Radio.defaultProps = {
	className: ""
};

Radio.propTypes = {
	id: PropTypes.string.isRequired,
	imgUrl: PropTypes.string.isRequired,
	imgAlt: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	isSelect: PropTypes.bool.isRequired,
	radioGroup: PropTypes.string.isRequired,
	className: PropTypes.string
};

export default Radio;
