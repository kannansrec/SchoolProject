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


-- Dumping structure for table transport.fuel_details
CREATE TABLE IF NOT EXISTS `fuel_details` (
  `id` int(11) DEFAULT NULL,
  `fuel_type` varchar(50) DEFAULT NULL,
  `fuel_price` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table transport.fuel_details: ~2 rows (approximately)
/*!40000 ALTER TABLE `fuel_details` DISABLE KEYS */;
INSERT INTO `fuel_details` (`id`, `fuel_type`, `fuel_price`) VALUES
	(1, 'Diesel', 59),
	(2, 'Petrol', 69);
/*!40000 ALTER TABLE `fuel_details` ENABLE KEYS */;


-- Dumping structure for table transport.trips
CREATE TABLE IF NOT EXISTS `trips` (
  `id` varchar(50) NOT NULL,
  `trip_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table transport.trips: ~4 rows (approximately)
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` (`id`, `trip_name`) VALUES
	('Purchase', 'PUR'),
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
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;

-- Dumping data for table transport.trip_details: ~61 rows (approximately)
/*!40000 ALTER TABLE `trip_details` DISABLE KEYS */;
INSERT INTO `trip_details` (`id`, `trip_name`, `vehicle_no`, `driver_id`, `leaving_time`, `status`, `entering_time`, `start_km`, `end_km`, `total_km`, `trip_time`, `date`) VALUES
	(35, 'TRIP01', '01', 'DRV001', '19:17', NULL, '20:0', 1300, 1500, 200, NULL, '2015-07-06'),
	(36, 'TRIP02', '02', 'DRV001', '19:17', NULL, '5:4', 1500, 1700, 200, NULL, '2015-07-06'),
	(37, 'TRIP01', '01', 'DRV001', '19:17', NULL, '23:14', 1500, 1700, 200, NULL, '2015-07-06'),
	(38, 'TRIP02', '01', 'DRV001', '10:10', NULL, '21:10', 1700, 1800, 100, NULL, '2015-07-06'),
	(39, 'TRIP02', '03', 'DRV003', '5:40', NULL, '6:4', 1800, 1910, 110, NULL, '2015-07-11'),
	(40, 'TRIP01', '01', 'DRV001', '5:8', NULL, '6:5', 1800, 2000, 200, NULL, '2015-07-11'),
	(41, 'TRIP02', '02', 'DRV002', '10:10', NULL, '13:4', 1700, 2100, 400, NULL, '2015-07-11'),
	(42, 'TRIP01', '02', 'DRV002', '11:12', NULL, '8:10', 2100, 2200, 100, NULL, '2015-07-11'),
	(43, 'TRIP01', '02', 'DRV002', '13:10', NULL, '13:8', 2200, 2500, 300, NULL, '2015-07-11'),
	(44, 'TRIP03', '03', 'DRV003', '10:12', NULL, '14:10', 1910, 2000, 90, NULL, '2015-07-11'),
	(49, 'TRIP02', '01', 'DRV001', '7:8', NULL, '12:6', 2000, 2500, 500, NULL, '2015-07-11'),
	(50, 'TRIP01', '03', 'DRV003', '6:16', NULL, '17:14', 2000, 2100, 100, NULL, '2015-07-11'),
	(51, 'TRIP01', '01', 'DRV001', '13:16', NULL, '15:16', 2500, 2600, 100, NULL, '2015-07-11'),
	(52, 'TRIP01', '01', 'DRV001', '22:49', NULL, '22:59', 2600, 2850, 250, NULL, '2015-07-14'),
	(53, 'TRIP01', '02', 'DRV002', '23:3', NULL, '23:5', 2500, 2650, 150, NULL, '2015-07-14'),
	(54, 'TRIP01', '01', 'DRV001', '20:10', NULL, '20:10', 2850, 3000, 150, NULL, '2015-07-16'),
	(55, 'TRIP02', '01', 'DRV001', '20:10', NULL, '20:11', 3000, 3100, 100, NULL, '2015-07-16'),
	(56, 'TRIP02', '02', 'DRV002', '20:11', NULL, '20:11', 2650, 2700, 50, NULL, '2015-07-16'),
	(57, 'TRIP01', '01', 'DRV001', '8:7', NULL, '8:8', 3100, 4000, 900, NULL, '2015-07-17'),
	(58, 'TRIP01', '01', 'DRV001', '21:38', NULL, '21:38', 4000, 4120, 120, NULL, '2015-07-20'),
	(59, 'TRIP01', '02', 'DRV002', '21:38', NULL, '21:38', 2700, 2750, 50, NULL, '2015-07-20'),
	(60, 'TRIP01', '01', 'DRV001', '20:33', NULL, NULL, 4120, NULL, NULL, NULL, '2015-07-22'),
	(61, 'TRIP03', '01', 'DRV001', '14:42', NULL, '14:42', 3100, 3200, 100, NULL, '2015-07-31'),
	(62, 'TRIP02', '02', 'DRV002', '14:42', NULL, '4:14', 2750, 3453, 703, NULL, '2015-07-31'),
	(63, 'TRIP01', '01', 'DRV001', '21:57', NULL, '21:59', 3200, 3400, 200, NULL, '2015-07-31'),
	(64, 'TRIP01', '01', 'DRV001', '19:20', NULL, '19:31', 3400, 3500, 100, NULL, '2015-10-12'),
	(65, 'TRIP01', '02', 'DRV002', '19:21', NULL, NULL, 3453, NULL, NULL, NULL, '2015-10-12'),
	(66, 'TRIP01', '01', 'DRV001', '20:40', NULL, NULL, 3500, NULL, NULL, NULL, '2015-10-16'),
	(67, 'TRIP02', '02', 'DRV002', '20:40', NULL, NULL, 2500, NULL, NULL, NULL, '2015-10-16'),
	(68, 'TRIP03', '03', 'DRV003', '20:41', NULL, NULL, 2100, NULL, NULL, NULL, '2015-10-16'),
	(69, 'TRIP01', '01', 'DRV001', '10:6', NULL, '22:34', 23423, 23550, 127, NULL, '2015-10-20'),
	(70, 'TRIP01', '01', 'DRV001', '10:6', NULL, '20:30', 2300, 2400, 100, NULL, '2015-10-20'),
	(71, 'TRIP02', '02', 'DRV002', '23:46', NULL, '23:30', 4500, 4600, 100, NULL, '2015-10-20'),
	(72, 'TRIP02', '01', 'DRV001', '22:1', NULL, '22:4', 2400, 2500, 100, NULL, '2015-10-21'),
	(73, 'TRIP03', '02', 'DRV002', '22:3', NULL, '22:5', 4600, 4670, 70, NULL, '2015-10-21'),
	(74, 'TRIP03', '02', 'DRV002', '22:5', NULL, '22:6', 4670, 4700, 30, NULL, '2015-10-21'),
	(75, 'TRIP02', '01', 'DRV001', '23:15', NULL, NULL, 2500, NULL, NULL, NULL, '2015-10-29'),
	(76, 'TRIP02', '01', 'DRV001', '23:15', NULL, NULL, 2500, NULL, NULL, NULL, '2015-10-29'),
	(77, 'TRIP02', '02', 'DRV002', '0:38', NULL, '0:43', 4700, 4750, 50, NULL, '2015-10-30'),
	(78, 'TRIP03', '02', 'DRV002', '0:44', NULL, NULL, 4750, 4800, NULL, NULL, '2015-10-30'),
	(79, 'TRIP01', '01', 'DRV001', '1:7', NULL, NULL, 1200, NULL, NULL, NULL, '2015-10-30'),
	(80, 'TRIP01', '03', 'DRV003', '9:45', NULL, '9:47', 4800, 4900, 100, NULL, '2015-10-30'),
	(81, 'TRIP02', '03', 'DRV003', '9:48', NULL, '9:52', 4900, 4950, 50, NULL, '2015-10-30'),
	(87, 'TRIP01', '01', 'DRV001', '19:17', NULL, '19:20', 4500, 4550, 50, NULL, '2015-11-04'),
	(88, 'TRIP01', '02', 'DRV002', '19:19', NULL, '9:8', 4800, 5000, 200, NULL, '2015-11-04'),
	(91, 'TRIP02', '01', 'DRV001', '19:23', NULL, '19:23', 4550, 4600, 50, NULL, '2015-11-04'),
	(92, 'TRIP01', '01', 'DRV001', '18:50', NULL, '18:53', 4600, 4650, 50, NULL, '2015-11-06'),
	(93, 'TRIP01', '01', 'DRV001', '18:46', NULL, '18:55', 4650, 4700, 50, NULL, '2015-11-12'),
	(94, 'TRIP02', '01', 'DRV001', '18:55', NULL, '18:56', 4700, 4710, 10, NULL, '2015-11-12'),
	(96, 'TRIP03', '01', 'DRV001', '19:3', NULL, NULL, 4710, 4750, NULL, NULL, '2015-11-12'),
	(97, 'TRIP01', '02', 'DRV002', '19:23', NULL, '19:24', 5000, 5002, 2, NULL, '2015-11-12'),
	(98, 'TRIP01', '03', 'DRV003', '19:25', NULL, '19:25', 4950, 4951, 1, NULL, '2015-11-12'),
	(99, 'TRIP01', '01', 'DRV001', '9:29', NULL, NULL, 4750, 4800, 50, NULL, '2015-11-24'),
	(100, 'TRIP02', '01', 'DRV001', '9:30', NULL, '9:38', 4800, 4850, 50, NULL, '2015-11-24'),
	(102, 'TRIP03', '01', 'DRV001', '9:37', NULL, '9:37', 4800, 4850, 50, NULL, '2015-11-24'),
	(103, 'TRIP01', '01', 'DRV001', '14:51', NULL, '14:57', 4850, 4860, 10, NULL, '2015-12-09'),
	(104, 'TRIP01', '02', 'DRV002', '9:40', NULL, '10:24', 5002, 5003, 1, NULL, '2015-12-09'),
	(105, 'TRIP01', '03', 'DRV003', '17:33', NULL, NULL, 4951, NULL, NULL, NULL, '2015-12-09'),
	(106, 'TRIP01', '01', 'DRV001', '16:27', NULL, NULL, 4860, NULL, NULL, NULL, '2015-12-20'),
	(107, 'TRIP01', '02', 'DRV002', '16:30', NULL, '16:30', 5003, 5150, 147, NULL, '2015-12-20'),
	(108, 'TRIP01', '02', 'DRV002', '15:18', NULL, NULL, 5150, 5250, 100, NULL, '2015-12-28');
/*!40000 ALTER TABLE `trip_details` ENABLE KEYS */;


-- Dumping structure for table transport.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table transport.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `user_email`, `password`, `address`, `user_name`) VALUES
	(1, 'test@gmail.com', '1', 'dasd', 'Thamarai');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;


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
	('01', 'TN-37-AZ-0829', 'BUS', 'DRV001'),
	('02', 'TN-37-AZ-0830', 'VAN', 'DRV002'),
	('03', 'TN-37-AZ-0831', 'TRAVELLER', 'DRV003');
/*!40000 ALTER TABLE `vehicle_details` ENABLE KEYS */;


-- Dumping structure for table transport.vehicle_maintainance
CREATE TABLE IF NOT EXISTS `vehicle_maintainance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `driver_id` varchar(50) DEFAULT NULL,
  `vehicle_no` varchar(50) DEFAULT NULL,
  `maintainance_type` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_km` bigint(20) DEFAULT NULL,
  `end_km` bigint(20) DEFAULT NULL,
  `total_km` bigint(20) DEFAULT NULL,
  `fuel_type` varchar(50) DEFAULT NULL,
  `fuel_quantity` decimal(10,2) DEFAULT NULL,
  `price_per_liter` decimal(10,2) DEFAULT NULL,
  `maintainance_amount` decimal(10,2) DEFAULT NULL,
  `in_time` decimal(10,2) DEFAULT NULL,
  `out_time` decimal(10,2) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_on` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 CHECKSUM=1 ROW_FORMAT=DYNAMIC COMMENT='This table is used to store the vehicle maintainance details';

-- Dumping data for table transport.vehicle_maintainance: ~4 rows (approximately)
/*!40000 ALTER TABLE `vehicle_maintainance` DISABLE KEYS */;
INSERT INTO `vehicle_maintainance` (`id`, `driver_id`, `vehicle_no`, `maintainance_type`, `date`, `start_km`, `end_km`, `total_km`, `fuel_type`, `fuel_quantity`, `price_per_liter`, `maintainance_amount`, `in_time`, `out_time`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
	(1, 'DRV001', '01', 'Fuel', '2015-12-25', 1500, 1800, 300, 'Diesel', 20.00, 59.00, 3234.00, NULL, NULL, '2015-12-25 12:07:57', NULL, NULL, NULL),
	(3, 'DRV001', '01', 'Fuel', '2015-12-28', 1900, 1950, 50, NULL, 2.00, NULL, 118.00, NULL, NULL, NULL, NULL, NULL, NULL),
	(4, 'DRV001', '01', 'Fuel', '2015-12-28', 1950, 2000, 50, NULL, 6.00, 59.00, 354.00, NULL, NULL, NULL, NULL, NULL, NULL),
	(5, 'DRV002', '02', 'Fuel', '2015-12-27', 1300, 1450, 150, 'Diesel', 10.00, 59.00, 590.00, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `vehicle_maintainance` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
