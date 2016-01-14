-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               6.0.3-alpha-community - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for transport
CREATE DATABASE IF NOT EXISTS `transport` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `transport`;


-- Dumping structure for table transport.driver_info
CREATE TABLE IF NOT EXISTS `driver_info` (
  `id` varchar(50) NOT NULL,
  `driver_name` varchar(80) NOT NULL,
  `driver_address` longtext NOT NULL,
  `driver_licence_no` varchar(50) NOT NULL,
  `driver_mobile_no` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table transport.driver_info: ~3 rows (approximately)
/*!40000 ALTER TABLE `driver_info` DISABLE KEYS */;
INSERT INTO `driver_info` (`id`, `driver_name`, `driver_address`, `driver_licence_no`, `driver_mobile_no`) VALUES
	('DRV001', 'Ramu', 'test Address', '12313123123TN', '9998887776'),
	('DRV002', 'Muthu', 'asdas', '21312', '123'),
	('DRV003', 'Kumar', 'asdas', '21312', '123');
/*!40000 ALTER TABLE `driver_info` ENABLE KEYS */;


-- Dumping structure for table transport.trips
CREATE TABLE IF NOT EXISTS `trips` (
  `id` varchar(50) NOT NULL,
  `trip_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table transport.trips: ~3 rows (approximately)
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` (`id`, `trip_name`) VALUES
	('TRIP01', 'TRIP01'),
	('TRIP02', 'TRIP02'),
	('TRIP03', 'TRIP03');
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;


-- Dumping structure for table transport.trip_details
CREATE TABLE IF NOT EXISTS `trip_details` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `trip_name` varchar(50) NOT NULL,
  `vehicle_no` varchar(50) NOT NULL,
  `driver_id` varchar(50) NOT NULL,
  `leaving_time` longtext,
  `status` varchar(50) DEFAULT NULL,
  `entering_time` longtext,
  `start_km` bigint(20) DEFAULT NULL,
  `end_km` bigint(20) DEFAULT NULL,
  `total_km` bigint(20) DEFAULT NULL,
  `trip_time` bigint(20) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_trip_details_driver_info` (`driver_id`),
  KEY `FK_trip_details_trips` (`trip_name`),
  KEY `FK_trip_details_vehicle_details` (`vehicle_no`),
  CONSTRAINT `FK_trip_details_driver_info` FOREIGN KEY (`driver_id`) REFERENCES `driver_info` (`id`),
  CONSTRAINT `FK_trip_details_trips` FOREIGN KEY (`trip_name`) REFERENCES `trips` (`id`),
  CONSTRAINT `FK_trip_details_vehicle_details` FOREIGN KEY (`vehicle_no`) REFERENCES `vehicle_details` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

-- Dumping data for table transport.trip_details: ~21 rows (approximately)
/*!40000 ALTER TABLE `trip_details` DISABLE KEYS */;
INSERT INTO `trip_details` (`id`, `trip_name`, `vehicle_no`, `driver_id`, `leaving_time`, `status`, `entering_time`, `start_km`, `end_km`, `total_km`, `trip_time`, `date`) VALUES
	(35, 'TRIP01', '1', 'DRV001', '19:17', NULL, '20:0', 1300, 1500, 200, NULL, '2015-07-06'),
	(36, 'TRIP02', '2', 'DRV001', '19:17', NULL, '5:4', 1500, 1700, 200, NULL, '2015-07-06'),
	(37, 'TRIP01', '1', 'DRV001', '19:17', NULL, '23:14', 1500, 1700, 200, NULL, '2015-07-06'),
	(38, 'TRIP02', '1', 'DRV001', '10:10', NULL, '21:10', 1700, 1800, 100, NULL, '2015-07-06'),
	(39, 'TRIP02', '3', 'DRV003', '5:40', NULL, '6:4', 1800, 1910, 110, NULL, '2015-07-11'),
	(40, 'TRIP01', '1', 'DRV001', '5:8', NULL, '6:5', 1800, 2000, 200, NULL, '2015-07-11'),
	(41, 'TRIP02', '2', 'DRV002', '10:10', NULL, '13:4', 1700, 2100, 400, NULL, '2015-07-11'),
	(42, 'TRIP01', '2', 'DRV002', '11:12', NULL, '8:10', 2100, 2200, 100, NULL, '2015-07-11'),
	(43, 'TRIP01', '2', 'DRV002', '13:10', NULL, '13:8', 2200, 2500, 300, NULL, '2015-07-11'),
	(44, 'TRIP03', '3', 'DRV003', '10:12', NULL, '14:10', 1910, 2000, 90, NULL, '2015-07-11'),
	(49, 'TRIP02', '1', 'DRV001', '7:8', NULL, '12:6', 2000, 2500, 500, NULL, '2015-07-11'),
	(50, 'TRIP01', '3', 'DRV003', '6:16', NULL, '17:14', 2000, 2100, 100, NULL, '2015-07-11'),
	(51, 'TRIP01', '1', 'DRV001', '13:16', NULL, '15:16', 2500, 2600, 100, NULL, '2015-07-11'),
	(52, 'TRIP01', '1', 'DRV001', '22:49', NULL, '22:59', 2600, 2850, 250, NULL, '2015-07-14'),
	(53, 'TRIP01', '2', 'DRV002', '23:3', NULL, '23:5', 2500, 2650, 150, NULL, '2015-07-14'),
	(54, 'TRIP01', '1', 'DRV001', '20:10', NULL, '20:10', 2850, 3000, 150, NULL, '2015-07-16'),
	(55, 'TRIP02', '1', 'DRV001', '20:10', NULL, '20:11', 3000, 3100, 100, NULL, '2015-07-16'),
	(56, 'TRIP02', '2', 'DRV002', '20:11', NULL, '20:11', 2650, 2700, 50, NULL, '2015-07-16'),
	(57, 'TRIP01', '1', 'DRV001', '8:7', NULL, '8:8', 3100, 4000, 900, NULL, '2015-07-17'),
	(58, 'TRIP01', '1', 'DRV001', '21:38', NULL, '21:38', 4000, 4120, 120, NULL, '2015-07-20'),
	(59, 'TRIP01', '2', 'DRV002', '21:38', NULL, '21:38', 2700, 2750, 50, NULL, '2015-07-20');
/*!40000 ALTER TABLE `trip_details` ENABLE KEYS */;


-- Dumping structure for table transport.vehicle_details
CREATE TABLE IF NOT EXISTS `vehicle_details` (
  `id` varchar(50) NOT NULL,
  `vehicle_no` varchar(64) DEFAULT NULL,
  `vehicle_name` varchar(64) DEFAULT NULL,
  `driver_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table transport.vehicle_details: ~3 rows (approximately)
/*!40000 ALTER TABLE `vehicle_details` DISABLE KEYS */;
INSERT INTO `vehicle_details` (`id`, `vehicle_no`, `vehicle_name`, `driver_id`) VALUES
	('1', 'TN-37-AZ-0829', 'BUS', 'DRV001'),
	('2', 'TN-37-AZ-0830', 'VAN', 'DRV002'),
	('3', 'TN-37-AZ-0831', 'TRAVELLER', 'DRV003');
/*!40000 ALTER TABLE `vehicle_details` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
