import React, { useContext } from "react";
import { i18nContext } from "../components/common/context";
import Footer from "../components/common/footer";
import logo from "../styles/img/logo.png";
import Android from "../styles/img/download/Android.png";
import androidQRCode from "../styles/img/download/AQR.jpg";

import ios from "../styles/img/download/ios.png";
import iOSQRCode from "../styles/img/download/IQR.jpg";
import tutorial1 from "../styles/img/download/dlimg1.png";
import tutorial2 from "../styles/img/download/dlimg2.png";
import tutorial3 from "../styles/img/download/dlimg3.png";
import tutorial4 from "../styles/img/download/dlimg4.png";

const IndexPage = () => {
	const { i18n } = useContext(i18nContext);

	return (
		<>
			<main className="downloadArea">
				<div className="downloadT">
					<img src={logo} alt="Bwing" className="logo" />
					<h1>{i18n.lbl_APP_DOWNLOAD}</h1>

					<div className="downloadFrame">
						<p>{i18n.lbl_Scan_to_Download}</p>
						<div>
							<div>
								<img src={Android} alt="Android" />
								<a
									href="https://mars.fadatsai88.com/v1/App?path=bwing_sports_android.apk"
									download>
									<button>Android</button>
								</a>
							</div>
							<img src={androidQRCode} alt="Android QRCode" />
						</div>
						{/* <div>
							<div>
								<img src={ios} alt="iOS" />
								<a
									href="https://nova.mqcfirm.com/"
									target="_blank"
									rel="noreferrer">
									<button>iOS</button>
								</a>
							</div>
							<img src={iOSQRCode} alt="iOS QRCode" />
						</div> */}
					</div>
				</div>
				{/* <div className="downloadB">
					<h1>{i18n.lbl_Installation_tutorial}</h1>
					<h2>{i18n.lbl_iOS_App_Trust_Authentication}</h2>
					<p>{i18n.lbl_Once_Bwing_App_is_installed}</p>
					<div>
						<img src={tutorial1} alt="tutorial 1" />
						<img src={tutorial2} alt="tutorial 2" />
						<img src={tutorial3} alt="tutorial 3" />
						<img src={tutorial4} alt="tutorial 4" />
					</div>
				</div> */}
			</main>
			<Footer />
		</>
	);
};

export default IndexPage;
