import React, { useContext } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { i18nContext, popBoxContext } from "Context";

const PopBoxDepositMsg = ({ transId, depositMessageDetail }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};

	return (
		<div className="pop">
			<div className="statustitle">
				{transId} {i18n.lbl_Message}
			</div>
			<div className="statuscontent">
				{depositMessageDetail
					.sort(
						(
							{ createTime: createTimeA },
							{ createTime: createTimeB }
						) => {
							if (createTimeA < createTimeB) {
								return 1;
							}
							if (createTimeA > createTimeB) {
								return -1;
							}
							return 0;
						}
					)
					.map(({ createTime, errorTypeName, message }) => (
						<div key={createTime}>
							<div className="subtitle">{errorTypeName}</div>
							<div>
								{moment(createTime).format(
									"MM/DD/YYYY  hh:mm:ss A (Z)"
								)}
							</div>
							<div>{message}</div>
						</div>
					))}
			</div>
			<button className="success" onClick={closePopBox}>
				{i18n.lbl_OK}
			</button>
		</div>
	);
};
export default PopBoxDepositMsg;

PopBoxDepositMsg.defaultProps = {
	depositMessageDetail: []
};

PopBoxDepositMsg.propTypes = {
	transId: PropTypes.string.isRequired,
	depositMessageDetail: PropTypes.arrayOf(PropTypes.any)
};
