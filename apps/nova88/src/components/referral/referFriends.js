import React, { createRef, useEffect } from "react";

export default () => {
	return (
		<>
			<div className="refstep">
				<div className="title">STEP1</div>
				<div>
					Copy your Nova88 referral link and share it with your
					friends
				</div>
				<div className="title">STEP2</div>
				<div>Friends register and make deposits and withdrawals</div>
				<div className="title">STEP3</div>
				<div>Reward together!</div>
			</div>
			<div className="refShare">
				<div className="title">
					Share your favorite offers with friend!
				</div>
				<div className="refBox">
					<div>
						<div>
							FREE <span>MYR 88</span>
						</div>
						<div>
							Turn <span>8x</span>
						</div>
						<div>
							Deposit <span>888</span>
						</div>
						<a>More Details</a>
					</div>
					<div>
						<div>
							FREE <span>MYR 88</span>
						</div>
						<div>
							Turn <span>8x</span>
						</div>
						<div>
							Deposit <span>888</span>
						</div>
						<a>More Details</a>
					</div>
					<div>
						<div>
							FREE <span>MYR 88</span>
						</div>
						<div>
							Turn <span>8x</span>
						</div>
						<div>
							Deposit <span>888</span>
						</div>
						<a>More Details</a>
					</div>
				</div>
			</div>
			<div className="refLink">
				<div className="title">Your unique link & invite</div>
				<div className="refBox">
					<div>Referral Code:</div>
					<div className="text-org">
						xxxReferralCodexxxxxx
						<button className="icon icon-files-empty"></button>
					</div>
					<div>Referral Link:</div>
					<div className="text-org">
						https://www.nova88.net/?refid=xxxx
						<button className="icon icon-files-empty"></button>
					</div>
					<div className="refMedia">
						<a className="icon icon-files-empty">
							Copy to Clipboard
						</a>
						<a className="icon icon-download2">QRCode</a>
						<a className="icon icon-facebook2">Facebook</a>
						<a className="icon icon-telegram">Telegram</a>
						<a className="icon icon-whatsapp">Whatsapp</a>
						<a className="icon icon-skype">Skype</a>
					</div>
				</div>
			</div>

			<div className="btn-group">
				<button className="orange switch open">
					My Referral Bonus
					<i className="icon icon-circle-right"></i>
				</button>
			</div>
			<div className="recent open">
				<div className="info infoBlack">
					<ul>
						<li>
							<span className="title">Your Friend</span>
							<span>qa******01</span>
						</li>
						<li>
							<span className="title">Register Date</span>
							<span>3/13/2020 (+08:00)</span>
						</li>
						<li>
							<span className="title">currency</span>
							<span>MYR</span>
						</li>
						<li>
							<span className="title">Total Deposit</span>
							<span>50/50</span>
						</li>
						<li>
							<span className="title">Total Bet</span>
							<span>888.00/888.00</span>
						</li>
						<li>
							<span className="title">Bonus Amount</span>
							<span>88.00</span>
						</li>
						<li>
							<span className="title">Status</span>
							<span>Success</span>
						</li>
					</ul>
				</div>
				<div className="btn-group">
					<a href="referralhistory.html" className="orange recentBtn">
						All Referral Bonus
					</a>
				</div>
			</div>
		</>
	);
};
