--src: https://www.gov.pl/web/nck/regionalne-centra-krwiodawstwa-krwiolecznictwa

INSERT INTO blood_center(
	name,
	street_name,
	street_number,
	postal_code,
	city,
	voivodeship,
	geo_coordinates,
	phone_number,
	created_at,
	open_from,
	open_to
)
VALUES
	('RCKiK w Białymstoku', 'Marii Skłodowskiej-Curie', '23', '15-950', 'Białystok', 'Podlaskie', '53.125720409018264, 23.162663039973207', '(85) 744 70 02', now(), null, null),
	('RCKiK w Bydgoszczy', 'Ks. Markwarta', '8', '85-015', 'Bydgoszcz', 'Kujawsko-Pomorskie', '53.12600197045282, 18.011513275085004', '(85) 744 70 02', now(), null, null),
	('RCKiK w Gdańsku', 'J. Hoene-Wrońskiego', '4', '80-210', 'Gdańsk', 'Pomorskie', '54.36571840625166, 18.62905187316372', '(58) 520 40 20', now(), null, null),
	('RCKiK w Kaliszu', 'Kaszubska', '9', '62-800', 'Kalisz', 'Wielkopolskie', '51.77002373547523, 18.103790186835315', '(62) 767 66 63', now(), null, null),
	('RCKiK w Katowicach', 'Raciborska', '15', '40-074', 'Katowice', 'Śląskie', '50.255625254498064, 19.00633501672849', '(32) 208 73 00', now(), null, null),
	('RCKiK w Kielcach', 'Jagiellońska', '66', '25-734', 'Kielce', 'Świętokrzyskie', '50.87321381011972, 20.60532043769406', '(41) 335 94 00', now(), null, null),
	('RCKiK w Krakowie', 'Rzeźnicza', '11',	'31-540', 'Kraków', 'Małopolskie', '50.05615436857477, 19.956278331657803',	'(12) 261 88 20', now(), null, null),
	('RCKiK w Lublinie', 'Żołnierzy Niepodległej', '8',	'20-078', 'Lublin', 'Lubelskie', '51.248720571275555, 22.556421439323845', '(81) 532 62 75', now(), null, null),
	('RCKiK w Łodzi', 'Franciszkańska', '17/25', '91-433', 'Łódź', 'Łódzkie', '51.78219829667664, 19.461455018154265', '(42) 616 14 00', now(), null, null),
	('RCKiK w Olsztynie', 'Malborska', '2',	'10-255', 'Olsztyn', 'Warmińsko-Mazurskie', '53.79350080763895, 20.489940751422434', '(89) 526 01 56', now(), null, null),
	('RCKiK w Opolu', 'Kośnego', '55', '45-372', 'Opole', 'Opolskie', '50.670384050822186, 17.939030592367143', '(77) 441 06 00', now(), null, null),
	('RCKiK w Poznaniu', 'Marcelińska', '44', '60-354', 'Poznań', 'Wielkopolskie', '52.438965617137065, 16.906261882809552', '(61) 886 33 00', now(), null, null),
	('RCKiK w Raciborzu', 'Sienkiewicza', '3A', '47-400', 'Racibórz', 'Śląskie', '50.08804983769188, 18.219642749915984', '(32) 418 15 92', now(), null, null),
	('RCKiK w Radomiu', 'Limanowskiego', '42', '26-600', 'Radom', 'Mazowieckie', '51.397971675384376, 21.137519472665858', '(48) 340 05 20', now(), null, null),
	('RCKiK w Rzeszowie', 'Wierzbowa', '14', '35-310', 'Rzeszów', 'Podkarpackie', '50.03343613039515, 22.015209129180715', '(17) 867 20 30', now(), null, null),
	('RCKiK w Słupsku', 'Szarych Szeregów', '21', '76-200', 'Słupsk', 'Pomorskie', '54.46975824105783, 17.032605419088064',	'(59) 842 20 21', now(), null, null),
	('RCKiK w Szczecinie', 'Wojska Polskiego', '80/82',	'70-482', 'Szczecin', 'Zachodniopomorskie', '53.436674589766376, 14.536681185112636', '(91) 424 36 00', now(), null, null),
	('RCKiK w Wałbrzychu', 'Chrobrego', '31', '58-303', 'Wałbrzych', 'Dolnośląskie', '50.773940746966986, 16.27569357439984', '(74) 664 63 10', now(), null, null),
	('RCKiK w Warszawie', 'Saska', '63/75',	'03-948', 'Warszawa', 'Mazowieckie', '52.232707065012576, 21.059884771644878', '(22) 514 60 00', now(), null, null),
	('RCKiK we Wrocławiu', 'Czerwonego Krzyża', '5-9', '50-345', 'Wrocław', 'Dolnośląskie', '51.116074775960406, 17.06585697092354', '(71) 371 58 10', now(), null, null),
	('RCKiK w Zielonej Górze', 'Zyty', '21', '65-046', 'Zielona Góra', 'Lubuskie', '51.940519833234994, 15.518936816116627', '(68) 329 83 60', now(), null, null);