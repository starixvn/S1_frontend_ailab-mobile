import React, { useState } from "react";
import { number_format } from "@ailab-mobile/common";
import PropTypes from "prop-types";

export default ({ i18n, refList, depositAmount }) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = _isOpen => {
		setIsOpen(() => _isOpen);
	};
	return refList && refList.length > 0 ? (
		<Content
			i18n={i18n}
			depositAmount={depositAmount}
			handleOpen={handleOpen}
			isOpen={isOpen}>
			{refList.map(r => {
				const { depositId, amount } = r;
				return (
					<Record
						key={`promo-depositRecord-multi-${depositId}`}
						isOpen={isOpen}
						depositId={depositId}
						amount={amount}
					/>
				);
			})}
		</Content>
	) : null;
};

export const Record = ({
	isOpen,
	depositId,
	amount,
	isConvert,
	divisionBy1000
}) => (
	<div className={isOpen ? "open" : ""}>
		<div>{depositId}</div>
		<div>{number_format(amount, isConvert, divisionBy1000)}</div>
	</div>
);

Record.propTypes = {
	isConvert: PropTypes.bool.isRequired
};

export const Content = ({
	i18n,
	children,
	depositAmount,
	handleOpen,
	isOpen,
	isConvert,
	divisionBy1000
}) => (
	<>
		<div className="minAmount">
			<div className={isOpen ? "open" : ""}>
				<div>{i18n.lbl_ID}</div>
				<div>{i18n.lbl_Amount}</div>
			</div>
			<div>
				<div></div>
				<div></div>
			</div>
			{children}
			<div className={isOpen ? "open" : ""}>
				<div>{i18n.lbl_Total}</div>
				<div>
					{number_format(depositAmount, isConvert, divisionBy1000)}
				</div>
			</div>
		</div>
		<button
			className="ViewAllAmount"
			onClick={handleOpen.bind(this, !isOpen)}>
			{i18n.lbl_ViewAll}
			<span
				className={`icon icon-keyboard_arrow_down${
					isOpen ? " open" : ""
				}`}></span>
		</button>
	</>
);

Content.propTypes = {
	isConvert: PropTypes.bool.isRequired
};
