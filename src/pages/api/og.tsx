import { ImageResponse } from "@vercel/og";
import { Loader } from "@mantine/core";

export default function handler(request: any) {
	try {
		const { searchParams } = new URL(request.url);

		// ?title=<title>
		const hasTitle = searchParams.has("title");
		const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "zen.space";

		return new ImageResponse(
			(
				<div
					style={{
						backgroundColor: "white",
						backgroundSize: "150px 150px",
						height: "100%",
						width: "100%",
						display: "flex",
						textAlign: "center",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						flexWrap: "nowrap",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							justifyItems: "center",
						}}
					>
						<Loader size={200} />
					</div>
					<div
						style={{
							fontSize: 60,
							fontStyle: "normal",
							letterSpacing: "-0.025em",
							color: "black",
							marginTop: 30,
							padding: "0 120px",
							lineHeight: 1.4,
							whiteSpace: "pre-wrap",
						}}
					>
						{title}
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
			}
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}
