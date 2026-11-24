-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2026 at 03:37 PM
-- Server version: 10.11.16-MariaDB
-- PHP Version: 8.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tscrdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) NOT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `prix_total` double NOT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `vehicule_id` bigint(20) DEFAULT NULL,
  `agence_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `client_id`, `date_debut`, `date_fin`, `prix_total`, `statut`, `vehicule_id`, `agence_id`) VALUES
(1, 21, '2026-11-22', '2026-11-23', 300, 'REFUSEE', 9, 12),
(2, 21, '2026-11-04', '2026-11-25', 6300, 'REFUSEE', 9, 12),
(3, 21, '2026-11-24', '2026-11-25', 252, 'ACCEPTEE', 8, 12),
(4, 21, '2026-11-07', '2026-12-03', 7800, 'ACCEPTEE', 9, 12),
(5, 21, '2026-11-23', '2026-12-02', 1080, 'ACCEPTEE', 14, 12);

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `role` varchar(31) NOT NULL,
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `nom_agence` varchar(255) DEFAULT NULL,
  `site_web` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `numero_permis` varchar(255) DEFAULT NULL
) ;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`role`, `id`, `email`, `mot_de_passe`, `nom`, `prenom`, `telephone`, `nom_agence`, `site_web`, `ville`, `adresse`, `numero_permis`) VALUES
('CLIENT', 1, 'sami@test.com', '123', 'Sami', 'Tounsi', '98765432', NULL, NULL, NULL, 'Sousse', 'TN-55555'),
('CLIENT', 2, 'ahmed@client.com', '123', 'Ahmed', 'Ben Ali', '22112233', NULL, NULL, NULL, 'Tunis', 'TN-11111'),
('CLIENT', 3, 'sami@client.com', '123', 'Sami', 'Tounsi', '98765432', NULL, NULL, NULL, 'Sousse', 'TN-22222'),
('CLIENT', 4, 'yassine@client.com', '123', 'Yassine', 'Mansour', '55443322', NULL, NULL, NULL, 'Sfax', 'TN-33333'),
('CLIENT', 5, 'balkis@client.com', '123', 'Balkis', 'Test', '22334455', NULL, NULL, NULL, 'Hammamet', 'TN-44444'),
('CLIENT', 6, 'mohamed@client.com', '123', 'Mohamed', 'Ali', '99887766', NULL, NULL, NULL, 'Djerba', 'TN-55555'),
('AGENCE', 12, 'tunisia@rent.com', '123', 'Tunisia Smart', 'Car Rental', '71234567', 'TSCR', 'www.TSCR.tn', 'Tunis', NULL, NULL),
('CLIENT', 21, 'yassine@gmail.com', 'Yassine123', 'Yassine', 'Nefzi', '20410461', NULL, NULL, NULL, 'bizerte', '1234556'),
('CLIENT', 22, 'siwar@gmail.com', 'Siwar123', 'Siwar', 'Khattech', '29324667', NULL, NULL, NULL, 'Toounes', '1234556'),
('CLIENT', 23, 'siwar@gmail.com', 'Siwar123', 'Siwar', 'Khattech', '29324667', NULL, NULL, NULL, 'Toounes', '1234556');

-- --------------------------------------------------------

--
-- Table structure for table `vehicule`
--

CREATE TABLE `vehicule` (
  `id` bigint(20) NOT NULL,
  `carburant` varchar(255) DEFAULT NULL,
  `immatriculation` varchar(255) DEFAULT NULL,
  `marque` varchar(255) DEFAULT NULL,
  `modele` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `prix_par_jour` double NOT NULL,
  `reduction` int(11) NOT NULL,
  `transmission` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `agence_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicule`
--

INSERT INTO `vehicule` (`id`, `carburant`, `immatriculation`, `marque`, `modele`, `photo_url`, `prix_par_jour`, `reduction`, `transmission`, `ville`, `agence_id`) VALUES
(7, 'Diesel', '100 Tunisie 4521', 'Audi', 'A4', 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&q=80', 250, 0, 'Automatique', 'Tunis', 12),
(8, 'Essence', '150 Tunisie 8820', 'BMW', 'Série 3', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', 280, 10, 'Automatique', 'Sousse', 12),
(9, 'Diesel', '200 Tunisie 1045', 'Mercedes', 'CLA', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', 300, 0, 'Automatique', 'Tunis', 12),
(10, 'Essence', '120 Tunisie 7745', 'Volkswagen', 'Golf 8 GTI', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80', 200, 15, 'Automatique', 'Hammamet', 12),
(11, 'Hybride', '240 Tunisie 3321', 'Land Rover', 'Evoque', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80', 350, 0, 'Automatique', 'Djerba', 12),
(12, 'Diesel', '180 Tunisie 5599', 'Peugeot', '3008', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80', 180, 0, 'Automatique', 'Tunis', 12),
(13, 'Essence', '50 Tunisie 1200', 'Renault', 'Clio 5', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80', 100, 20, 'Manuelle', 'Sousse', 12),
(14, 'Hybride', '75 Tunisie 9911', 'Toyota', 'Yaris', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80', 120, 0, 'Automatique', 'Sfax', 12),
(15, 'Hybride', '210 Tunisie 6677', 'Volvo', 'XC40', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80', 320, 0, 'Automatique', 'Tunis', 12),
(16, 'Essence', '90 Tunisie 4433', 'Mini', 'Cooper', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80', 220, 5, 'Manuelle', 'Hammamet', 12),
(17, 'Essence', '250 Tunisie 0001', 'Ford', 'Mustang GT', 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&q=80', 450, 0, 'Manuelle', 'Djerba', 12),
(18, 'Hybride', '140 Tunisie 3344', 'Toyota', 'Corolla', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80', 160, 0, 'Automatique', 'Tunis', 12),
(19, 'Essence', '190 Tunisie 8822', 'Kia', 'Sportage', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80', 220, 10, 'Automatique', 'Sousse', 12),
(20, 'Essence', '60 Tunisie 1122', 'Hyundai', 'i20', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80', 110, 0, 'Manuelle', 'Sfax', 12),
(21, 'Essence', '160 Tunisie 5566', 'Honda', 'Civic', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', 190, 0, 'Manuelle', 'Hammamet', 12),
(22, 'Essence', '230 Tunisie 7788', 'Jeep', 'Wrangler', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80', 400, 5, 'Automatique', 'Djerba', 12),
(23, 'Essence', '80 Tunisie 9090', 'Volkswagen', 'Polo', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80', 130, 0, 'Manuelle', 'Tunis', 12),
(24, 'Diesel', '110 Tunisie 2233', 'Seat', 'Leon', 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&q=80', 170, 0, 'Manuelle', 'Sousse', 12),
(25, 'Diesel', '245 Tunisie 4455', 'BMW', 'X5', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', 500, 10, 'Automatique', 'Tunis', 12),
(26, 'Essence', '170 Tunisie 6677', 'Audi', 'Q3', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', 280, 0, 'Automatique', 'Hammamet', 12),
(27, 'Essence', '144 Tunisie 8899', 'Fiat', '500', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80', 90, 0, 'Manuelle', 'Sfax', 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicule`
--
ALTER TABLE `vehicule`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicule`
--
ALTER TABLE `vehicule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
