import { useEffect, useState } from "react";
import { readCookie, setCookie } from "../common/common";
import { defPopBoxType } from "../common/popbox";
import { GetSupportDomainList } from "../../service/api/site";
import path from "../../path";

export const useGetDomainList = ({ userInfo, setPopBox, i18n }) => {
	const [isDomainPopOpened, setIsDomainPopOpened] = useState(false);
	useEffect(() => {
		const cookieName = `${userInfo.userName}-DomainListHint`;
		if (
			userInfo.isLogin &&
			userInfo.currencyId &&
			readCookie(cookieName) !== "1" &&
			window.location.pathname === `/${path.deposit.root}`
		) {
			GetSupportDomainList().then(res => {
				const { errorCode, data } = res.data;
				if (errorCode === 0) {
					if (data.length > 0) {
						const closePop = () => {
							setPopBox({ isOpen: false });
							setCookie(
								`${userInfo.userName}-DomainListHint`,
								"1",
								1
							);
						};
						setPopBox({
							isOpen: true,
							title: i18n.lbl_Backup_website,
							popBoxType: defPopBoxType.DomainList,
							className: "backupDomain ",
							domainList: data,
							handlePopBox: closePop
						});
						setIsDomainPopOpened(true);
					}
				}
			});
		} else if (
			window.location.pathname !== `/${path.deposit.root}` &&
			readCookie(cookieName) !== "1"
		) {
			// 註冊成功 > 回到Home > setIsDomainPopOpened(false) > 到/deposit > setIsDomainPopOpened(true)
			// cookie已經有紀錄 1 > setIsDomainPopOpened(true))
			setIsDomainPopOpened(false);
		} else if (readCookie(cookieName) === "1") {
			setIsDomainPopOpened(true);
		}
	}, [
		userInfo.isLogin,
		userInfo.currencyId,
		i18n,
		setPopBox,
		userInfo.userName
	]);

	return { isDomainPopOpened };
};
