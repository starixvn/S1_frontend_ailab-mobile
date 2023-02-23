import React, {
	useContext,
	Component,
	useEffect,
	useRef,
	useState
} from "react";
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

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			processing: false
		};
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

	onImgFileReaderHandlar = imgFile => {
		const imgReader = new FileReader();
		imgReader.readAsDataURL(imgFile);
		imgReader.onload = () => {
			this.props.SetImg(imgFile.name, imgReader.result);
		};
	};

	onCheckUpload = e => {
		e.preventDefault();

		const file =
			e.dataTransfer?.files.length > 0
				? e.dataTransfer?.files[0]
				: e.target.files[0];

		const isValid = file?.type.includes("image");

		if (!isValid) {
			this.props.SetImg("", null);
		} else {
			this.onImgFileReaderHandlar(file);
		}
	};

	onHandlePopBox = () => {
		this.props.bankSlipPopBox.hideSubmit
			? this.props.closePopBoxAndKeepData()
			: this.props.handlePopBox();
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
							this.props.handlePopBox();
						} else {
							this.props.setPopBox({
								isOpen: true,
								content: `[${result.errorCode}] ${result.message}`
							});
						}
					}
				},
				() => {
					if (this.isMountedRef) {
						this.props.setPopBox({
							isOpen: true,
							content: this.props.i18n.msg_ApiServerError
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
		if (this.props.bankSlipPopBox.hideSubmit) {
			this.props.closePopBoxAndKeepData();
		} else if (!this.state.processing) {
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
								window.location.reload();
							} else {
								this.props.setPopBox({
									isOpen: true,
									content: `[${res.data.errorCode}] ${res.data.message}`
								});
							}

							this.setState({ processing: false });
						}
					},
					() => {
						if (this.isMountedRef) {
							this.props.setPopBox({
								isOpen: true,
								content: this.props.i18n.msg_ApiServerError
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
					{this.props.receiptInfoList?.length > 0 ? (
						<div className="uploadModule">
							{this.props.receiptInfoList.length < 6 && (
								<label
									className="upload_img"
									onDragOver={e => e.preventDefault()}
									onDrop={this.onCheckUpload}>
									<input
										type="file"
										ref={this.filebox}
										accept="image/*"
										onChange={this.onCheckUpload}
									/>
									{this.props.bankSlipPopBox.picFileName ? (
										<img
											alt={
												this.props.bankSlipPopBox
													.picFileName
											}
											src={
												this.props.bankSlipPopBox
													.receipt
											}
										/>
									) : (
										<i className="icon icon-plus" />
									)}
								</label>
							)}
							{this.props.receiptInfoList.map(
								({ receiptNo, depositPic }) => (
									<label
										key={receiptNo}
										className="upload_img">
										<input type="file" />
										<img
											src={`data:image/jpeg;base64,${depositPic}`}
											alt=""
										/>
									</label>
								)
							)}
						</div>
					) : (
						<label
							className="upload_img"
							onDragOver={e => e.preventDefault()}
							onDrop={this.onCheckUpload}>
							<input
								type="file"
								ref={this.filebox}
								accept="image/*"
								onChange={this.onCheckUpload}
							/>
							{this.props.bankSlipPopBox.picFileName ? (
								<img
									alt={this.props.bankSlipPopBox.picFileName}
									src={this.props.bankSlipPopBox.receipt}
								/>
							) : (
								<i className="icon icon-plus" />
							)}
						</label>
					)}
					<div className="rule">
						<ul>
							<li>{i18n.lbl_MaximumFileSizeEach}</li>
							<li>{i18n.lbl_MaximumNumberOfFiles}</li>
							<li>{i18n.lbl_AcceptedFileType}</li>
						</ul>
					</div>
					<div className="btn-group">
						<button
							className="white closePopup"
							onClick={() => this.onHandlePopBox()}>
							{i18n.lbl_Cancel}
						</button>
						<button
							disabled={!bankSlipPopBox.picFileName}
							className={`${
								this.props.currencyId !== 4 ||
								(this.props.currencyId === 4 &&
									bankSlipPopBox.picFileName)
									? "blue"
									: "gray"
							} closePopup`}
							onClick={
								!bankSlipPopBox.hideSubmit
									? this.onUploadFile
									: this.SeReceipt
							}>
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
	SetImg: PropTypes.func.isRequired
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { bankSlipPopBox, setbankSlipPopBox } = useContext(
		bankSlipPopBoxContext
	);
	const [receiptInfoList, setReceiptInfoList] = useState([]);
	const isMountedRef = useRef(null);
	useEffect(() => {
		if (bankSlipPopBox.isOpen) {
			api.payment.GetDepositInfoRecent().then(res => {
				const recentDataList = res.data.data;
				const target = recentDataList.find(
					({ transId }) => transId === bankSlipPopBox.transId
				);
				setbankSlipPopBox(prev => ({
					...prev,
					receiptInfo: target.depositReceipt
				}));
				setReceiptInfoList(target.depositReceipt);
			});
		}
	}, [bankSlipPopBox.isOpen]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const closePopBoxAndKeepData = () => {
		if (isMountedRef.current) {
			setbankSlipPopBox(prev => ({ ...prev, isOpen: false }));
		}
	};

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

	const SetImg = (picFileName, receipt) => {
		setbankSlipPopBox(prevState => ({
			...prevState,
			picFileName,
			receipt
		}));
	};
	return (
		<Modal
			currencyId={userInfo.currencyId}
			i18n={i18n}
			bankSlipPopBox={bankSlipPopBox}
			receiptInfoList={receiptInfoList}
			handlePopBox={handlePopBox}
			EditField={EditField}
			setPopBox={setPopBox}
			closePopBoxAndKeepData={closePopBoxAndKeepData}
			SetImg={SetImg}
		/>
	);
};

export default Panel;
