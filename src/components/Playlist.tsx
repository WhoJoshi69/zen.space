import { Stack, SimpleGrid } from "@mantine/core";

import { SOUNDS_LIST } from "@/constants/Playlist";

import Music from "./common/Music";
import Title from "./common/Title";

const Playlist = () => {
	return (
		<Stack w="100%" style={{ flex: 1 }}>
			<Title text="Playlist" />
			<SimpleGrid
				cols={{ base: 1, xs: 2, md: 3 }}
				spacing={{ base: 'sm', sm: 'md', md: 'xl' }}
				verticalSpacing="xl"
				style={{ width: '100%' }}
			>
				{SOUNDS_LIST?.map((sound, i) => {
					return (
						<Music
							{...sound}
							key={i}
						/>
					);
				})}
			</SimpleGrid>
		</Stack>
	);
};

export default Playlist;
