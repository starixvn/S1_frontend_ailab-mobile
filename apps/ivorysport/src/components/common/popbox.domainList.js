import React, { useState, useContext } from "react";
import { userInfoContext, i18nContext } from "./context";
import { cloudBannerImgURL } from "../../config";
import { validImgLang } from "./common";

const DomainListPop = ({ domainList }) => {
	const { userInfo } = useContext(userInfoContext);
	const { i18n } = useContext(i18nContext);
	const [notShowingBtn, setNotShowingBtn] = useState(false);

	const clickNotShowing = () => {
		setNotShowingBtn(prev => !prev);
	};

	const onCopy = ({ val }) => {
		const virtualInput = document.createElement("input");
		virtualInput.value = val;
		document.body.appendChild(virtualInput);
		virtualInput.select();
		document.execCommand("copy");
		document.body.removeChild(virtualInput);
	};

	const arr = domainList?.map(data => {
		return (
			<div className="url" key={`domainName-${data.domainName}`}>
				{data.domainName}
				<button
					className="copyurl"
					onClick={onCopy.bind(this, { val: data.domainName })}>
					{i18n.lbl_Copy}
				</button>
			</div>
		);
	});

	return (
		<div className="popTxt">
			<img
				src={`${cloudBannerImgURL}/h5/img/backupDomain/backupDomain_${validImgLang(
					userInfo.langId
				)}.jpg`}
				alt="STAY ACCESSIBLE Anytime, Anywhere"
			/>
			<div>{i18n.lbl_DearValuedCustomers}</div>
			<div>
				{i18n.lbl_kindly_visit_alternate_link_for_better_performance}
			</div>
			{arr}
			<div className="text-center">
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
		</div>
	);
};

export default DomainListPop;
