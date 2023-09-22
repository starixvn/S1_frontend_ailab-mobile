import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Marquee = ({ list, onClick, speed }) => {
	const containerRef = useRef(null);
	const contentRef = useRef(null);
	const speakerRef = useRef(null);
	const containerWidth = useRef(0);

	useEffect(() => {
		const container = containerRef.current;
		const content = contentRef.current;
		const speaker = speakerRef.current;

		containerWidth.current = container.offsetWidth;
		const speakerWidth = speaker.offsetWidth;

		const animation = content.animate(
			[
				{ transform: `translateX(${containerWidth.current}px)` },
				{ transform: `translateX(-${speakerWidth}px)` }
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

	const renderItems = () => {
		const visibleItems = list.map(item => (
			<a key={item.id} onClick={() => onClick(item)}>
				{item.content}
			</a>
		));

		// 計算隱藏元素數量
		const itemsToHide =
			Math.ceil(
				containerWidth.current / speakerRef.current?.offsetWidth
			) - list.length;

		if (itemsToHide > 0) {
			// 添加空白佔位符
			for (let i = 0; i < itemsToHide; i++) {
				visibleItems.unshift(<span key={`hidden-${i}`} />);
			}
		}

		return visibleItems;
	};

	return (
		<div ref={containerRef} id="Marquee" className="marquee">
			<div
				className="marquee-box icon-speaker"
				style={{ overflow: "hidden", width: "100%" }}
				ref={speakerRef}>
				<div ref={contentRef} className="marquee-run">
					{renderItems()}
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
