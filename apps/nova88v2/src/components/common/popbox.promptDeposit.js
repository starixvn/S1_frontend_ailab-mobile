import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { i18nContext, userInfoContext } from "./context";
import { setCookie, deleteCookie } from "./common";

const PromptDeposit = ({ handlePopBox }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const [notShowingBtn, setNotShowingBtn] = useState(false);

	const clickNotShowing = () => {
		setNotShowingBtn(prev => {
			const check = !prev;
			if (check) {
				setCookie(`${userInfo.userName}-PromptDeposit`, "1", 7);
			} else {
				deleteCookie(`${userInfo.userName}-PromptDeposit`);
			}
			return check;
		});
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
				<label htmlFor="notShowingBtn">
					<div />
				</label>
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
