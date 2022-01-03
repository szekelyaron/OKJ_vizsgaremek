-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Jan 03. 09:55
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
CREATE DATABASE IF NOT EXISTS `autók5` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `autók5`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `autó`
--

CREATE TABLE `autó` (
  `AID` int(10) NOT NULL,
  `Gyártó` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `Típus` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `Megbízhatóság` int(11) NOT NULL,
  `Típushiba` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `autó`
--

INSERT INTO `autó` (`AID`, `Gyártó`, `Típus`, `Megbízhatóság`, `Típushiba`) VALUES
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
-- Tábla szerkezet ehhez a táblához `felhasználó`
--

CREATE TABLE `felhasználó` (
  `FID` int(11) NOT NULL,
  `Felhasználónév` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Jelszó` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `Email` varchar(40) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasználó`
--

INSERT INTO `felhasználó` (`FID`, `Felhasználónév`, `Jelszó`, `Email`) VALUES
(1, 'Pusoma Gergő', 'eztkinemtalalod', 'pusomagergo@gmail.com'),
(2, 'AutóNepper', '1234567890', 'neppervagyok@gmail.com'),
(3, 'TigerHero', '123', 'aronvok@gmail.com'),
(4, 'Dromarci', 'Virág4ever', 'takacsmarci@gmail.com'),
(5, 'DaweDie', 'TaKa', 'dawedie@gmail.com');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gumiabroncs`
--

CREATE TABLE `gumiabroncs` (
  `GID` int(11) NOT NULL,
  `Gyártó` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Évszak` set('Nyári','Téli','Négyévszakos','') COLLATE utf8_hungarian_ci NOT NULL,
  `Kategória` decimal(2,0) NOT NULL,
  `Ár` int(6) NOT NULL,
  `Info_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `gumiabroncs`
--

INSERT INTO `gumiabroncs` (`GID`, `Gyártó`, `Évszak`, `Kategória`, `Ár`, `Info_ID`) VALUES
(2, 'Michelin', 'Nyári', '7', 29000, 1),
(3, 'Hankook', 'Téli', '6', 25000, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `info`
--

CREATE TABLE `info` (
  `IID` int(11) NOT NULL,
  `Rendszám` varchar(10) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Alvázszám` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Futott km` int(11) NOT NULL,
  `Évjárat` year(4) NOT NULL,
  `Állapot` set('Újszerű','Használt','Enyhén sérült','Frissen felújított','Sérült') COLLATE utf8_hungarian_ci NOT NULL,
  `VezetettSzervK` tinyint(1) NOT NULL,
  `Okmányok` set('Érvényes magyar okmányokkal','Lejárt magyar okmányokkal','Külföldi okmányokkal','Okmányok nélkül') COLLATE utf8_hungarian_ci NOT NULL,
  `Műszaki érv` date NOT NULL,
  `Gumiabroncs` set('Nyári','Téli','Négyévszakos','') COLLATE utf8_hungarian_ci NOT NULL,
  `Autó_AID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `info`
--

INSERT INTO `info` (`IID`, `Rendszám`, `Alvázszám`, `Futott km`, `Évjárat`, `Állapot`, `VezetettSzervK`, `Okmányok`, `Műszaki érv`, `Gumiabroncs`, `Autó_AID`) VALUES
(1, 'RPL-916', 'FZfrrg248467', 35000, 2019, 'Újszerű', 1, 'Érvényes magyar okmányokkal', '2022-09-10', 'Téli', 1),
(2, 'SGA-030', 'FZfrefs4748467', 145000, 2005, 'Használt', 0, 'Érvényes magyar okmányokkal', '2023-03-10', 'Nyári', 14);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosár`
--

CREATE TABLE `kosár` (
  `Felhasznalo_fid` int(11) NOT NULL,
  `Gumiabroncs_gid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `autó`
--
ALTER TABLE `autó`
  ADD PRIMARY KEY (`AID`),
  ADD UNIQUE KEY `Típus` (`Típus`);

--
-- A tábla indexei `felhasználó`
--
ALTER TABLE `felhasználó`
  ADD PRIMARY KEY (`FID`);

--
-- A tábla indexei `gumiabroncs`
--
ALTER TABLE `gumiabroncs`
  ADD PRIMARY KEY (`GID`),
  ADD UNIQUE KEY `Info_ID` (`Info_ID`);

--
-- A tábla indexei `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`IID`),
  ADD UNIQUE KEY `Autó_AID` (`Autó_AID`);

--
-- A tábla indexei `kosár`
--
ALTER TABLE `kosár`
  ADD UNIQUE KEY `Felhasznalo_fid` (`Felhasznalo_fid`),
  ADD UNIQUE KEY `Gumiabroncs_gid` (`Gumiabroncs_gid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `autó`
--
ALTER TABLE `autó`
  MODIFY `AID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `felhasználó`
--
ALTER TABLE `felhasználó`
  MODIFY `FID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `gumiabroncs`
--
ALTER TABLE `gumiabroncs`
  MODIFY `GID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `info`
--
ALTER TABLE `info`
  MODIFY `IID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `gumiabroncs`
--
ALTER TABLE `gumiabroncs`
  ADD CONSTRAINT `Gumiabroncs_Info` FOREIGN KEY (`Info_ID`) REFERENCES `info` (`IID`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `info`
--
ALTER TABLE `info`
  ADD CONSTRAINT `Autó_Info` FOREIGN KEY (`Autó_AID`) REFERENCES `autó` (`AID`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `kosár`
--
ALTER TABLE `kosár`
  ADD CONSTRAINT `Felhasználó_Kosár` FOREIGN KEY (`Felhasznalo_fid`) REFERENCES `felhasználó` (`FID`) ON DELETE NO ACTION,
  ADD CONSTRAINT `kosár` FOREIGN KEY (`Gumiabroncs_gid`) REFERENCES `gumiabroncs` (`GID`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
