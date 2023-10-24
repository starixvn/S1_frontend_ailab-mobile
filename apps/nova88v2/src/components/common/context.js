import { createContext } from "react";

export const defNavPanel = {
	login: "login",
	join: "join",
	subMenu: "subMenu"
};

export const i18nContext = createContext({});
export const pageContext = createContext({});
export const navContext = createContext({});
export const popBoxContext = createContext({});
export const themeContext = createContext({});
export const userInfoContext = createContext({ isLogin: false });
export const walletInfoContext = createContext({});
export const withdrawalBlockSettingContext = createContext({});
export const eWalletContext = createContext({});
export const msgCountContext = createContext({});
export const loadingContext = createContext({});
export const rootContext = createContext({});
export const popUpMsgContext = createContext({});
export const productTpGameTypeSettingListContext = createContext({});

// deposit
export const bankSlipPopBoxContext = createContext({});

// promotion
export const promoPopBox = createContext({});

// referral
export const referralPopBox = createContext({});

// worldCup
export const worldCupPopBox = createContext({});
