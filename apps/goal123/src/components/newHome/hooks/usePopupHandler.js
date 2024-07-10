import React, { useEffect, useContext } from "react";
import { useNavigate } from "@reach/router";
import { bannerImgUrl } from "apps/goal123/src/config";
import { isInApp } from "@ailab-mobile/common";
import { useLazyGetPopUpPromotionQuery } from "@ailab-mobile/service";
import { api_GetWalletInfo } from "apps/goal123/src/service/api/account";
import { api_promotion_GetPromotionDetail } from "apps/goal123/src/service/api/promotion";
import {
	setCookie,
	readCookie,
	deleteCookie,
	isEventPeriod
} from "../../common/common";
import {
	userInfoContext,
	popBoxContext,
	i18nContext
} from "../../common/context";
import path from "../../../path";
import { defPopBoxType } from "../../common/popbox";
import NewYear, {
	defEventPeriod as NewYearEventPeriod
} from "../../common/popbox.newYear";

const apiResPromotionType = {
	retentionFreebet: 9
};

const usePopupHandler = () => {
	const navigate = useNavigate();

	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { i18n } = useContext(i18nContext);

	useEffect(() => {
		const popBoxMsg = readCookie("popBoxMsg");
		if (popBoxMsg) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: popBoxMsg,
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => {
								deleteCookie("popBoxMsg");
								setPopBox({ isOpen: false });
							}}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	}, []);

	useEffect(() => {
		const displayDepositPopup = () => {
			const cookieName = `balanceHint${userInfo.userName}`;
			if (
				userInfo.currencyId &&
				userInfo.userName &&
				readCookie(cookieName) !== "1"
			) {
				setCookie(cookieName, "1", 1);
				api_GetWalletInfo().then(
					res => {
						if (res.data.errorCode === 0) {
							const { data } = res.data;
							const mainWallet = {
								id: 0,
								displayKey: "lbl_MainWallet",
								balance: data?.balance
							};
							const tpWalletsArr = data?.tpWallets.map(i => ({
								id: i.tpId,
								displayKey: i.displayKey,
								balance: i.balance
							}));

							const hasBalance =
								mainWallet.balance ||
								tpWalletsArr?.filter(t => t.balance > 0)
									.length >= 1;

							if (!hasBalance) {
								const RedirectToDeposit = () => {
									setRedirectPath(`/${path.deposit.root}`);
									setPopBox({
										isOpen: false
									});
								};

								setPopBox({
									isOpen: true,
									title: i18n.lbl_Notice,
									content: (
										<>
											<p>
												{`${i18n.msg_BalanceHint} : `}
												<span className="important">
													{`${
														i18n[
															`Currency_${userInfo.currencyId}`
														]
													} 0`}
												</span>
											</p>
											<p>{i18n.msg_DepositHint}</p>
										</>
									),
									hasBtn: true,
									btnBar: (
										<div className="btn-group">
											<button
												className="blue"
												onClick={openNextPopUp}>
												{i18n.lbl_Later}
											</button>
											<button
												onClick={RedirectToDeposit}
												className="orange">
												{i18n.lbl_DepositNow}
											</button>
										</div>
									),
									handlePopBox: openNextPopUp
								});
							}
						} else {
							setPopBox({
								isOpen: true,
								content: `[${res.data.errorCode}] ${res.data.message}`,
								handlePopBox: openNextPopUp
							});
						}
					},
					() => {
						setPopBox({
							isOpen: true,
							content: i18n.msg_ApiServerError,
							handlePopBox: openNextPopUp
						});
					}
				);
			} else {
				openNextPopUp();
			}
		};

		const displayAnnouncePopup = () => {
			const cookieOfficialAnnounce = "OfficialAnnounce_cookie";
			if (
				!isInApp() &&
				userInfo.isLogin === false &&
				!isEventPeriod(NewYearEventPeriod) &&
				!readCookie(cookieOfficialAnnounce)
			) {
				const toDownloadPage = () => {
					navigate(`/${path.appDownload.root}`);
					setPopBox({ isOpen: false });
				};
				setCookie(cookieOfficialAnnounce, true, 1);
				setPopBox({
					isOpen: true,
					content: (
						<img
							src={`${bannerImgUrl}/h5/img/nonlogin/300x300_goal_${userInfo.langId}.jpg`}
							alt="OfficialAnnounce"
							onClick={toDownloadPage}
						/>
					),
					hasBtn: true,
					btnBar: (
						<div className="btn-group">
							<button className="orange" onClick={openNextPopUp}>
								{i18n.lbl_Close}
							</button>
						</div>
					),
					handlePopBox: openNextPopUp
				});
			} else {
				openNextPopUp();
			}
		};

		const displayNewYearPopup = () => {
			if (
				isEventPeriod(NewYearEventPeriod) &&
				!readCookie(`NewYear-${window.location.hostname}`)
			) {
				setPopBox({
					isOpen: true,
					className: "angpao_pop active",
					custContent: (
						<NewYear
							onClickClose={openNextPopUp}
							langId={userInfo.langId}
						/>
					)
				});
			} else {
				openNextPopUp();
			}
		};

		const displayPromotionPopup = () => {
			const cookieName = `popUpPromotion${userInfo.userName}`;

			// * 如果未登入 or 當日觸發過 則直接進入下一個彈窗
			if (
				!userInfo.isLogin ||
				!userInfo.accountName ||
				readCookie(cookieName) === "1"
			) {
				openNextPopUp();
				return;
			}

			// * 如果 bonusCode 不為 null ，打開並記錄 cookie，效期為一日
			getPopUpPromotion({ langId: userInfo.langId }).then(
				({ data: { data: { bonusCode } = {} } = {} }) => {
					if (bonusCode) {
						// getting promotion detail to determine the type of promotion
						api_promotion_GetPromotionDetail({
							langId: userInfo.langId,
							BonusCode: bonusCode
						}).then(
							// giving default value to response data and promotionType
							({
								data: {
									data: { promotionType = null } = {}
								} = {}
							}) => {
								setPopBox({
									isOpen: true,
									className: "promosback active",
									custContent: (
										<div className="pop promosbackpop">
											<img
												src={`${
													process.env
														.REACT_APP_BANNER_URL
												}/desktop/img/promosBackPopup/promosPopup-${
													userInfo?.langId || "en"
												}.png`}
												alt="img-promosPopup"
											/>
											<button
												className="popgo"
												// if promotion type = retention freebet(9), then link to retention landing page
												onClick={() => {
													if (
														promotionType ===
														apiResPromotionType.retentionFreebet
													) {
														navigate(
															`/${path.retention.root}`
														);
													} else {
														navigate(
															`/${path.promotion.root}?bonusCode=${bonusCode}`
														);
													}

													setPopBox({
														isOpen: false
													});
												}}>
												{i18n.lbl_ClaimNow}
											</button>
											<img
												src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/promosBackPopup/delet.png`}
												alt="img-delet"
												className="closepop"
												onClick={() => {
													setPopBox({
														isOpen: false
													});
													openNextPopUp();
												}}
											/>
										</div>
									)
								});
								setCookie(cookieName, "1", 1);
							}
						);
					} else {
						openNextPopUp();
					}
				}
			);
		};

		const popUpStack = [
			displayDepositPopup,
			displayAnnouncePopup,
			displayPromotionPopup,
			displayNewYearPopup
		];

		const openNextPopUp = () => {
			if (popUpStack.length) {
				popUpStack.pop()();
			} else {
				setPopBox({ isOpen: false });
			}
		};

		if (userInfo.isLogin !== null) {
			openNextPopUp();
		}
	}, [
		i18n,
		userInfo.isLogin,
		setPopBox,
		userInfo.langId,
		userInfo.accountName,
		userInfo.currencyId
	]);
};

export default usePopupHandler;
