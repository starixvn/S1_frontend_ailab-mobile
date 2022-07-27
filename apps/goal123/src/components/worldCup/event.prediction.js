import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import { api_worldCupPrediction_UserPollTickets } from "../../service/api/worldCupPrediction";

const ticketStatus = {
	active: 1,
	finished: 2,
	unstarted: 3
};

const Pridictions = ({
	userTicketResult,
	ticketOptions,
	GetTicketInfo,
	i18n
}) => {
	const [selTicket, setSelTicket] = useState("1");
	let ticketTab = [];

	const selectTicket = ({ serial }) => {
		if (serial !== selTicket) {
			setSelTicket(serial);
		}
	};

	if (userTicketResult) {
		ticketTab = Object.values(userTicketResult)?.map((el, i) => {
			const serial = Object.keys(userTicketResult)[i].replace(
				"ticket",
				""
			);

			let className = " disabled";
			if (el?.ticketStatus === ticketStatus.finished) {
				className = " finished";
			} else if (el?.ticketStatus === ticketStatus.active) {
				className = "";
			}

			return (
				<div
					key={`ticket-tab-${serial}`}
					className={`ticket__tab-item${className}${
						serial === selTicket ? " active" : ""
					}`}
					onClick={() => selectTicket({ serial })}>
					{i18n.lbl_ticket} {serial}
				</div>
			);
		});
	}

	return (
		<div className="ticket__container">
			<div className="title">{i18n.lbl_yourPredictions}</div>
			<div className="ticket__info">
				<div className="ticket__tab">{ticketTab}</div>
				{userTicketResult && (
					<Ticket
						status={
							userTicketResult[`ticket${selTicket}`]
								?.ticketStatus ?? ticketStatus.unstarted
						}
						options={ticketOptions}
						serial={selTicket}
						countryId={
							userTicketResult[`ticket${selTicket}`]?.countryId
						}
						GetTicketInfo={GetTicketInfo}
						i18n={i18n}
					/>
				)}
			</div>
		</div>
	);
};

Pridictions.defaultProps = {
	userTicketResult: null,
	ticketOptions: null,
	GetTicketInfo: () => null
};

