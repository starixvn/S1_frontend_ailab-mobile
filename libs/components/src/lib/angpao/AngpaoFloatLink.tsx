import React, { useState } from "react";
import { useNavigate } from "@reach/router";
import i18next from "i18next";

const AngpaoFloatLink = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(true);

	const close = () => setOpen(false);

	if (!open) return null;

	return (
		<div className="eventLink angpaoLink">
			<button className="icon icon-close" onClick={close} />

			<img
				onClick={() => navigate("/angpao")}
				alt="event-link-img"
				className="eventlinkimg"
				src={`${process.env.REACT_APP_BANNER_URL}/h5/img/event/angpao/eventlink-${i18next.language}.png`}
			/>
		</div>
	);
};

export { AngpaoFloatLink };
