import { MetaProvider, Title } from "@solidjs/meta";

export default function ContactDetails() {
	return (
		<>
			<MetaProvider>
				<Title>Контакты - Fomina Style</Title>
			</MetaProvider>
			<h1>Наши контакты</h1>
			<p>
				Почта: <a href="mailto:fominakids@mail.ru">fominakids@mail.ru</a>
			</p>
			<p>
				Телеграм:{" "}
				<a href="https://t.me/elen_fomi" target="_blank" rel="noreferrer">
					@elen_fomi
				</a>
			</p>
			<h2>Данные о ИП</h2>
			<p>ИП Фомина Елена Петровна</p>
			<p>ИНН: 425305525990 </p>
			<p>ОГРНИП: 321420500039191</p>
		</>
	);
}
