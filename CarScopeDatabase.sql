-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 27. 14:57
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `autok6`
--
CREATE DATABASE IF NOT EXISTS `autok6` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `autok6`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `auto`
--

CREATE TABLE `auto` (
  `AID` int(10) NOT NULL,
  `Gyarto` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `Tipus` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `Megbizhatosag` int(11) NOT NULL,
  `Tipushiba` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `auto`
--

INSERT INTO `auto` (`AID`, `Gyarto`, `Tipus`, `Megbizhatosag`, `Tipushiba`) VALUES
(1, 'Honda', 'Civic', 10, 'Ismeretlen'),
(2, 'Volkswagen', 'Golf IV', 9, 'Korrózió'),
(3, 'Volkswagen', 'Passat', 7, 'Fotengely csapágy'),
(4, 'Ford', 'Focus', 5, 'Hengerfej'),
(5, 'Opel', 'Corsa', 6, 'Futómu'),
(6, 'Mazda', '6', 8, 'EGR szelep'),
(14, 'Seat', 'Leon', 9, 'Ismeretlen'),
(21, 'Volkswagen', 'Arteon', 5, 'Led fényszóró meghibásodása'),
(23, 'Volkswagen', 'Beatle', 2, 'Csúnya'),
(24, 'Audi', 'A6', 7, 'Ismeretlen'),
(26, 'Audi', 'A3', 8, 'TFSi motoroknál vezérműlánc megnyúlása'),
(27, 'Audi', 'A4', 7, 'TFSi motornál a vezérműlánc megnyúlása'),
(28, 'Ford', 'Mustang', 9, '2.3 Ecoboost motorok nem megbízhatóak'),
(29, 'Ford', 'Mondeo', 5, 'ismeretlen'),
(30, 'SsangYong', 'Rexton', 7, 'Szervízháttér hiánya'),
(31, 'SsangYong', 'Korando', 8, 'Szervizháttér hiánya'),
(32, 'Kia', 'EV6', 10, 'Jelenleg ismeretlen'),
(33, 'Kia', 'Ceed', 7, 'Váltó kulissza kopása'),
(34, 'Audi', '100', 10, 'Adagoló eltömődése'),
(35, 'BMW', 'E36 230i', 7, 'Differenciálmű szimering'),
(36, 'BMW', 'E92 330d', 6, 'EGR szelep eltömődés, gyulladás veszély'),
(37, 'BMW', '5-ös sorozat', 6, 'Ismeretlen');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `FID` int(11) NOT NULL,
  `Felhasználónév` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Jelszó` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `Email` varchar(40) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`FID`, `Felhasználónév`, `Jelszó`, `Email`) VALUES
(11, 'Admin1122', '9695476e054dcb63b752dc141702ff50', 'admin@admin.com'),
(13, 'Proba1122', '6e5a4db2259e8a7779d9679ccea9511e', 'proba@proba.com');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gumiabroncs`
--

CREATE TABLE `gumiabroncs` (
  `GID` int(11) NOT NULL,
  `Gyarto` varchar(150) COLLATE utf8_hungarian_ci NOT NULL,
  `Evszak` set('Nyári','Téli','Négyévszakos','') COLLATE utf8_hungarian_ci NOT NULL,
  `Kategoria` decimal(2,0) NOT NULL,
  `Ar` int(6) NOT NULL,
  `Atmero` int(11) NOT NULL,
  `Oldalfal` int(11) NOT NULL,
  `Szelesseg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `gumiabroncs`
--

INSERT INTO `gumiabroncs` (`GID`, `Gyarto`, `Evszak`, `Kategoria`, `Ar`, `Atmero`, `Oldalfal`, `Szelesseg`) VALUES
(2, 'Michelin Pilot Sport', 'Nyári', '7', 29000, 15, 50, 185),
(3, 'Hankook Prime', 'Téli', '6', 25000, 16, 40, 210),
(10, 'Michelin Alpin 6', 'Téli', '9', 41000, 16, 50, 225),
(11, 'Michelin Pilot Sport 4 S', 'Nyári', '10', 54000, 17, 35, 285),
(12, 'Michelin Pilot Sport', 'Nyári', '9', 48000, 19, 45, 265),
(13, 'Toyo Proxess Sport 1', 'Nyári', '7', 38500, 18, 40, 225),
(14, 'Continental Cross Contact', 'Téli', '6', 29000, 16, 60, 195),
(15, 'Pirelli Scorpion A/T Plus', 'Négyévszakos', '5', 34990, 18, 55, 215),
(16, 'Apollo Alnac 4G', 'Téli', '5', 20940, 15, 55, 195),
(17, 'Apollo Alnac 4G', 'Nyári', '5', 19700, 14, 55, 195),
(18, 'Debica Frigo', 'Nyári', '3', 15080, 13, 50, 185),
(19, 'Debica Frigo', 'Négyévszakos', '3', 18990, 13, 55, 185),
(20, 'Matador Nordicca MP93', 'Nyári', '6', 22590, 15, 55, 195),
(21, 'Barum Polaris Star', 'Téli', '2', 22760, 16, 60, 195),
(22, 'Royal Black Royal Winter', 'Téli', '1', 12000, 13, 80, 145),
(23, 'Aplus Aur', 'Négyévszakos', '3', 17980, 16, 45, 215),
(24, 'WinterPro2 GTRadial', 'Téli', '6', 2450, 16, 65, 215),
(25, 'Hankook w452', 'Négyévszakos', '9', 25990, 17, 70, 195),
(26, 'Toyo Tires Observe XL', 'Nyári', '8', 26520, 18, 55, 225),
(27, 'Falken hs01', 'Téli', '9', 31500, 17, 65, 245),
(28, 'Toyo Proxess Sport', 'Nyári', '10', 41700, 20, 45, 225),
(29, 'Dunlop ALLStar', 'Négyévszakos', '7', 41200, 19, 45, 195),
(30, 'GoodYear Performance+ W', 'Téli', '9', 41790, 19, 55, 255),
(31, 'Kleber Klislap', 'Nyári', '7', 39100, 18, 50, 185);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `info`
--

CREATE TABLE `info` (
  `IID` int(11) NOT NULL,
  `Rendszam` varchar(10) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Alvazszam` varchar(17) COLLATE utf8_hungarian_ci NOT NULL,
  `Futottkm` int(11) NOT NULL,
  `Evjarat` year(4) NOT NULL,
  `Allapot` set('Alig használt','Használt','Enyhén sérült','Frissen felújított','Sérült') COLLATE utf8_hungarian_ci NOT NULL,
  `VezetettSzervK` tinyint(1) NOT NULL,
  `Okmanyok` set('Érvényes magyar okmányokkal','Lejárt magyar okmányokkal','Külföldi okmányokkal','Okmányok nélkül') COLLATE utf8_hungarian_ci NOT NULL,
  `Muszakierv` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `Gumiabroncs` set('Nyári','Téli','Négyévszakos','') COLLATE utf8_hungarian_ci NOT NULL,
  `Auto_AID` int(11) NOT NULL,
  `Kepcim` text COLLATE utf8_hungarian_ci NOT NULL,
  `Torott` set('Sérülésmentes','Apró sérülések','Eleje sérült','Hátulja sérült','Oldala sérült','Súlyosan sérült') COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `info`
--

INSERT INTO `info` (`IID`, `Rendszam`, `Alvazszam`, `Futottkm`, `Evjarat`, `Allapot`, `VezetettSzervK`, `Okmanyok`, `Muszakierv`, `Gumiabroncs`, `Auto_AID`, `Kepcim`, `Torott`) VALUES
(1, 'RPL-916', 'PRB12345678901234', 35000, 2019, '', 1, 'Érvényes magyar okmányokkal', '2022-09-10 00:00:00', 'Téli', 1, 'https://th.bing.com/th/id/OIP.mfGojkzSsAvX-qOiXZy9nwHaEK?pid=ImgDet&rs=1', 'Sérülésmentes'),
(3, 'HKR-115', '2147grgrf47845741', 451200, 2001, 'Használt', 0, 'Érvényes magyar okmányokkal', '2023-02-09 00:00:00', 'Négyévszakos', 5, 'https://auto-database.com/image/opel-corsa-c-2001-pictures-116229.jpg', ''),
(22, 'HUF-314', 'VF1BZ1A0544763416', 460000, 2003, 'Használt', 0, 'Érvényes magyar okmányokkal', '2022-08-12 00:00:00', 'Nyári', 26, 'https://m.atcdn.co.uk/vms/media/%7Bresize%7D/8b47041aaeac4e20a7e8237988f912f0.jpg', 'Sérülésmentes');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`AID`),
  ADD UNIQUE KEY `Típus` (`Tipus`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`FID`);

--
-- A tábla indexei `gumiabroncs`
--
ALTER TABLE `gumiabroncs`
  ADD PRIMARY KEY (`GID`);

--
-- A tábla indexei `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`IID`),
  ADD KEY `Autó_Info` (`Auto_AID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `auto`
--
ALTER TABLE `auto`
  MODIFY `AID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `FID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `gumiabroncs`
--
ALTER TABLE `gumiabroncs`
  MODIFY `GID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT a táblához `info`
--
ALTER TABLE `info`
  MODIFY `IID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `info`
--
ALTER TABLE `info`
  ADD CONSTRAINT `Autó_Info` FOREIGN KEY (`Auto_AID`) REFERENCES `auto` (`AID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
