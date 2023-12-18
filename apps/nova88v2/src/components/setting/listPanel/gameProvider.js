import React, { useContext } from "react";
import { i18nContext, userInfoContext, popBoxContext } from "Context";
import { Link } from "@Router";
import path from "../../../path";
import { cloudBannerImgURL } from "../../../config";
import Header from "../../header/header";
import { defPlatFrom } from "./defGameProvider";
import { useMenu } from "../../hook/useMenu";

const GameProvider = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { menuList, onClickProductItem } = useMenu();

	const handleClickProduct = product => {
		if (product?.isInMaintain) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				content: i18n.lbl_underMaintenance
			});
		} else {
			onClickProductItem(product);
		}
	};

	const gameProviderList = menuList.flatMap(mainMenuItem => {
		const { data } = mainMenuItem || {};

		const productLists = data?.flatMap(subMenuItem => {
			const defProduct = defPlatFrom.find(
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

	return gameProviderList.map(prodictItem => {
		const { imgName, tpGameIdNo } = prodictItem || {};
		return (
			imgName && (
				<button
					key={tpGameIdNo}
					onClick={() => handleClickProduct(prodictItem)}>
					<img
						src={`${cloudBannerImgURL}/h5/img/venderlogo/${imgName}.png`}
						alt={imgName}
					/>
				</button>
			)
		);
	});
};

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);

	const link = (
		<Link to={path.setting.root}>
			<i className="icon icon-keyboard_arrow_left" />
		</Link>
	);

	return (
		<>
			<Header title={i18n.ibi_GameProvider} hideLogo={true} link={link} />
			<main className="main provider">
				<GameProvider userInfo={userInfo} />
			</main>
		</>
	);
};

export default IndexPage;
