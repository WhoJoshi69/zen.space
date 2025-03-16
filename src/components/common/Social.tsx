import { Flex, Tooltip } from "@mantine/core";
import { IconBrandGithub, IconBrandX, IconBrandInstagram } from "@tabler/icons-react";

import Action from "./Action";

const Social = () => {
	return (
		<Flex
			align="center"
			gap={10}
		>
			<Tooltip label="Share on X">
				<Action
					component="a"
					target="_blank"
					rel="noopener noreferrer"
					href={`https://x.com/intent/tweet
					?text=Create your perfect space to focus on your daily tasks
					&url=https://zen.space&hashtags=lofi,pomodoro,todo&via=1dailyplace`}
					color="dark"
					variant="subtle"
				>
					<IconBrandX size={18} />
				</Action>
			</Tooltip>

			<Action
				component="a"
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/WhoJoshi69/zen.space"
				variant="subtle"
			>
				<IconBrandGithub size={18} />
			</Action>

			<Action
				component="a"
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.instagram.com/dar_shit_joshi/"
				variant="subtle"
				color="pink"
			>
				<IconBrandInstagram size={18} />
			</Action>
		</Flex>
	);
};

export default Social;
