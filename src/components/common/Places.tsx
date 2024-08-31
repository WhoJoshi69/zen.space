import { Menu } from "@mantine/core";
import { IconBookmarks, IconBookmarkOff } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Action from "./Action";

const Places = ({ items, setItems, name }) => {
	const router = useRouter();

	const removePlace = () => {
		const temporal_places = [...items];
		const idx = router?.query?.idx;
		console.log(idx);
		temporal_places.splice(Number(idx), 1);

		setItems(temporal_places?.toString());
		router?.push("/");
	};

	if (!items?.length) return null;

	return (
		<Menu
			shadow="md"
			width={200}
			withArrow
		>
			<Menu.Target>
				<div
					style={{
						position: "relative",
					}}
				>
					<Action aria-label="Saved places">
						<IconBookmarks size={18} />
					</Action>
				</div>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>My places</Menu.Label>
				{Boolean(items?.length) &&
					items?.map((place: string, index: number) => (
						<Link
							href={{
								pathname: `/${place}`,
								query: { idx: index },
							}}
							passHref
							legacyBehavior
							key={index}
							as={`/${place}`}
						>
							<Menu.Item
								component="a"
								icon={
									<Image
										alt="Place avatar"
										width="18"
										height="18"
										// eslint-disable-next-line max-len
										src={`https://api.dicebear.com/9.x/glass/svg?seed=${place}&radius=50&backgroundColor=F9A88B,F78B64,F56D3B,E9470C,AF3509`}
									/>
								}
							>
								{place}
							</Menu.Item>
						</Link>
					))}

				{name && (
					<>
						<Menu.Divider />
						<Menu.Label>Danger zone</Menu.Label>
						<Menu.Item
							onClick={removePlace}
							data-splitbee-event="Place deleted"
							color="red"
							py={4}
							rightSection={
								<Action
									aria-label="Delete place"
									color="red"
								>
									<IconBookmarkOff size={16} />
								</Action>
							}
						>
							Delete this place
						</Menu.Item>
					</>
				)}
			</Menu.Dropdown>
		</Menu>
	);
};

export default Places;
