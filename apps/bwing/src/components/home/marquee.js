import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Marquee = ({ list, onClick, speed }) => {
	const containerRef = useRef(null);
	const contentRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		const content = contentRef.current;
		const containerWidth = container.offsetWidth;
		const animation = content.animate(
			[
				{ transform: `translateX(${containerWidth}px)` },
				{ transform: `translateX(-${containerWidth}px)` }
			],
			{
				duration: speed,
				iterations: Infinity,
				easing: "linear"
			}
		);

		return () => {
			animation.cancel();
		};
	}, []);

	return (
		<div ref={containerRef} id="Marquee" className="marquee">
			<div
				className="marquee-box icon-speaker"
				style={{ overflow: "visible" }}>
				<div ref={contentRef} className="marquee-run">
					{list.map(item => (
						<a key={item.id} onClick={() => onClick(item)}>
							{item.content}
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

Marquee.defaultProps = {
	speed: 6000,
	onClick: null
};

Marquee.propTypes = {
	list: PropTypes.arrayOf(PropTypes.any).isRequired,
	onClick: PropTypes.func,
	speed: PropTypes.number
};

export default Marquee;
