import React, { useContext, Component, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
	bankSlipPopBoxContext,
	i18nContext,
	popBoxContext,
	userInfoContext
} from "Context";
import moment from "moment";
import ClipboardJS from "../../lib/clipboard.min";
import api from "../../service/api";

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

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			processing: false,
			fileIsSetted: false,
			isUploaded: false
		};
		this.isMountedRef = false;
		this.filebox = React.createRef();
	}

	componentDidMount() {
		/* eslint-disable */
		console.log(this.props.currencyId);
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
		const { files } = this.filebox.current;
		if (files[0]) {
			this.props.EditField("picFileName", GetUploadFileName(files));
			this.setState({ fileIsSetted: true });
		} else {
			this.setState({ fileIsSetted: false });
		}
	};
	// 參照號碼改非必船
	// thb 必傳單具圖檔 沒船不能提交
	// currencyId 4

	onHandlePopBox = () => {
		this.setState({ isUploaded: false });
		this.setState({ fileIsSetted: false });
		this.props.handlePopBox();
	};

	onUploadFile = () => {
		const { files } = this.filebox.current;
		if (files.length > 0) {
			const formData = new FormData();
			formData.append("TransId", this.props.bankSlipPopBox.transId);
			formData.append("Receipt", files[0]);
			api.payment.UploadReceipt(formData).then(
				response => {
					if (this.isMountedRef) {
						const result = response.data;
						if (result.errorCode === 0) {
							alert(this.props.i18n.lbl_UploadSuccess);
							this.setState({ isUploaded: true });
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
			const { bankSlipPopBox } = this.props;
			api.payment
				.SetDepositReceipt(
					bankSlipPopBox.transId,
					moment(bankSlipPopBox.depositTime).unix(),
					bankSlipPopBox.refId
				)
				.then(
					res => {
						if (this.isMountedRef) {
							if (res.data.errorCode === 0) {
								this.props.handlePopBox();
								if (!alert(this.props.i18n.lbl_UploadSuccess)) {
									window.location.reload();
								}
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

	render() {
		const { bankSlipPopBox } = this.props;
		const { i18n } = this.props;
		return (
			<div
				id="popup"
				className={bankSlipPopBox.isOpen === true ? "active" : ""}>
				<div
					className={`bankSlip popUp${
						bankSlipPopBox.isOpen ? " active" : ""
					}`}>
					<div className="info infoAccount">
						<ul>
							<li>
								<div>
									<div className="bankLogo acb" />
									<span>{bankSlipPopBox.bankName}</span>
								</div>
								<a
									href={bankSlipPopBox.bankSite}
									target="_blank"
									rel="noreferrer">
									<button className="icon icon-new-tab clickBtn" />
								</a>
							</li>
							<li>
								<div>
									<span className="title">
										{i18n.lbl_BankAccountName}
									</span>
									<span>{bankSlipPopBox.accountName}</span>
								</div>
								<button
									className="icon icon-files-empty clickBtn copyBtn"
									data-clipboard-text={
										bankSlipPopBox.accountName
									}
								/>
							</li>
							<li>
								<div>
									<span className="title">
										{i18n.lbl_BankNumber}
									</span>
									<span>{bankSlipPopBox.accountNo}</span>
								</div>
								<button
									className="icon icon-files-empty clickBtn copyBtn"
									data-clipboard-text={
										bankSlipPopBox.accountNo
									}
								/>
							</li>
							<li>
								<div>
									<span className="title">
										{i18n.lbl_DepositAmount}
									</span>
									<span>{bankSlipPopBox.amount}</span>
								</div>
								<button
									className="icon icon-files-empty clickBtn copyBtn"
									data-clipboard-text={bankSlipPopBox.amount}
								/>
							</li>
						</ul>
					</div>
					<span className="text">{i18n.lbl_AttachFile}</span>
					<div className="btn-group">
						<label className="fileUpload">
							<input
								type="file"
								ref={this.filebox}
								accept="image/*"
								onChange={this.onCheckUpload}
							/>
							<i className="icon icon-folder-upload" />
							{` ${
								this.props.bankSlipPopBox.picFileName ??
								i18n.msg_SelectFile
							} `}
						</label>
						<button
							className={`${
								this.state.fileIsSetted ? "orange" : "gray"
							}`}
							disabled={!this.state.fileIsSetted}
							onClick={this.onUploadFile}>
							{i18n.lbl_UploadFile}
						</button>
					</div>
					<span className="text">
						{i18n.lbl_DepositTime}{" "}
						<span className="text-org">
							({moment().format("Z")})
						</span>
					</span>
					<div className="inputBox">
						<i className="icon icon-calendar" />
						<input
							placeholder={i18n.msg_SubmitDepositTime}
							type="datetime-local"
							value={this.props.bankSlipPopBox.depositTime ?? ""}
							onChange={this.EditField.bind(this, "depositTime")}
						/>
					</div>
					<div className="inputBox">
						<i className="icon icon-pencil" />
						<input
							placeholder={i18n.msg_ReferenceNumber}
							value={this.props.bankSlipPopBox.refId ?? ""}
							onChange={this.EditField.bind(this, "refId")}
						/>
					</div>
					<div className="btn-group">
						<button
							className="blue closePopup"
							onClick={() => this.onHandlePopBox()}>
							{i18n.lbl_Cancel}
						</button>
						<button
							disabled={
								!this.state.isUploaded &&
								this.props.currencyId === 4
							}
							className={`${
								this.props.currencyId !== 4 ||
								this.state.isUploaded
									? "orange"
									: "gray"
							} closePopup`}
							onClick={this.SeReceipt}>
							{i18n.lbl_Submit}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

Modal.defaultProps = {
	bankSlipPopBox: {}
};

Modal.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	handlePopBox: PropTypes.func.isRequired,
	bankSlipPopBox: PropTypes.objectOf(PropTypes.any),
	setPopBox: PropTypes.func.isRequired,
	EditField: PropTypes.func.isRequired,
	currencyId: PropTypes.number.isRequired
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
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

	const EditField = (column, value) => {
		setbankSlipPopBox(prevState => ({ ...prevState, [column]: value }));
	};

	return (
		<Modal
			currencyId={userInfo.currencyId}
			i18n={i18n}
			bankSlipPopBox={bankSlipPopBox}
			handlePopBox={handlePopBox}
			EditField={EditField}
			setPopBox={setPopBox}
		/>
	);
};

export default Panel;
