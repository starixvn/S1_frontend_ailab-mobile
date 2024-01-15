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
	popBoxContext
} from "../common/context";
import ClipboardJS from "../../lib/clipboard.min";
import {
	api_UploadReceipt,
	api_GetDepositInfoRecent
} from "../../service/api/payment";
import { getBase64 } from "../common/common";

class Modal extends Component {
	filebox = React.createRef();

	isMountedRef = false;

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

	onUploadFile = async () => {
		const { files } = this.filebox.current;
		if (files.length > 0) {
			const image = await getBase64(files[0]);
			api_UploadReceipt(this.props.bankSlipPopBox.transId, image).then(
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
		if (this.props.bankSlipPopBox.disableSubmit) {
			const { files } = this.filebox.current;
			this.props.closePopBoxAndKeepData();

			if (files[0]) {
				this.props.setbankSlipPopBox(prevState => ({
					...prevState,
					receiptFile: files[0]
				}));
			}
		}
	};

	onClickCancel = () => {
		if (this.props.bankSlipPopBox.disableSubmit) {
			this.props.closePopBoxAndKeepData();
		} else {
			this.props.handlePopBox();
		}
	};

	render() {
		const { bankSlipPopBox } = this.props;
		const { i18n } = this.props;
		return (
			<div
				className={`bankSlip popUp${
					bankSlipPopBox.isOpen ? " open" : ""
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
								data-clipboard-text={bankSlipPopBox.accountName}
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
								data-clipboard-text={bankSlipPopBox.accountNo}
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
						{bankSlipPopBox?.code && (
							<li>
								<div>
									<span className="title">
										{i18n.Label_Remark}
									</span>
									<span>{bankSlipPopBox.code}</span>
								</div>
								<button
									className="icon icon-files-empty clickBtn copyBtn"
									data-clipboard-text={bankSlipPopBox.code}
								/>
							</li>
						)}
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
										src={this.props.bankSlipPopBox.receipt}
									/>
								) : (
									<i className="icon icon-plus" />
								)}
							</label>
						)}
						{this.props.receiptInfoList.map(
							({ receiptNo, depositPic }) => (
								<label key={receiptNo} className="upload_img">
									<input type="file" />
									<img src={depositPic} alt="" />
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
						className="darkGray closePopup"
						onClick={this.onClickCancel}>
						{i18n.lbl_Cancel}
					</button>
					<button
						className="lightBlue closePopup"
						onClick={
							!bankSlipPopBox.disableSubmit
								? this.onUploadFile
								: this.SeReceipt
						}>
						{i18n.lbl_Submit}
					</button>
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	EditField: PropTypes.func.isRequired,
	bankSlipPopBox: PropTypes.objectOf(PropTypes.any).isRequired,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	setPopBox: PropTypes.func.isRequired,
	handlePopBox: PropTypes.func.isRequired
};

const Panel = () => {
	const { i18n } = useContext(i18nContext);
	const { setPopBox } = useContext(popBoxContext);
	const { bankSlipPopBox, setbankSlipPopBox } = useContext(
		bankSlipPopBoxContext
	);
	const [receiptInfoList, setReceiptInfoList] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		if (bankSlipPopBox.isOpen) {
			api_GetDepositInfoRecent().then(res => {
				const recentDataList = res.data.data;
				const target = recentDataList.find(
					({ transId }) => transId === bankSlipPopBox.transId
				);
				setbankSlipPopBox(prev => ({
					...prev,
					receiptInfo: target?.depositReceipt
				}));
				setReceiptInfoList(target?.depositReceipt);
			});
		}
	}, [bankSlipPopBox.isOpen]);

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
			setbankSlipPopBox(prev => ({
				...prev,
				isOpen: false
			}));
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
			key={`bankslip-${bankSlipPopBox.transId}-${bankSlipPopBox.sysId}`}
			i18n={i18n}
			bankSlipPopBox={bankSlipPopBox}
			setbankSlipPopBox={setbankSlipPopBox}
			receiptInfoList={receiptInfoList}
			handlePopBox={handlePopBox}
			EditField={EditField}
			setPopBox={setPopBox}
			SetImg={SetImg}
			closePopBoxAndKeepData={closePopBoxAndKeepData}
		/>
	);
};

export default Panel;
