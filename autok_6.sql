-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Feb 06. 17:24
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
-- Adatbázis: `autók5`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `info`
--

CREATE TABLE `info` (
  `IID` int(11) NOT NULL,
  `Kepcim` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Rendszam` varchar(10) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Alvazszam` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Futottkm` int(11) NOT NULL,
  `Evjarat` year(4) NOT NULL,
  `Allapot` set('Újszerű','Használt','Enyhén sérült','Frissen felújított','Sérült') COLLATE utf8_hungarian_ci NOT NULL,
  `VezetettSzervK` tinyint(1) NOT NULL,
  `Okmanyok` set('Érvényes magyar okmányokkal','Lejárt magyar okmányokkal','Külföldi okmányokkal','Okmányok nélkül') COLLATE utf8_hungarian_ci NOT NULL,
  `Muszakierv` date NOT NULL,
  `Gumiabroncs` set('Nyári','Téli','Négyévszakos','') COLLATE utf8_hungarian_ci NOT NULL,
  `Auto_AID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `info`
--

INSERT INTO `info` (`IID`, `Kepcim`, `Rendszam`, `Alvazszam`, `Futottkm`, `Evjarat`, `Allapot`, `VezetettSzervK`, `Okmanyok`, `Muszakierv`, `Gumiabroncs`, `Auto_AID`) VALUES
(1, NULL, 'RPL-916', 'FZfrrg248467', 35000, 2019, 'Újszerű', 1, 'Érvényes magyar okmányokkal', '2022-09-10', 'Téli', 1),
(2, 'https://ls1tech.com/wp-content/uploads/2018/07/LS1-Mustang-01-e1531346489262.jpg', 'SGA-030', 'FZfrefs4748467', 145000, 2005, 'Használt', 0, 'Érvényes magyar okmányokkal', '2023-03-10', 'Nyári', 14);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`IID`),
  ADD UNIQUE KEY `Autó_AID` (`Auto_AID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `info`
--
ALTER TABLE `info`
  MODIFY `IID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `info`
--
ALTER TABLE `info`
  ADD CONSTRAINT `Autó_Info` FOREIGN KEY (`Auto_AID`) REFERENCES `auto` (`AID`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
