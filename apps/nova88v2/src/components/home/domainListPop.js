import React, { useState, useEffect, useRef, useContext } from "react";
import { userInfoContext, popBoxContext, i18nContext } from "../common/context";
import { setCookie } from "../common/common";
import config from "../../config";
import api from "../../service/api";

const DomainListPop = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);
	const [domainList, setDomainList] = useState([]);
	const [notShowingBtn, setNotShowingBtn] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isMountedRef.current) {
			api.site.GetSupportDomainList().then(
				res => {
					const { errorCode, data, message } = res.data;
					if (errorCode === 0) {
						setDomainList(data);
					} else {
						setPopBox({
							isOpen: true,
							title: i18n.lbl_ImportantNote,
							content: message
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.msg_ApiServerError
					});
				}
			);
		}
	}, [i18n, setPopBox]);

	useEffect(() => {
		return () => {
			if (notShowingBtn === true && userInfo.userName) {
				setCookie(`${userInfo.userName}-DomainListHint`, "1", 7);
			}
		};
	});

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
				src={`${config.cloudImgURL}/SiteSkin/img/backupimg_${userInfo.langId}.jpg`}
				alt="Backup Domain"
			/>
			<p>{i18n.lbl_kindly_visit_alternate_link_for_better_performance}</p>
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
