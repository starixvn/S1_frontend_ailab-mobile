import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Thumbs } from "swiper";
import { bannerImgUrl } from "../../config";

export const AmbassadorIntro = () => {
	const { t } = useTranslation();
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	//   <div class="swiper-slide">
	//                                 <div style="position: relative; width: 100%; height: 0px; padding-bottom: 56.25%">
	//                                     <iframe
	//                                         allow="fullscreen"
	//                                         allowfullscreen
	//                                         height="100%"
	//                                         src="https://streamable.com/e/vmq4q3?nocontrols=1"
	//                                         width="100%"
	//                                         style="
	//                                             border: none;
	//                                             width: 100%;
	//                                             height: 100%;
	//                                             position: absolute;
	//                                             left: 0px;
	//                                             top: 0px;
	//                                             overflow: hidden;
	//                                         "
	//                                     >
	//                                     </iframe>
	//                                 </div>
	const slidesData = [
		{
			type: "video",
			src: "https://streamable.com/e/vmq4q3?nocontrols=1"
		},
		{
			type: "image",
			src: `${bannerImgUrl}/h5/img/ambassador/01.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/h5/img/ambassador/02.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/h5/img/ambassador/03.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/h5/img/ambassador/04.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/h5/img/ambassador/05.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/h5/img/ambassador/06.jpg`
		},
		{
			type: "image",
			src: `${bannerImgUrl}/h5/img/ambassador/07.jpg`
		}
	];

	const swiper2SlidesData = [
		`${bannerImgUrl}/h5/img/ambassador/video-preview.jpg`,
		`${bannerImgUrl}/h5/img/ambassador/01.jpg`,
		`${bannerImgUrl}/h5/img/ambassador/02.jpg`,
		`${bannerImgUrl}/h5/img/ambassador/03.jpg`,
		`${bannerImgUrl}/h5/img/ambassador/04.jpg`,
		`${bannerImgUrl}/h5/img/ambassador/05.jpg`,
		`${bannerImgUrl}/h5/img/ambassador/06.jpg`,
		`${bannerImgUrl}/h5/img/ambassador/07.jpg`
	];

	// 將配置對象移到組件內部
	const swiperConfigTop = {
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		thumbs: {
			swiper: thumbsSwiper
		}
	};

	const swiperConfigDown = {
		spaceBetween: 10,
		slidesPerView: 4.5,
		freeMode: true,
		watchSlidesProgress: true,
		onSwiper: setThumbsSwiper // 設置thumbsSwiper實例
	};
	return (
		<div className="ambassador-intro">
			<div className="ambassador-gallery">
				<Swiper
					className="swiper gallery2"
					modules={[Navigation, Thumbs]}
					{...swiperConfigTop}>
					<div className="swiper-wrapper">
						{slidesData.map((slide, index) => (
							<SwiperSlide className="swiper-slide" key={index}>
								{slide.type === "video" ? (
									<div
										style={{
											position: "relative",
											width: "100%",
											height: 0,
											paddingBottom: "56.25%"
										}}>
										<iframe
											src={slide.src}
											allow="fullscreen"
											allowFullScreen
											style={{
												position: "absolute",
												width: "100%",
												height: "100%",
												left: 0,
												top: 0,
												border: "none",
												overflow: "hidden"
											}}
										/>
									</div>
								) : (
									<img
										src={slide.src}
										alt={t("lbl_Ambassador_Slide_Image")}
									/>
								)}
							</SwiperSlide>
						))}
					</div>
					<div className="swiper-button-next" />
					<div className="swiper-button-prev" />
				</Swiper>

				{/* gallery  btm */}
				<Swiper className="swiper gallery" {...swiperConfigDown}>
					<div className="swiper-wrapper">
						{swiper2SlidesData.map((src, index) => (
							<SwiperSlide className="swiper-slide" key={index}>
								<img
									src={src}
									alt={t("lbl_Ambassador_Slide_Image")}
								/>
							</SwiperSlide>
						))}
					</div>
				</Swiper>
			</div>
			<div className="ambassador-intro-item">
				<div className="title">
					{t("lbl_Ambassador_Collaboration_Title")}
				</div>
				<div className="content">
					<p>
						{t(
							"lbl_Ambassador_Collaboration_Declaration_Paragraph_1"
						)}
					</p>
					<p>
						{t(
							"lbl_Ambassador_Collaboration_Declaration_Paragraph_2"
						)}
					</p>
					<p>
						{t(
							"lbl_Ambassador_Collaboration_Declaration_Paragraph_3"
						)}
					</p>
				</div>
			</div>
		</div>
	);
};
