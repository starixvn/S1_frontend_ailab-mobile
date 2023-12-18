import React from "react";
import PropTypes from "prop-types";
import TandC from "../../service/t_and_c";
import { siteInfo, bannerImgUrl } from "../../config";
import defPlatform from "../setting/defPlatform";
import { useMenu } from "../hook/useMenu";

const Bottom = ({ i18n, langId }) => {
	const { menuData } = useMenu();

	const platFormProducts = menuData.flatMap(mainMenuItem => {
		const { data } = mainMenuItem || {};

		const productLists = data?.flatMap(subMenuItem => {
			const defProduct = defPlatform.find(
				product => product.tpGameIdNo === subMenuItem.tpGameIdNo
			);
			if (defProduct) {
				return {
					...subMenuItem,
					...defProduct
				};
			}

			return [];
		});

		return productLists;
	});

	const platformRows = platFormProducts?.map(subMenuItem => {
		const { imgName } = subMenuItem || {};
		return (
			imgName && (
				<img
					key={imgName}
					alt="logo"
					src={`${bannerImgUrl}/h5/img/footer/${imgName}.png`}
				/>
			)
		);
	});

	return (
		<>
			<div className="infoCenter">
				<div className="title">{i18n.lbl_InfoCenter}</div>
				<div>
					<a
						target="_blank"
						rel="noreferrer"
						href={TandC(langId).HowToDeposit}>
						<img
							src={`${bannerImgUrl}/h5/img/infoicon1.png`}
							alt="How To Deposit"
						/>
						<p>{i18n.lbl_HowToDepoist}</p>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href={TandC(langId).HowToWithdraw}>
						<img
							src={`${bannerImgUrl}/h5/img/infoicon2.png`}
							alt="How To Withdrawal"
						/>
						<p>{i18n.lbl_HowToWithdraw}</p>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href={TandC(langId).FAQ}>
						<img
							src={`${bannerImgUrl}/h5/img/infoicon3.png`}
							alt="FAQ"
						/>
						<p>{i18n.lbl_FAQ.toUpperCase()}</p>
					</a>
				</div>
				<a
					className="AFFILIATEBtn"
					target="_blank"
					rel="noreferrer"
					href={`${siteInfo(langId).affiliateLink}`}>
					{i18n.lbl_Affiliate_Program.toUpperCase()}
				</a>
			</div>
			<div className="partner">
				<div>{platformRows}</div>
				<div className="bong88">
					{i18n.lbl_PoweredBy}
					<img
						src={`${bannerImgUrl}/h5/img/bong88.png`}
						alt="Bong88"
					/>
				</div>
			</div>
		</>
	);
};

Bottom.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	langId: PropTypes.string.isRequired
};

export default Bottom;
