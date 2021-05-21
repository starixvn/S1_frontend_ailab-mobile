import React from "react";
import PropTypes from "prop-types";

const ImportantNote = ({ langId, i18n }) => {
	let content = null;
	if (langId === "en") content = <EN />;
	if (langId === "vn") content = <VN />;

	if (langId) {
		return (
			<div className="selectModule important">
				<h1 className="icon icon-information-solid">
					{i18n.lbl_ImportantNotice?.toUpperCase()}
				</h1>
				{content}
			</div>
		);
	}

	return null;
};

const EN = () => (
	<ol>
		<li>
			Kindly please check for the latest active deposit bank details
			before you making a deposit.
		</li>
		<li>
			For using <span>&quot;Local Bank Transfer&quot;</span> deposit
			option, please make the transfer done before submit the transaction
			to avoid the transaction delay.
		</li>
		<li>
			Depositor&apos;s <span>ACCOUNT NAME</span> must match with your
			registered full name. We do not encourage transaction made using 3rd
			party/company account.
		</li>
		<li>
			Please <span>DO NOT</span> fill in <span>&quot;BWING&quot;</span> or
			any sensitive words related to gambling as reference/remark in your
			online transaction.
		</li>
		<li>
			Please take noted that will be 1x rollover required for all deposit
			made before any withdrawal can be processed.
		</li>
		<li>
			Kindly please contact our{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/12145020/">
				24/7 LIVECHAT
			</a>{" "}
			if your transaction is still pending for more than 5 minutes.
		</li>
	</ol>
);

const VN = () => (
	<ul>
		<li>
			Kindly please check for the latest active deposit bank details
			before you making a deposit.
		</li>
		<li>
			For using <span>&quot;Local Bank Transfer&quot;</span> deposit
			option, please make the transfer done before submit the transaction
			to avoid the transaction delay.
		</li>
		<li>
			Depositor&apos;s <span>ACCOUNT NAME</span> must match with your
			registered full name. We do not encourage transaction made using 3rd
			party/company account.
		</li>
		<li>
			Please <span>DO NOT</span> fill in <span>&quot;BWING&quot;</span> or
			any sensitive words related to gambling as reference/remark in your
			online transaction.
		</li>
		<li>
			Please take noted that will be 1x rollover required for all deposit
			made before any withdrawal can be processed.
		</li>
		<li>
			Kindly please contact our{" "}
			<a
				rel="noreferrer"
				target="_blank"
				href="https://direct.lc.chat/12145020/">
				24/7 LIVECHAT
			</a>{" "}
			if your transaction is still pending for more than 5 minutes.
		</li>
	</ul>
);

ImportantNote.defaultProps = {
	langId: null
};

ImportantNote.propTypes = {
	langId: PropTypes.string,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

export default ImportantNote;
