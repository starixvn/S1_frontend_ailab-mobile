import React, { useContext, Component, useEffect, useRef } from "react";
import {
	bankSlipPopBoxContext,
	i18nContext,
	popBoxContext
} from "../common/context";
import moment from "moment";
import ClipboardJS from "../../lib/clipboard.min";
import {
	api_UploadReceipt,
	api_SetDepositReceipt
} from "../../service/api/payment";
import config from "../../config";
import { number_format } from "../common/common";

const GetUploadFileName = files => {
	let fullPath = files[0].name;
	var startIndex =
		fullPath.indexOf("\\") >= 0
			? fullPath.lastIndexOf("\\")
			: fullPath.lastIndexOf("/");
	var filename = fullPath.substring(startIndex);
	if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
		filename = filename.substring(1);
	}
	return filename;
};

class Content extends Component {
	state = { processing: false, disableUpload: false };
	isMountedRef = false;
	filebox = React.createRef();
	componentDidMount() {
		/* eslint-disable */
		this.isMountedRef = true;
		this._clipboard = new ClipboardJS(".copyBtn");
		this._clipboard.on("success", e => {});
		this._clipboard.on("error", e => {});
		/* eslint-enable */
	}
	componentWillUnmount() {
		this.isMountedRef = false;
		this._clipboard.destroy();
	}
	onCheckUpload = () => {
		let files = this.filebox.current.files;
		if (files[0]) {
			this.props.EditField("picFileName", GetUploadFileName(files));
			this.onUploadFile();
		}
	};
	onUploadFile = () => {
		let files = this.filebox.current.files;
		if (files.length > 0) {
			this.setState({ disableUpload: true });
			let formData = new FormData();
			formData.append("TransId", this.props.bankSlipPopBox.transId);
			formData.append("Receipt", files[0]);
			api_UploadReceipt(formData).then(
				response => {
					if (this.isMountedRef) {
						let result = response.data;
						if (result.errorCode === 0) {
							alert(this.props.i18n.lbl_UploadSuccess);
						} else {
							alert(result.message);
						}
					}
				},
				err => {
					if (this.isMountedRef) {
						this.props.setPopBox({
							isOpen: true,
							title: this.props.i18n.lbl_ImportantNote,
							content: "API Server Error."
						});
					}
				}
			);
		}
	};
	EditField = (column, e) => {
		this.props.EditField(column, e.target.value);
	};
	SeReceipt = () => {
		if (!this.state.processing) {
			this.setState({ processing: true });
			let bankSlipPopBox = this.props.bankSlipPopBox;
			api_SetDepositReceipt(
				bankSlipPopBox.transId,
				moment(bankSlipPopBox.depositTime).unix(),
				bankSlipPopBox.refId
			).then(
				res => {
					if (this.isMountedRef) {
						if (res.data.errorCode === 0) {
							this.props.handlePopBox();
						} else {
							alert(res.message);
						}

						this.setState({ processing: false });
					}
				},
				err => {
					if (this.isMountedRef) {
						this.props.setPopBox({
							isOpen: true,
							title: this.props.i18n.lbl_ImportantNote,
							content: "API Server Error."
						});

						this.setState({ processing: false });
					}
				}
			);
		}
	};
	HandleUploadAgain = () => {
		this.setState({ disableUpload: false });
	};
	render() {
		let bankSlipPopBox = this.props.bankSlipPopBox;
		let i18n = this.props.i18n;
		return (
			<div
				id="popup"
				style={bankSlipPopBox.isOpen ? { display: "block" } : {}}>
				<div className="popTit">
					<div
						className="close open"
						onClick={this.props.handlePopBox}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<h1 className="text-org">{i18n.lbl_SubmitProof}</h1>
				</div>
				<section className="depositBox">
					<div className="depositInBox">
						<div className="depositTitle textLeft borderBottom">
							<h1 className="text-org">{i18n.lbl_Transaction}</h1>
							<p>{i18n.lbl_AlmostDone}</p>
							<p>{i18n.msg_DepositTransferHint}</p>
						</div>
						<div className="depostiImgText">
							<div
								className="bankinfo icon icon-new-tab"
								onClick={() =>
									window.open(
										bankSlipPopBox.bankSite,
										"_blank"
									)
								}>
								<img
									src={`${config.imgUrl}/common/images/BankLogo/${bankSlipPopBox.bankLogo}`}
									alt={bankSlipPopBox.bankName}
								/>
								<span>{bankSlipPopBox.bankName}</span>
							</div>
							<div>
								<h1>{i18n.lbl_ID}</h1>
								<p>{bankSlipPopBox.transId}</p>
								<h1>{i18n.lbl_BankAccountName}</h1>
								<p>
									{bankSlipPopBox.accountName}
									<span
										className="icon icon-files-empty clickBtn copyBtn"
										data-clipboard-text={
											bankSlipPopBox.accountName
										}></span>
								</p>
								<h1>{i18n.lbl_BankNumber}</h1>
								<p>
									{bankSlipPopBox.accountNo}
									<span
										className="icon icon-files-empty clickBtn copyBtn"
										data-clipboard-text={
											bankSlipPopBox.accountNo
										}></span>
								</p>
								<h1>{i18n.lbl_DepositAmount}</h1>
								<p>
									{number_format(
										bankSlipPopBox.amount,
										bankSlipPopBox._isConvert
									)}
									<span
										className="icon icon-files-empty clickBtn copyBtn"
										data-clipboard-text={
											bankSlipPopBox.amount
										}></span>
								</p>
							</div>
						</div>
					</div>

					{this.props.bankSlipPopBox.picFileName &&
					this.state.disableUpload ? (
						<div className="depositInBox">
							<p>{i18n.lbl_HaveUploadedFile}</p>
							<p>
								<span className="icon icon-icon32px_attachment"></span>
								{this.props.bankSlipPopBox.picFileName}
							</p>
							<div className="btn-group">
								<button
									className="blue"
									onClick={this.HandleUploadAgain}>
									{i18n.lbl_BankSlipUploadAgain.toUpperCase()}
								</button>
							</div>
						</div>
					) : (
						<div className="depositInBox">
							<div className="depositTitle textLeft borderBottom">
								<h1 className="text-org">
									{i18n.lbl_UploadBankSlip}
								</h1>
							</div>
							<div className="depositImgUpload">
								<div>
									<input
										type="file"
										ref={this.filebox}
										accept="image/*"
										onChange={this.onCheckUpload}
										id="bankSlip"
									/>
									<label htmlFor="bankSlip">
										<p>
											<span className="icon icon-cloud_upload"></span>
											{i18n.lbl_UploadFile}
										</p>
									</label>
								</div>
							</div>
							<div className="textArea borderBottom">
								<ul>
									<li>{i18n.lbl_BankSlipRequirement1}</li>
									<li>{i18n.lbl_BankSlipRequirement2}</li>
									<li>{i18n.lbl_BankSlipRequirement3}</li>
								</ul>
							</div>
						</div>
					)}

					<div className="inputBox">
						<span>{`${i18n.lbl_DepositTime} (${moment().format(
							"Z"
						)})`}</span>
						<div className="inputBoxText">
							<input
								placeholder={i18n.msg_SubmitDepositTime}
								type="datetime-local"
								value={
									this.props.bankSlipPopBox.depositTime ?? ""
								}
								onChange={this.EditField.bind(
									this,
									"depositTime"
								)}
							/>
							<div className="iconModule">
								<span className="icon icon-calendar"></span>
								{/* <span className="icon icon-information-solid textBlue"></span> */}
							</div>
						</div>
						<span>{i18n.lbl_Refno}</span>
						<div className="inputBoxText">
							<input
								placeholder={i18n.msg_ReferenceNumber}
								value={this.props.bankSlipPopBox.refId ?? ""}
								onChange={this.EditField.bind(this, "refId")}
							/>
							{/* <div className="iconModule">
									<span className="icon icon-information-solid textBlue"></span>
								</div> */}
						</div>
					</div>
					<div className="btn-group">
						<button className="blue" onClick={this.SeReceipt}>
							{i18n.lbl_Submit}
						</button>
					</div>
				</section>
			</div>
		);
	}
}

export default () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { bankSlipPopBox, setbankSlipPopBox } = useContext(
		bankSlipPopBoxContext
	);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const handlePopBox = () => {
		if (isMountedRef.current) {
			if (bankSlipPopBox.closeCallBack) {
				bankSlipPopBox.closeCallBack();
			}
			setbankSlipPopBox(() => ({ isOpen: false }));
		}
	};

	const EditField = (column, value) => {
		setbankSlipPopBox(prevState => ({ ...prevState, [column]: value }));
	};

	return bankSlipPopBox.isOpen ? (
		<Content
			i18n={i18n}
			bankSlipPopBox={bankSlipPopBox}
			handlePopBox={handlePopBox}
			EditField={EditField}
			setPopBox={setPopBox}
		/>
	) : null;
};
