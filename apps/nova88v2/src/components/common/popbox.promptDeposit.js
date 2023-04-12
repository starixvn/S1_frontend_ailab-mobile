import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext } from "./context";

const PromptDeposit = ({ handlePopBox }) => {
	const { i18n } = useContext(i18nContext);
	const [notShowingBtn, setNotShowingBtn] = useState(false);

	const clickNotShowing = () => {
		setNotShowingBtn(prev => !prev);
	};

	return (
		<>
			<div className="popTxt">
				<div className="info">{i18n.lbl_PopBox_PromptDeposit}</div>
			</div>
			<div className="btn-group">
				<button
					className="success"
					onClick={() => {
						handlePopBox();
					}}>
					{i18n.lbl_OK}
				</button>
			</div>
			<div className="checkbox">
				<input
					type="checkbox"
					id="notShowingBtn"
					checked={notShowingBtn}
					onChange={clickNotShowing}
				/>
				<label htmlFor="notShowingBtn" />
				{i18n.lbl_Dont_show_me_again}
			</div>
		</>
	);
};

export default PromptDeposit;

PromptDeposit.defaultProps = {
	handlePopBox: () => null
};

PromptDeposit.propTypes = {
	handlePopBox: PropTypes.func
};
