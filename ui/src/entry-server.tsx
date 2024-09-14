// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="ru">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="alternate icon" href="/favicon.svg" type="image/svg+xml" />
					<meta
						name="description"
						content="Fomina Kids - свободная одежда для всей семьи. Качественная и стильная одежда для мужчин, женщин и детей."
					/>
					<meta
						name="keywords"
						content="одежда, мода, стиль, семейная одежда, Fomina Kids, стиль сафари"
					/>
					{assets}
				</head>
				<body>
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
));
