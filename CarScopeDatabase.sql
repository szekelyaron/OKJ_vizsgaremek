-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Feb 10. 09:20
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `autók5`
--
CREATE DATABASE IF NOT EXISTS `autok6` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `autók5`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `auto`
--

CREATE TABLE `auto` (
  `AID` int(10) NOT NULL,
  `Gyarto` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `Tipus` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `Megbizhatosag` int(11) NOT NULL,
  `Tipshiba` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `auto`
--

INSERT INTO `auto` (`AID`, `Gyarto`, `Tipus`, `Megbizhatosag`, `Tipshiba`) VALUES
(1, 'Honda', 'Civic', 10, 'Ismeretlen'),
(2, 'Volkswagen', 'Golf IV', 9, 'Korrózió'),
(3, 'Volkswagen', 'Passat', 7, 'Főtengely csapágy'),
(4, 'Ford', 'Focus', 5, 'Hengerfej'),
(5, 'Opel', 'Corsa', 6, 'Futómű'),
(6, 'Mazda', '6', 8, 'EGR szelep'),
(14, 'Seat', 'Leon', 9, 'Ismeretlen'),
(21, 'Volkswagen', 'Arteon', 5, 'Led fényszóró meghibásodása'),
(23, 'Volkswagen', 'Beatle', 2, 'Csúnya'),
(24, 'Audi', 'A6', 7, 'Ismeretlen');

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
(1, 'Pusoma Gergő', 'eztkinemtalalod', 'pusomagergo@gmail.com'),
(2, 'AutóNepper', '1234567890', 'neppervagyok@gmail.com'),
(3, 'TigerHero', '123', 'aronvok@gmail.com'),
(4, 'Dromarci', 'Virág4ever', 'takacsmarci@gmail.com'),
(5, 'DaweDie', 'TaKa', 'dawedie@gmail.com'),
(6, 'asdasd', 'c329936d9323991c7e6039f3222082', 'asdasd@asdasd.asd'),
(9, 'Gregoryy022', '2ac5efd7077cb66d640029a6862eb8d9', 'gregoryy@gmail.com'),
(11, 'Admin1122', '9695476e054dcb63b752dc141702ff50', 'admin@admin.com'),
(12, 'Admin112233', 'f7c6eeeb40882248ed771565f180382d', 'admin@admin.admin');

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
(15, 'Pirelli Scorpion A/T Plus', 'Négyévszakos', '5', 34990, 18, 55, 215);

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
  `Allapot` set('Újszerű','Használt','Enyhén sérült','Frissen felújított','Sérült') COLLATE utf8_hungarian_ci NOT NULL,
  `VezetettSzervK` tinyint(1) NOT NULL,
  `Okmanyok` set('Érvényes magyar okmányokkal','Lejárt magyar okmányokkal','Külföldi okmányokkal','Okmányok nélkül') COLLATE utf8_hungarian_ci NOT NULL,
  `Muszakierv` date NOT NULL,
  `Gumiabroncs` set('Nyári','Téli','Négyévszakos','') COLLATE utf8_hungarian_ci NOT NULL,
  `Auto_AID` int(11) NOT NULL,
  `Kepcim` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `info`
--

INSERT INTO `info` (`IID`, `Rendszam`, `Alvazszam`, `Futottkm`, `Evjarat`, `Allapot`, `VezetettSzervK`, `Okmanyok`, `Muszakierv`, `Gumiabroncs`, `Auto_AID`, `Kepcim`) VALUES
(1, 'RPL-916', 'PRB12345678901234', 35000, 2019, 'Újszerű', 1, 'Érvényes magyar okmányokkal', '2022-09-10', 'Téli', 1, 'https://th.bing.com/th/id/OIP.mfGojkzSsAvX-qOiXZy9nwHaEK?pid=ImgDet&rs=1'),
(2, 'SGA-030', 'FZ123456789123456', 145000, 2005, 'Használt', 0, 'Érvényes magyar okmányokkal', '2023-03-10', 'Nyári', 14, 'https://i3.infocar.ua/img/bazar2/733/732349/5581219_3.jpg'),
(3, 'HKR-115', '2147grgrf47845741', 451200, 2001, 'Használt', 0, 'Érvényes magyar okmányokkal', '2023-02-09', 'Négyévszakos', 5, 'https://auto-database.com/image/opel-corsa-c-2001-pictures-116229.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosar`
--

CREATE TABLE `kosar` (
  `Felhasznalo_fid` int(11) NOT NULL,
  `Gumiabroncs_gid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
  ADD UNIQUE KEY `Autó_AID` (`Auto_AID`);

--
-- A tábla indexei `kosar`
--
ALTER TABLE `kosar`
  ADD UNIQUE KEY `Felhasznalo_fid` (`Felhasznalo_fid`),
  ADD UNIQUE KEY `Gumiabroncs_gid` (`Gumiabroncs_gid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `auto`
--
ALTER TABLE `auto`
  MODIFY `AID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `FID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `gumiabroncs`
--
ALTER TABLE `gumiabroncs`
  MODIFY `GID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `info`
--
ALTER TABLE `info`
  MODIFY `IID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `info`
--
ALTER TABLE `info`
  ADD CONSTRAINT `Autó_Info` FOREIGN KEY (`Auto_AID`) REFERENCES `auto` (`AID`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `kosar`
--
ALTER TABLE `kosar`
  ADD CONSTRAINT `Felhasználó_Kosár` FOREIGN KEY (`Felhasznalo_fid`) REFERENCES `felhasznalo` (`FID`) ON DELETE NO ACTION,
  ADD CONSTRAINT `kosár` FOREIGN KEY (`Gumiabroncs_gid`) REFERENCES `gumiabroncs` (`GID`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
