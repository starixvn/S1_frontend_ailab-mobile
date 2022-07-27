import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
	defElems,
	defRuleCols,
	JoinBtn,
	defPromotionType
} from "@ailab-mobile/promotion";
import {
	worldCupPopBox,
	i18nContext,
	userInfoContext
} from "../common/context";

export default () => {
	const { i18n } = useContext(i18nContext);
	const { worldCupBox, setWorldCupBox } = useContext(worldCupPopBox);

	const { isOpen: openPromoPopBox } = worldCupBox;

	const closePopBox = () => {
		setWorldCupBox({ isOpen: false });
	};

	return (
		<div
			id="popup"
			className={`promospop${openPromoPopBox ? " active" : ""}`}>
			<div className="pop">
				<div className="popTit">
					{i18n.lbl_Details}
					<div className="icon icon-close" onClick={closePopBox} />
				</div>
				{worldCupBox.content}
			</div>
		</div>
	);
};

const PromoRule = ({ promotionInfo, i18n, isLogin }) => {
	const ruleCols = [
		defRuleCols.minAmount,
		defRuleCols.bonus,
		defRuleCols.maxBonus,
		defRuleCols.rollOver,
		defRuleCols.remainingTime
	];

	const formatSetting = {
		isConvertRequired: false,
		digits: 0,
		formatRequired: false
	};

	const allElems = defElems({
		promotionInfo,
		i18n,
		isLogin,
		formatSetting,
		showIcon: false
	});

	const rows = ruleCols?.map(col => allElems[col]);
	return <ul>{rows}</ul>;
};

PromoRule.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	isLogin: PropTypes.bool.isRequired
};

export const PromoPopBox = ({ data }) => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="promotions">
			<div className="promodule">
				<img src={data?.banner} alt="banner" />
				<div className="btn-group">
					{data?.promotionType === defPromotionType.static ? (
						<a
							className="yellow"
							rel="noreferrer"
							target="_blank"
							href="https://direct.lc.chat/12171870/">
							{i18n.lbl_Apply_Now}
						</a>
					) : (
						<JoinBtn promotionInfo={data} filterType="all" />
					)}
				</div>
				<div className="protitle">{data?.title}</div>
				<div className="text">{data?.description}</div>
				<div className="info promotionInfo">
					<PromoRule
						promotionInfo={data}
						i18n={i18n}
						isLogin={userInfo.isLogin}
					/>
				</div>
				<div
					className="text"
					dangerouslySetInnerHTML={{
						__html: `<pre>${data?.details}</pre>`
					}}
				/>
			</div>
		</div>
	);
};

PromoPopBox.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired
};
