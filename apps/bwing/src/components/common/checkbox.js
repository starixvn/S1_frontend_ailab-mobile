import React from "react";

const Checkbox = props => {
	return (
		<div className={props.className}>
			<input
				type="checkbox"
				id={props.id}
				checked={props.checked}
				onChange={props.onChange}
			/>
			<label htmlFor={props.id}>
				<div />
			</label>
			{props.children}
		</div>
	);
};

export default Checkbox;
