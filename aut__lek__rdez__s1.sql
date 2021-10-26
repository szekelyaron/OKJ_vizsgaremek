-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2021. Okt 26. 14:36
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `autólekérdezés1`
--

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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasználó`
--

CREATE TABLE `felhasználó` (
  `FID` int(11) NOT NULL,
  `Felhasználónév` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Jelszó` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Email` varchar(40) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gumiabroncs`
--

CREATE TABLE `gumiabroncs` (
  `GID` int(11) NOT NULL,
  `Gyártó` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Évszak` set('Nyári','Téli','Négyévszakos','') COLLATE utf8_hungarian_ci NOT NULL,
  `Kategória` decimal(2,0) NOT NULL,
  `Ár` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
  ADD PRIMARY KEY (`AID`);

--
-- A tábla indexei `felhasználó`
--
ALTER TABLE `felhasználó`
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
  ADD PRIMARY KEY (`IID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `autó`
--
ALTER TABLE `autó`
  MODIFY `AID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasználó`
--
ALTER TABLE `felhasználó`
  MODIFY `FID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `gumiabroncs`
--
ALTER TABLE `gumiabroncs`
  MODIFY `GID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `info`
--
ALTER TABLE `info`
  MODIFY `IID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