Pridictions.propTypes = {
	userTicketResult: PropTypes.objectOf(PropTypes.object),
	ticketOptions: PropTypes.objectOf(PropTypes.array),
	GetTicketInfo: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

const Ticket = ({
	status,
	options,
	serial,
	countryId,
	GetTicketInfo,
	i18n
}) => {
	const [selectedIdx, setSelectedIdx] = useState({ groupIdx: 0, teamIdx: 0 });

	let className = "";
	if (status === ticketStatus.finished) {
		className = "--finished";
	} else if (status === ticketStatus.unstarted) {
		className = "--disabled";
	}

	const groupOptions = Object.keys(options)?.map((el, i) => ({
		id: i,
		displayText: `${i18n.lbl_group} ${el.replace("group", "")}`,
		value: el
	}));

	const groupKey = groupOptions[selectedIdx.groupIdx]?.value;

	let teamArr = [];
	if (countryId) {
		const selCountry = options[groupKey]?.find(
			el => el.countryId === countryId
		);
		teamArr = [selCountry]?.map(el => (
			<button
				key={`finished-team-${el?.countryId}-${el?.countryName}`}
				className="btn-team">
				<img src={`${bannerImgUrl}/img/flag/${el?.imageName}`} alt="" />
				{el?.countryName}
			</button>
		));
	} else {
		teamArr = options[groupKey]?.map((el, i) => (
			<button
				key={`team-${el.countryId}-${el.countryName}`}
				className={`btn-team${
					status === ticketStatus.active && i === selectedIdx.teamIdx
						? " active"
						: ""
				}`}
				onClick={() => onSelectItem({ idx: i, col: "teamIdx" })}>
				<img src={`${bannerImgUrl}/img/flag/${el.imageName}`} alt="" />
				{el.countryName}
			</button>
		));
	}

	useEffect(() => {
		let groupIdx = 0;
		let teamIdx = 0;

		if (countryId) {
			groupIdx = Object.values(options).findIndex(el =>
				el.find(obj => obj.countryId === countryId)
			);
			teamIdx = Object.values(options)[groupIdx].findIndex(
				el => el.countryId === countryId
			);
		}
		setSelectedIdx({ groupIdx, teamIdx });
	}, [countryId]);

	const onSelectItem = ({ idx, col }) => {
		if (col === "groupIdx") {
			setSelectedIdx({ groupIdx: idx, teamIdx: 0 });
		} else {
			setSelectedIdx(prev => ({ ...prev, [col]: idx }));
		}
	};

	const submitTicket = () => {
		const selGroup = options[groupKey];
		const selCountryId = selGroup[selectedIdx.teamIdx].countryId;

		api_worldCupPrediction_UserPollTickets({
			ticketType: serial,
			countryId: selCountryId
		}).then(res => {
			const { errorCode, message } = res.data;
			if (errorCode === 0) {
				GetTicketInfo();
			} else {
				setPopBox({
					isOpen: true,
					content: `[${errorCode}] ${message}`
				});
			}
		});
	};

	return (
		<div className={`ticket__selection${className}`}>
			<div className="ticket__selection--left">
				<Dropdown
					options={groupOptions}
					selectedIdx={selectedIdx.groupIdx}
					onSelectItem={i =>
						onSelectItem({
							idx: i,
							col: "groupIdx"
						})
					}
					disabled={status !== ticketStatus.active}
				/>
			</div>
			<div className="ticket__selection--right">
				<div className="btnGroup">{teamArr}</div>
			</div>
			<div className="ticket__selection--bottom">
				{status === ticketStatus.active && (
					<div className="btnGroup">
						<button className="btn-green" onClick={submitTicket}>
							{i18n.lbl_Submit}
						</button>
					</div>
				)}
				{status === ticketStatus.finished && (
					<div className="msg">{i18n.msg_ticketBeenUsed}</div>
				)}
				{status === ticketStatus.unstarted && (
					<div className="msg">{i18n.msg_ticketNotBeenActivated}</div>
				)}
			</div>
		</div>
	);
};

Ticket.defaultProps = {
	options: null,
	serial: null,
	countryId: null,
	GetTicketInfo: () => null
};

Ticket.propTypes = {
	status: PropTypes.number.isRequired,
	options: PropTypes.objectOf(PropTypes.array),
	serial: PropTypes.string,
	countryId: PropTypes.number,
	GetTicketInfo: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.string).isRequired
};

const Dropdown = ({ options, selectedIdx, onSelectItem, disabled }) => {
	const [isOpen, setOpen] = useState(false);
	const wrapper = useRef(null);

	const useClickOutside = ref => {
		useEffect(() => {
			const handleClickOutside = e => {
				if (ref.current && !ref.current.contains(e.target)) {
					setOpen(false);
				}
			};
			document.addEventListener("mousedown", handleClickOutside);

			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	};

	const clickDropdown = e => {
		e.preventDefault();
		if (disabled) return;
		setOpen(prev => !prev);
	};

	useClickOutside(wrapper);

	const selectItem = (e, { idx, item }) => {
		e.stopPropagation();
		setOpen(false);
		onSelectItem(idx, item);
	};
	const arr = options?.map((item, i) => (
		<div
			key={`item-${item.displayText}`}
			className="dropdown-item"
			onClick={e => selectItem(e, { idx: i })}>
			{item.displayText}
		</div>
	));

	const selected = options?.[selectedIdx]?.displayText;

	return (
		<div className="inputBox-event" ref={wrapper} onClick={clickDropdown}>
			<div className={`dropdown${isOpen ? " open" : ""}`}>
				<button className="btn">{selected}</button>
				<div className="dropdown-container">{arr}</div>
			</div>
		</div>
	);
};

Dropdown.defaultProps = {
	options: null,
	selectedIdx: null,
	onSelectItem: () => null,
	disabled: null
};

Dropdown.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object),
	selectedIdx: PropTypes.number,
	onSelectItem: PropTypes.func,
	disabled: PropTypes.bool
};

export default Pridictions;
