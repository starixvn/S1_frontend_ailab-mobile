import React, { useContext, Component, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { bankSlipPopBoxContext, i18nContext, popBoxContext } from "Context";
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
		this.state = { processing: false };
		this.isMountedRef = false;
		this.filebox = React.createRef();
	}

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
		const { files } = this.filebox.current;
		if (files[0]) {
			this.props.EditField("picFileName", GetUploadFileName(files));
		}
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
									className="icon icon-new-tab clickBtn"
									target="_blank"
									rel="noreferrer noopener"
									href={bankSlipPopBox.bankSite}
								/>
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
						<button className="orange" onClick={this.onUploadFile}>
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
					<span className="text">{i18n.lbl_RefnoToolTip}</span>
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
							onClick={this.props.handlePopBox}>
							{i18n.lbl_Cancel}
						</button>
						<button
							className="orange closePopup"
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
	EditField: PropTypes.func.isRequired
};

const Panel = () => {
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

	const EditField = (column, value) => {
		setbankSlipPopBox(prevState => ({ ...prevState, [column]: value }));
	};

	return (
		<Modal
			i18n={i18n}
			bankSlipPopBox={bankSlipPopBox}
			handlePopBox={handlePopBox}
			EditField={EditField}
			setPopBox={setPopBox}
		/>
	);
};

export default Panel;
