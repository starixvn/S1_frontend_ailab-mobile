/* eslint-disable react/prop-types */
import React, {
	useContext,
	Component,
	useEffect,
	useRef,
	useState
} from "react";
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
import { paymentImgUrl } from "../../config";
import { number_format, getBase64 } from "../common/common";

class Content extends Component {
	constructor(props) {
		super(props);
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
		this.props.bankSlipPopBox.disableSubmit
			? this.props.closePopBoxAndKeepData()
			: this.props.handlePopBox();
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
						onClick={() => this.onHandlePopBox()}>
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
					{bankSlipPopBox.isShowReceiptInfo && (
						<div className="depositInBox">
							<div className="depositTitle textLeft borderBottom">
								<h1 className="text-org">
									{i18n.lbl_Transaction}
								</h1>
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
										src={`${paymentImgUrl}/${bankSlipPopBox.bankLogo?.toLowerCase()}`}
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
													bankSlipPopBox._isConvert,
													0
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
									{this.props.bankSlipPopBox?.code && (
										<>
											<h1>{i18n.Label_Remark}</h1>
											<p>
												{bankSlipPopBox.code}
												<span
													className="icon icon-files-empty clickBtn copyBtn"
													data-clipboard-text={
														this.props
															.bankSlipPopBox
															?.code
													}
												/>
											</p>
										</>
									)}
								</div>
							</div>
						</div>
					)}
					<div className="depositInBox">
						<div className="depositTitle textLeft borderBottom">
							<h1 className="text-org">
								{i18n.lbl_UploadBankSlip}
							</h1>
						</div>
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
										{this.props.bankSlipPopBox
											.picFileName ? (
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
						<div className="textArea borderBottom">
							<ul>
								<li>{i18n.lbl_MaximumFileSizeEach}</li>
								<li>{i18n.lbl_MaximumNumberOfFiles}</li>
								<li>{i18n.lbl_AcceptedFileType}</li>
							</ul>
						</div>
					</div>
					<div className="btn-group">
						<button
							className="blue"
							onClick={
								!bankSlipPopBox.disableSubmit
									? this.onUploadFile
									: this.SeReceipt
							}>
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
			setbankSlipPopBox={setbankSlipPopBox}
			receiptInfoList={receiptInfoList}
			handlePopBox={handlePopBox}
			EditField={EditField}
			setPopBox={setPopBox}
			SetImg={SetImg}
			closePopBoxAndKeepData={closePopBoxAndKeepData}
		/>
	) : null;
};
