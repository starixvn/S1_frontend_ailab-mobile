import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { isDateRange } from "@ailab-mobile/common";
import Dropdown from "./dropdown";
import { bannerImgUrl } from "../../../config";
import { eventTime } from "../../common/eventTime";

const TeamSelector = ({
	options,
	selectedTeamId,
	ticketsNumber,
	selectedGroup,
	setSelectedTeamId,
	setTicketsNumber,
	setSelectedGroup,
	onSubmit
}) => {
	const { t } = useTranslation();

	return (
		<div
			className={classNames("ticket-filter", {
				closedown: !isDateRange(eventTime.prediction)
			})}>
			<div>
				<div className="group-input">
					<Dropdown
						options={Object.keys(options ?? {})}
						placeholder="Group"
						onSelect={setSelectedGroup}
					/>
				</div>
				<div className="team-input">
					<Dropdown
						options={options?.[selectedGroup] ?? []}
						placeholder="Select Your Team"
						onSelect={setSelectedTeamId}
						disable={!selectedGroup}
					/>
				</div>
				<div className="number-input">
					<input
						type="number"
						className="input check"
						placeholder={t("lbl_CupEvent_PleaseFillOut")}
						value={ticketsNumber}
						onChange={e => setTicketsNumber(e.target.value)}
					/>
					<button>
						<img
							src={`${bannerImgUrl}/h5/img/event/eurocup/close.png`}
							alt="close"
							onClick={() => setTicketsNumber("")}
						/>
					</button>
				</div>
				<button
					className="submit-btn"
					onClick={() => {
						onSubmit({
							userPollTicket: {
								// goal不分type,type固定帶0
								TicketType: 0,
								CountryId: Number(selectedTeamId)
							},
							count: Number(ticketsNumber)
						});
					}}>
					{t("lbl_Submit")}
				</button>
			</div>
		</div>
	);
};

TeamSelector.propTypes = {
	options: PropTypes.objectOf(PropTypes.any).isRequired,
	selectedTeamId: PropTypes.string.isRequired,
	selectedGroup: PropTypes.string.isRequired,
	ticketsNumber: PropTypes.string.isRequired,
	setSelectedTeamId: PropTypes.func.isRequired,
	setTicketsNumber: PropTypes.func.isRequired,
	setSelectedGroup: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default TeamSelector;
