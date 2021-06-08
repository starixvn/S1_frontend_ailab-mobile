import React, { useState, useContext } from "react";
import { i18nContext } from "./context";
import backupImg from "../../styles/img/Epopup-banner.jpg";

const DomainListPop = ({ domainList }) => {
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
			<img src={backupImg} alt="STAY ACCESSIBLE Anytime, Anywhere" />
			<div className="txt">{i18n.lbl_Stay_accessible}</div>
			<div className="txt">{i18n.lbl_Anytime_anywhere}</div>

			{arr}
			<div className="text-center">
				<input
					type="checkbox"
					id="DomainListcheckbox"
					checked={notShowingBtn}
					onChange={clickNotShowing}
				/>
				<label htmlFor="DomainListcheckbox">
					<div />
				</label>
				{i18n.lbl_Dont_show_me_again}
			</div>
		</div>
	);
};

export default DomainListPop;
