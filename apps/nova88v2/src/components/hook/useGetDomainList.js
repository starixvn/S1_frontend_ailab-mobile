import { useEffect, useState } from "react";
import moment from "moment";
import { defCurrenyId, readCookie, setCookie } from "../common/common";
import { defPopBoxType } from "../common/popbox";
import api from "../../service/api";

export const useGetDomainList = ({ userInfo, setPopBox, i18n }) => {
	const [isDomainPopOpen, setIsDomainPopOpen] = useState(true);
	useEffect(() => {
		const cookieName = `${userInfo.userName}-DomainListHint`;

		const now = moment();
		const nowInGMT8 = now.utcOffset(480);
		const hour = nowInGMT8.hour();
		if (userInfo.currencyId === defCurrenyId.THB && hour >= 0 && hour < 3) {
			setPopBox({
				isOpen: true,
				title: i18n.lbl_ImportantNote,
				popBoxType: defPopBoxType.PromptDeposit,
				className: "noticepop",
				handlePopBox: () => {
					setPopBox({ isOpen: false });
					if (
						userInfo.isLogin &&
						userInfo.currencyId &&
						readCookie(cookieName) !== "1"
					) {
						api.site
							.GetSupportDomainList({ langId: userInfo.langId })
							.then(
								res => {
									const {
										errorCode,
										data,
										message
									} = res.data;
									if (errorCode === 0) {
										if (data.length > 0) {
											const closePop = () => {
												setPopBox({ isOpen: false });
												setCookie(
													`${userInfo.userName}-DomainListHint`,
													"1",
													7
												);
												setIsDomainPopOpen(false);
											};
											setPopBox({
												isOpen: true,
												title:
													i18n.lbl_nova88_backup_website,
												popBoxType:
													defPopBoxType.DomainList,
												className: "backupDomain ",
												domainList: data,
												handlePopBox: closePop
											});
										} else {
											setIsDomainPopOpen(false);
										}
									} else {
										setPopBox({
											isOpen: true,
											content: `[${errorCode}] ${message}`
										});
									}
								},
								() => {
									setPopBox({
										isOpen: true,
										content: i18n.msg_ApiServerError
									});
								}
							);
					} else if (readCookie(cookieName) === "1") {
						setIsDomainPopOpen(false);
					}
				}
			});
		} else if (
			userInfo.isLogin &&
			userInfo.currencyId &&
			readCookie(cookieName) !== "1"
		) {
			api.site.GetSupportDomainList({ langId: userInfo.langId }).then(
				res => {
					const { errorCode, data, message } = res.data;
					if (errorCode === 0) {
						if (data.length > 0) {
							const closePop = () => {
								setPopBox({ isOpen: false });
								setCookie(
									`${userInfo.userName}-DomainListHint`,
									"1",
									7
								);
								setIsDomainPopOpen(false);
							};
							setPopBox({
								isOpen: true,
								title: i18n.lbl_nova88_backup_website,
								popBoxType: defPopBoxType.DomainList,
								className: "backupDomain ",
								domainList: data,
								handlePopBox: closePop
							});
						} else {
							setIsDomainPopOpen(false);
						}
					} else {
						setPopBox({
							isOpen: true,
							content: `[${errorCode}] ${message}`
						});
					}
				},
				() => {
					setPopBox({
						isOpen: true,
						content: i18n.msg_ApiServerError
					});
				}
			);
		} else if (readCookie(cookieName) === "1") {
			setIsDomainPopOpen(false);
		}
	}, [
		userInfo.isLogin,
		userInfo.currencyId,
		i18n,
		setPopBox,
		userInfo.userName
	]);
	return { isDomainPopOpen };
};
