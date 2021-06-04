import React, { useContext } from "react";
import { Link } from "@reach/router";
import { i18nContext } from "../components/common/context";
import Footer from "../components/common/footer";
import path from "../path";
// import toHomeLogo from "../styles/img/app/applogo.png";
// import iosQRCode from "../styles/img/app/ios_en.png";
// import iosLogo from "../styles/img/app/ios.png";
// import androidQRCode from "../styles/img/app/android_en.png";
// import androidLogo from "../styles/img/app/and.png";
// import iosIcon from "../styles/img/app/iosicon.png";
// import tutorial1 from "../styles/img/app/in01.png";
// import tutorial2 from "../styles/img/app/in02.png";
// import tutorial3 from "../styles/img/app/in03.png";
// import tutorial4 from "../styles/img/app/in04.png";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);

	return (
		<>
			<main className="main apppage">
				<div className="app">
					<div className="appHeader">
						<Link to={path.home.root}>
							{/* <img src={toHomeLogo} alt="Back To Nova88" /> */}
						</Link>
					</div>
					<div className="appPage">
						<div className="appTitle">{i18n.lbl_APP_DOWNLOAD}</div>
						<div className="scan">
							<div>
								<div>
									{/* <img src={iosQRCode} alt="IOS QRCode" /> */}
									<div>
										<div>
											{/* <img src={iosLogo} alt="IOS" /> */}
											{i18n.lbl_iOS}
										</div>
										<a
											href="https://nova.mqcfirm.com/"
											target="_blank"
											rel="noreferrer">
											<button>
												{i18n.lbl_Downloads?.toUpperCase()}
											</button>
										</a>
									</div>
								</div>
								<div>
									{/* <img
										src={androidQRCode}
										alt="Android QRCode"
									/> */}
									<div>
										<div>
											{/* <img
												src={androidLogo}
												alt="Android"
											/> */}
											{i18n.lbl_Android}
										</div>
										<a
											href="https://mars.fadatsai88.com/v1/App?path=bwing_sports_android.apk"
											target="_blank"
											rel="noreferrer">
											<button>
												{i18n.lbl_Downloads?.toUpperCase()}
											</button>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="install">
							<div>
								{i18n.lbl_Installation_tutorial?.toUpperCase()}
							</div>
							<div>
								{/* <img src={iosIcon} alt="IOS Icon" /> */}
								{i18n.lbl_iOS_App_Trust_Authentication}
							</div>
							<div>{i18n.lbl_appHint1}</div>
							<div>{i18n.lbl_appHint2}</div>
							<div>
								{/* <img src={tutorial1} alt="Tutorial 1" />
								<img src={tutorial2} alt="Tutorial 2" />
								<img src={tutorial3} alt="Tutorial 3" />
								<img src={tutorial4} alt="Tutorial 4" /> */}
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default IndexPage;
