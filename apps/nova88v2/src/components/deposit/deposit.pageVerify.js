import React, { useEffect } from "react";
import path from "../../path";

export default (
	userInfo,
	i18n,
	setPopBox,
	navigate,
	setPageVerify,
	propsFromParent,
	isDomainPopOpen
) => {
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (!propsFromParent) {
				if (
					userInfo.isLogin &&
					userInfo.currencyId &&
					(!userInfo.accountName || !userInfo.phoneNo) &&
					isDomainPopOpen === false
				) {
					const ClosePopBox = () => {
						setPopBox({ isOpen: false });
						navigate(`/${userInfo.langId}/${path.profile.root}`);
					};

					setPopBox({
						isOpen: true,
						title: i18n.lbl_ImportantNote,
						content: i18n.lbl_UpdatePersonalInfo,
						hasBtn: true,
						hideCloseBtn: true,
						btnBar: (
							<div className="btn-group">
								<button className="blue" onClick={ClosePopBox}>
									{i18n.lbl_UpdatePersonalDetail}
								</button>
							</div>
						)
					});
					if (mounted) {
						setPageVerify(false);
					}
				} else if (mounted) {
					setPageVerify(true);
				}
			}
		}

		return () => {
			mounted = false;
		};
	}, [
		userInfo.accountName,
		userInfo.birth_d,
		userInfo.phoneNo,
		userInfo.currencyId,
		userInfo.isLogin,
		userInfo.langId,
		i18n,
		setPopBox,
		setPageVerify,
		navigate,
		propsFromParent,
		isDomainPopOpen
	]);
};
