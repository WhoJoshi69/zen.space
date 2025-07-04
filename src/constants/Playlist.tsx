import {
	IconVinyl,
	IconCoffee,
	IconTrees,
	IconCampfire,
	IconCloudRain,
	IconRipple,
	IconDeviceSpeaker,
	IconMicrophone,
	IconWalk
} from "@tabler/icons-react";

import { Sound } from "@/types/sound";

export const SOUNDS_LIST: Sound[] = [
	{
		cover: "https://ik.imagekit.io/dailyplace/covers/lofi-2.webm",
		videoID: "vkQcpY3T8T4",
		title: "Lofi",
		icon: <IconVinyl />,
	},
	{
		cover: "https://ik.imagekit.io/dailyplace/covers/coffee-shop-2.webm",
		videoID: "h2zkV-l_TbY",
		title: "Coffee shop",
		icon: <IconCoffee />,
	},
	{
		cover: "https://ik.imagekit.io/dailyplace/covers/forest-2.webm",
		videoID: "M0AWBnAv8VE",
		title: "Forest",
		icon: <IconTrees />,
	},
	{
		cover: "https://ik.imagekit.io/dailyplace/covers/fireplace-2.webm",
		videoID: "L_LUpnjgPso",
		title: "Fireplace",
		icon: <IconCampfire />,
	},
	{
		cover: "https://ik.imagekit.io/dailyplace/covers/rain-2.webm",
		videoID: "nDq6TstdEi8",
		title: "Rain",
		icon: <IconCloudRain />,
	},
	{
		cover: "https://ik.imagekit.io/dailyplace/covers/waves-.webm",
		videoID: "Nep1qytq9JM",
		title: "Waves",
		icon: <IconRipple />,
	},
	{
		cover: "https://ik.imagekit.io/dailyplace/covers/vaporwave-2.webm",
		videoID: "zlxXwE0Oop8",
		title: "Vaporwave/Synthwave",
		icon: <IconDeviceSpeaker />,
	},
	{
		cover: "https://ik.imagekit.io/dailyplace/covers/asmr-2.webm",
		videoID: "-SYwOAe6V_4",
		title: "ASMR",
		icon: <IconMicrophone />,
	},
	{
		videoID: "6y5CqAHxGX0",
		title: "City walk",
		icon: <IconWalk />,
	},
	{
		cover: "https://ik.imagekit.io/dailyplace/lofi_girl.jpg",
		videoID: "jfKfPfyJRdk",
		title: "Lofi Girl",
		avatar: true,
	},
	{
		cover: "https://render.fineartamerica.com/images/rendered/default/print/6/8/break/images/artworkimages/medium/3/eminem-miracle-studio.jpg",
		videoID: "wedNGWk-l0A&list=PLElImqcRddY_8l_8Op18r_k1Ptc-2YZiC",
		title: "Hip Hop",
		avatar: true,
	},
];
