/* eslint-disable react/prop-types */
import React, { useContext, Component, useEffect, useRef } from "react";
import moment from "moment";
import {
	bankSlipPopBoxContext,
	i18nContext,
	popBoxContext
} from "../common/context";
import ClipboardJS from "../../lib/clipboard.min";
import {
	api_UploadReceipt,
	api_SetDepositReceipt
} from "../../service/api/payment";
import config from "../../config";
import { number_format } from "../common/common";

const GetUploadFileName = files => {
	const fullPath = files[0].name;
	const startIndex =
		fullPath.indexOf("\\") >= 0
			? fullPath.lastIndexOf("\\")
			: fullPath.lastIndexOf("/");
	let filename = fullPath.substring(startIndex);
	if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
		filename = filename.substring(1);
	}
	return filename;
};

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			processing: false,
			disableUpload: false
			// refIdTip: ""
		};
		this.isMountedRef = false;
		this.filebox = React.createRef();
	}

	componentDidMount() {
		/* eslint-disable */
		this.isMountedRef = true;
		this._clipboard = new ClipboardJS(".copyBtn");
		this._clipboard.on("success", () => {});
		this._clipboard.on("error", () => {});
		/* eslint-enable */
	}

	componentWillUnmount() {
		this.isMountedRef = false;
		this._clipboard.destroy();
	}

	onCheckUpload = () => {
		const { files } = this.filebox.current;
		if (files[0]) {
			this.props.EditField("picFileName", GetUploadFileName(files));

			const picFileName = GetUploadFileName(files);
			this.props.EditField("picFileName", picFileName);
			if (this.props.bankSlipPopBox.disableSubmit) {
				this.props.SetImg(picFileName, files[0]);
			} else {
				this.onUploadFile();
			}
		}
	};

	onUploadFile = () => {
		const { files } = this.filebox.current;
		if (files.length > 0) {
			this.setState({ disableUpload: true });
			const formData = new FormData();
			formData.append("TransId", this.props.bankSlipPopBox.transId);
			formData.append("Receipt", files[0]);
			api_UploadReceipt(formData).then(
				response => {
					if (this.isMountedRef) {
						const result = response.data;
						if (result.errorCode === 0) {
							alert(this.props.i18n.lbl_UploadSuccess);
						} else {
							alert(result.message);
						}
					}
				},
				() => {
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
		if (this.props.bankSlipPopBox.disableSubmit) {
			this.props.closePopBoxAndKeepData();
		}
		// else if (!this.props.bankSlipPopBox.refId) {
		// 	this.setState({ refIdTip: this.props.i18n.lbl_RemindForRefNum });
		// }
		else if (!this.state.processing) {
			window.location.reload();
			// this.setState({ processing: true });
			// const { bankSlipPopBox } = this.props;
			// api_SetDepositReceipt(
			// 	bankSlipPopBox.transId,
			// 	moment(bankSlipPopBox.depositTime).unix(),
			// 	bankSlipPopBox.refId
			// ).then(
			// 	res => {
			// 		if (this.isMountedRef) {
			// 			if (res.data.errorCode === 0) {
			// 				this.setState({ processing: false });
			// 				this.props.handlePopBox();

			// 				this.props.setPopBox({
			// 					isOpen: true,
			// 					title: this.props.i18n.lbl_ImportantNote,
			// 					content: this.props.i18n
			// 						.lbl_UpdateSuccessWillProcess
			// 				});
			// 			} else {
			// 				alert(res.message);
			// 				this.setState({ processing: false });
			// 			}
			// 		}
			// 	},
			// 	() => {
			// 		if (this.isMountedRef) {
			// 			this.props.setPopBox({
			// 				isOpen: true,
			// 				title: this.props.i18n.lbl_ImportantNote,
			// 				content: this.props.i18n.msg_ApiServerError
			// 			});

			// 			this.setState({ processing: false });
			// 		}
			// 	}
			// );
		}
	};

	HandleUploadAgain = () => {
		this.setState({ disableUpload: false });
		this.props.EditField("picFileName", "");
	};

	// checkAllValue = () => {
	// 	const refIdResult = this.checkRefId(this.props.bankSlipPopBox.refId);
	// 	const doneUploadResult = this.checkDoneUpload();
	// 	if (!doneUploadResult.status) {
	// 		this.props.setPopBox({
	// 			isOpen: true,
	// 			title: this.props.i18n.lbl_ImportantNote,
	// 			content: doneUploadResult.msg,
	// 			hasBtn: true,
	// 			btnBar: (
	// 				<div className="btn-group">
	// 					<button
	// 						className="blue"
	// 						onClick={() =>
	// 							this.props.setPopBox({
	// 								isOpen: false
	// 							})
	// 						}>
	// 						OK
	// 					</button>
	// 				</div>
	// 			)
	// 		});
	// 	} else if (!refIdResult.status) {
	// 		this.setState({ refIdTip: this.props.i18n.lbl_RemindForRefNum });
	// 	}

	// 	return refIdResult.status && doneUploadResult.status;
	// };

	// checkDoneUpload = () => {
	// 	let result = { status: true, msg: "" };
	// 	if (
	// 		!this.state.disableUpload &&
	// 		!this.props.bankSlipPopBox.picFileName
	// 	) {
	// 		result = { status: false, msg: this.props.i18n.lbl_AttachFile };
	// 	}

	// 	return result;
	// };

	// checkRefId = value => {
	// 	let result = { status: true, msg: "" };
	// 	if (!value) {
	// 		result = { status: false, msg: this.props.i18n.lbl_RefnoToolTip };
	// 	}

	// 	return result;
	// };

	render() {
		const { bankSlipPopBox } = this.props;
		const { i18n } = this.props;
		return (
			<div
				id="popup"
				style={bankSlipPopBox.isOpen ? { display: "block" } : {}}>
				<div className="popTit">
					<div
						className="close open"
						onClick={this.props.handlePopBox}>
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
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
								{this.props.bankSlipPopBox
									.disableSubmit ? null : (
									<>
										<h1>{i18n.lbl_ID}</h1>
										<p>{bankSlipPopBox.transId}</p>
									</>
								)}
								<h1>{i18n.lbl_BankAccountName}</h1>
								<p>
									{bankSlipPopBox.accountName}
									<span
										className="icon icon-files-empty clickBtn copyBtn"
										data-clipboard-text={
											bankSlipPopBox.accountName
										}
									/>
								</p>
								<h1>{i18n.lbl_BankNumber}</h1>
								<p>
									{bankSlipPopBox.accountNo}
									<span
										className="icon icon-files-empty clickBtn copyBtn"
										data-clipboard-text={
											bankSlipPopBox.accountNo
										}
									/>
								</p>
								{this.props.bankSlipPopBox
									.disableSubmit ? null : (
									<>
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
												}
											/>
										</p>
									</>
								)}
							</div>
						</div>
					</div>

					{this.props.bankSlipPopBox.picFileName &&
					(this.props.bankSlipPopBox.disableSubmit ||
						this.state.disableUpload) ? (
						<div className="depositInBox">
							<p>{i18n.lbl_HaveUploadedFile}</p>
							<p>
								<span className="icon icon-icon32px_attachment" />
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
											<span className="icon icon-cloud_upload" />
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

					{/* <div className="inputBox">
						<span>
							{`${i18n.lbl_DepositTime} (${moment().format(
								"Z"
							)})`}
						</span>
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
								<span className="icon icon-calendar" />
							</div>
						</div>
						<span>{i18n.lbl_Refno}</span>
						<div className="inputBoxText">
							<input
								placeholder={i18n.msg_ReferenceNumber}
								value={this.props.bankSlipPopBox.refId ?? ""}
								onChange={this.EditField.bind(this, "refId")}
							/>
						</div>
						<div className="tip open">
							{this.state.refIdTip ?? ""}
						</div>
					</div> */}
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
		return () => {
			isMountedRef.current = false;
		};
	});

	const handlePopBox = () => {
		if (isMountedRef.current) {
			if (bankSlipPopBox.closeCallBack) {
				bankSlipPopBox.closeCallBack();
			}
			setbankSlipPopBox(() => ({ isOpen: false }));
		}
	};

	const closePopBoxAndKeepData = () => {
		if (isMountedRef.current) {
			setbankSlipPopBox(prev => ({ ...prev, isOpen: false }));
		}
	};

	const EditField = (column, value) => {
		setbankSlipPopBox(prevState => ({ ...prevState, [column]: value }));
	};

	const SetImg = (picFileName, receipt) => {
		setbankSlipPopBox(prevState => ({
			...prevState,
			picFileName,
			receipt
		}));
	};

	return bankSlipPopBox.isOpen ? (
		<Content
			i18n={i18n}
			bankSlipPopBox={bankSlipPopBox}
			handlePopBox={handlePopBox}
			EditField={EditField}
			setPopBox={setPopBox}
			SetImg={SetImg}
			closePopBoxAndKeepData={closePopBoxAndKeepData}
		/>
	) : null;
};
