import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import { useGetReferralCodeQuery } from "@ailab-mobile/service";
import path from "../../path";
import { defPopBoxType } from "../common/popbox";
import { userInfoContext } from "../common/context";

const ReferralPanel = ({ setPopBox }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { userInfo } = useContext(userInfoContext);
	const { data: { data: referralCode } = {} } = useGetReferralCodeQuery();

	const shareReferral = () => {
		setPopBox({
			isOpen: true,
			className: "referralShare ",
			popBoxType: defPopBoxType.Referral,
			title: t("lbl_ReferFriends"),
			referralCode
		});
	};

	return (
		<>
			<div className="moduleTitle">{t("lbl_friendReferral")}</div>

			<div className={`friendReferral indexRefer ${userInfo?.langId}`}>
				{/* <!-- 連結至referral.html --> */}
				<button
					className="friendReferral-btn"
					onClick={() => navigate(path.referral.root)}>
					{/* <!-- 多語系換字 --> */}
					{t("lbl_More_Info")}
				</button>
				<div className="inputcopy">
					<input type="text" value={referralCode} />
					{/* <!-- img-icon點擊後觸發原生系統分享彈窗 --> */}
					<div onClick={shareReferral}>
						<img
							src="https://banner.0814media.net/h5/img/icon-share-1.svg"
							alt=""
						/>
					</div>
				</div>
			</div>
		</>
	);
};

ReferralPanel.propTypes = {
	setPopBox: PropTypes.func.isRequired
};

export default ReferralPanel;
