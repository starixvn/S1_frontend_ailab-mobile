import React from "react";
import { useTranslation } from "react-i18next";

const RebateExclude = () => {
	const { t } = useTranslation();
	const excludeList = [
		{ product: "Crypto Sports", gameName: ["All Game"] },
		{
			product: "V8 Poker",
			gameName: ["All Game"]
		},
		{
			product: "Asia Gaming Live Casino",
			gameName: ["All Blackjack game"]
		},
		{
			product: "Ebet Live Casino",
			gameName: ["All Blackjack game"]
		},
		{
			product: "Evolution Gaming Live Casino",
			gameName: ["All Blackjack game"]
		},
		{
			product: "N2Live Live Casino",
			gameName: ["All Blackjack game"]
		},
		{
			product: "Playtech Live Casino",
			gameName: ["All Blackjack game"]
		},
		{
			product: "Pragmatic Play Live Casino",
			gameName: ["All Blackjack game"]
		},
		// {
		// 	product: "Astro Tech",
		// 	gameName: ["Fishing"]
		// },
		{
			product: "CQ9",
			gameName: ["Fishing"]
		},
		{
			product: "Spade Gaming",
			gameName: ["Fishing"]
		},
		{
			product: "YL",
			gameName: ["Fishing"]
		},
		{
			product: "Advant Play Mini",
			gameName: ["Crash", "Card Racing"]
		},
		{
			product: "CQ9",
			gameName: [
				"Alice Run",
				"Alice Run JP",
				"Jungle Party",
				"Mahjong Fruit",
				"Mini Roulette",
				"Mr.Bean",
				"Tenfold Eggs",
				"Thai HILO",
				"Xoc Dia"
			]
		},
		{
			product: "Game Play",
			gameName: ["VN Lottery"]
		},
		{
			product: "HB (HABANERO)",
			gameName: [
				"Aces and Eights 1 Hand",
				"Aces and Eights 10 Hand",
				"Aces and Eights 100 Hand",
				"Aces and Eights 5 Hand",
				"Aces and Eights 50 Hand",
				"All American Poker 1 Hand",
				"All American Poker 10 Hand",
				"All American Poker 100 Hand",
				"All American Poker 5 Hand",
				"All American Poker 50 Hand",
				"American Blackjack",
				"Baccarat",
				"Baccarat Zero Commission",
				"Blackjack 3 Hand",
				"Bonus Deuces Wild 1 Hand",
				"Bonus Deuces Wild 10 Hand",
				"Bonus Deuces Wild 100 Hand",
				"Bonus Deuces Wild 5 Hand",
				"Bonus Deuces Wild 50 Hand",
				"Bonus Poker 1 Hand",
				"Bonus Poker 10 Hand",
				"Bonus Poker 100 Hand",
				"Bonus Poker 5 Hand",
				"Bonus Poker 50 Hand",
				"Caribbean Hold'em",
				"Caribbean Stud",
				"Deuces Wild 1 Hand",
				"Deuces Wild 10 Hand",
				"Deuces Wild 100 Hand",
				"Deuces Wild 5 Hand",
				"Deuces Wild 50 Hand",
				"Double Bonus Poker 1 Hand",
				"Double Bonus Poker 10 Hand",
				"Double Bonus Poker 100 Hand",
				"Double Bonus Poker 5 Hand",
				"Double Bonus Poker 50 Hand",
				"Double Double Bonus Poker 1 Hand",
				"Double Double Bonus Poker 10 Hand",
				"Double Double Bonus Poker 100 Hand",
				"Double Double Bonus Poker 5 Hand",
				"Double Double Bonus Poker 50 Hand",
				"Double Exposure 3 Hand",
				"Dragon Tiger",
				"Jacks or Better 1 Hand",
				"Jacks or Better 10 Hand",
				"Jacks or Better 100 Hand",
				"Jacks or Better 5 Hand",
				"Jacks or Better 50 Hand",
				"Joker Poker 1 Hand",
				"Joker Poker 10 Hand",
				"Joker Poker 100 Hand",
				"Joker Poker 5 Hand",
				"Joker Poker 50 Hand",
				"Roulette",
				"Sic Bo",
				"Tens or Better 1 Hand",
				"Tens or Better 10 Hand",
				"Tens or Better 100 Hand",
				"Tens or Better 5 Hand",
				"Tens or Better 50 Hand",
				"Three Card Poker",
				"Three Card Poker Deluxe",
				"War"
			]
		},
		{
			product: "JILI",
			gameName: [
				"7 UP-DOWN",
				"7up7down",
				"Baccarat",
				"Big Small",
				"Bingo Carnaval",
				"Calaca Bingo",
				"Colour Game",
				"Crazy Pusher",
				"Dice",
				"Dragon & Tiger",
				"Dragon and Tiger",
				"Fairness Games",
				"Fortune Bingo",
				"Go Goal Bingo",
				"iRich Bingo",
				"Jackpot Bingo",
				"Lucky Bingo",
				"Lucky Number",
				"Number King",
				"Poker King",
				"Sic Bo",
				"Super Bingo",
				"Win Drop"
			]
		},
		{
			product: "MG (MICRO GAMING)",
			gameName: [
				"American Roulette",
				"American Roulette Jade",
				"Andar Bahar Royale",
				"Auto Roulette",
				"Baccarat Jade",
				"Break Away Shootout",
				"Cricket Star Scratch",
				"European Roulette",
				"European Roulette Jade",
				"Happy Monster Claw",
				"Immortal Romance Video Bingo",
				"Incan Adventure",
				"Incredible Balloon Machine",
				"Lightning Fortunes",
				"Lucky Twins Catcher",
				"Match Day",
				"Max Damage and the Alien Attack",
				"Mega Money Rush",
				"Mega Money Wheel",
				"Poke The Guy",
				"Soccer Striker",
				"Treasure Dash",
				"Wheel of Winners"
			]
		},
		{
			product: "NETENT",
			gameName: [
				"American Roulette",
				"Baccarat",
				"Blackjack",
				"Blackjack Classic",
				"Casino Hold'em",
				"European Roulette",
				"French Roulette",
				"Jacks or Better Double Up",
				"Roulette Advanced"
			]
		},
		{
			productc: "One789",
			gameName: ["Traditional Lottery"]
		},
		{
			product: "PP (Pragmatic Play)",
			gameName: [
				"7 Piggies 25,000",
				"American Blackjack",
				"Baccarat",
				"Dragon Bonus Baccarat",
				"Dragon Tiger",
				"Hot Safari 75,000",
				"Multihand Blackjack",
				"Panda Gold 50,000",
				"Queen of Gold 100,000",
				"Roulette",
				"Spaceman"
			]
		},
		{
			product: "PT (PLAYTECH)",
			gameName: [
				"1000 Diamond Bet Roulette",
				"101 Roulette",
				"3 Card Brag",
				"7 e mezzo",
				"Aces and Faces Multi-Hand",
				"Age of the Gods Roulette",
				"Age of the Gods Spin A Win",
				"All Bets Blackjack",
				"Baccarat",
				"Blackjack Surrender",
				"Buster Blackjack",
				"Caribbean Stud Poker",
				"Cashback Blackjack",
				"Casino Hold'Em",
				"Classic Roulette",
				"Deuces Wild Multi-Hand",
				"Diamond Bet Roulette",
				"Dragon Jackpot Roulette",
				"Free Chip Blackjack",
				"Heads Up Hold'em",
				"Hi-Lo Premium",
				"Hit me Baccarat",
				"Lucky Lucky Blackjack",
				"Mega Fire Blaze: Roulette",
				"Mini Roulette",
				"Perfect Blackjack Multihand 5",
				"Premium American Roulette",
				"Premium Blackjack",
				"Premium Blackjack Single Hand",
				"Premium European Roulette",
				"Quantum Roulette Instant Play",
				"Roulette Deluxe",
				"Spread Bet Roulette",
				"Super Roulette",
				"Vegas Blackjack"
			]
		},
		{
			product: "RED TIGER",
			gameName: ["Classic Blackjack", "European Roulette", "Punto Banco"]
		},
		{
			product: "Saba",
			gameName: [
				"OW Bitcoin",
				"OW China Lottery",
				"OW Keno",
				"OW Lottery",
				"OW Number Game",
				"OW Table Game"
			]
		},
		{
			product: "Skywind",
			gameName: [
				"3 Card Brag",
				"Baccarat",
				"Blackjack",
				"European Roulette",
				"Red Black Poker"
			]
		},
		{
			product: "TGC",
			gameName: ["TCG VN Lottery"]
		}
	];
	return (
		<>
			<div className="subheader">
				<div className="subheader__container">
					<a href="https://www.nova88.net/" />
				</div>
			</div>
			<main className="exclude">
				<div className="exclude__container">
					<div className="exclude__title">
						{t("lbl_RebateExclude_title")}
					</div>
					<div className="exclude__table">
						<div className="exclude__table__item">
							<div>{t("lbl_Product")}</div>
							<div>
								<span>{t("lbl_GameName")}</span>
							</div>
						</div>
						{excludeList.map(({ product, gameName }) => (
							<div className="exclude__table__item">
								<div>{product}</div>
								<div>
									{gameName.map(value => (
										<span>{value}</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			<div className="subcopyright">
				<span className="text">{`© Copyright ${new Date().getFullYear()}. Bwing. All Rights Reserved.`}</span>
			</div>
		</>
	);
};

export default RebateExclude;
