-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 16, 2024 at 05:59 PM
-- Server version: 5.7.44
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `your_hms`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_list`
--

CREATE TABLE `chat_list` (
  `id` int(11) NOT NULL,
  `to_id` int(255) DEFAULT NULL,
  `message` text,
  `from_id` int(255) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_list`
--

INSERT INTO `chat_list` (`id`, `to_id`, `message`, `from_id`, `datetime`) VALUES
(354, 1, 'Hi', 6, '2024-04-15 01:22:42'),
(355, 2, 'I am fine', 6, '2024-04-15 01:22:55'),
(356, 1, 'Can you see my message?', 6, '2024-04-15 01:23:09'),
(357, 6, 'Great', 2, '2024-04-15 01:27:14'),
(358, 6, 'whatsup', 2, '2024-04-15 01:38:59'),
(359, 2, 'great', 6, '2024-04-15 01:39:24'),
(360, 6, 'ki', 2, '2024-04-15 01:40:04');

-- --------------------------------------------------------

--
-- Table structure for table `tblAppointments`
--

CREATE TABLE `tblAppointments` (
  `AppointmentID` int(10) NOT NULL,
  `PatientID` int(10) DEFAULT NULL,
  `DoctorName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AppointmentDate` date DEFAULT NULL,
  `TimeSlot` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci,
  `Status` enum('Scheduled','Cancelled','Completed') COLLATE utf8mb4_unicode_ci DEFAULT 'Scheduled'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblAppointments`
--

INSERT INTO `tblAppointments` (`AppointmentID`, `PatientID`, `DoctorName`, `AppointmentDate`, `TimeSlot`, `Description`, `Status`) VALUES
(6, 1, 'Dr. Javier Hernandez', '2024-05-06', '01:00 PM', 'I am feeling sick.', 'Scheduled'),
(7, 1, 'Dr. Rachel Patel', '2024-04-13', '09:00 AM', 'This will automatically update past appointments.', 'Cancelled');

-- --------------------------------------------------------

--
-- Table structure for table `tblBlogs`
--

CREATE TABLE `tblBlogs` (
  `BlogID` int(10) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `UserID` int(10) NOT NULL,
  `CreationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblBlogs`
--

INSERT INTO `tblBlogs` (`BlogID`, `Title`, `Content`, `UserID`, `CreationDate`) VALUES
(1, 'First Blog', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus lectus vel nisi tristique, sed cursus odio bibendum. Phasellus id quam sit amet purus dignissim suscipit.', 1, '2024-04-13 18:36:03'),
(2, 'Second Blog', 'Nullam auctor, velit nec maximus aliquam, mauris purus dictum dui, vel egestas libero urna eget orci. Phasellus vel hendrerit lorem, sed sodales mi. Vestibulum finibus ex vel quam egestas, id cursus odio vehicula.', 2, '2024-04-13 18:36:03'),
(3, 'Third Blog', 'Integer malesuada risus sed ligula lacinia, vel tristique nisl suscipit. Integer luctus eget lacus ac fringilla. Donec at malesuada quam, at tempus ipsum.', 3, '2024-04-13 18:36:03'),
(4, 'Fourth Blog', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus accumsan pharetra tellus sit amet tristique. Sed lacinia tellus eu bibendum cursus.', 4, '2024-04-13 18:36:03'),
(10, 'This is my first blog I need Help', 'uihvodhvhdvcxn ,xz', 6, '2024-04-14 19:51:47');

-- --------------------------------------------------------

--
-- Table structure for table `tblComments`
--

CREATE TABLE `tblComments` (
  `CommentID` int(10) NOT NULL,
  `BlogID` int(10) NOT NULL,
  `UserID` int(10) NOT NULL,
  `Comment` text NOT NULL,
  `CommentDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblComments`
--

INSERT INTO `tblComments` (`CommentID`, `BlogID`, `UserID`, `Comment`, `CommentDate`) VALUES
(4, 1, 2, 'Hello', '2024-04-14 08:32:33'),
(5, 1, 3, 'My Comment', '2024-04-14 08:32:58'),
(6, 1, 3, 'My Comment 3', '2024-04-14 08:33:05'),
(10, 1, 1, 'Jsndndnndndjdjdjdjdjjddjdjxjxjjdjdjdjdjfjdjdjdjdudjjdjdudjdududjjdjdjdjdududududjdjdjdxudjjdjfbfbdbebdhdhdndnhdudjejdudhehdhd', '2024-04-15 08:42:47');

-- --------------------------------------------------------

--
-- Table structure for table `tblfacilities`
--

CREATE TABLE `tblfacilities` (
  `FacilityID` int(11) NOT NULL,
  `ICU_Beds` int(11) DEFAULT '0',
  `Normal_Rooms` int(11) DEFAULT '0',
  `Ambulances` int(11) DEFAULT '0',
  `XRay_Rooms` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblfacilities`
--

INSERT INTO `tblfacilities` (`FacilityID`, `ICU_Beds`, `Normal_Rooms`, `Ambulances`, `XRay_Rooms`) VALUES
(6, 15, 100, 32, 50);

-- --------------------------------------------------------

--
-- Table structure for table `tblpersonalrecords`
--

CREATE TABLE `tblpersonalrecords` (
  `UserID` int(10) NOT NULL,
  `BP` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Diabetes` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HeartHealthIssues` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Arthritis` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Allergies` text COLLATE utf8mb4_unicode_ci,
  `OtherIssues` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblpersonalrecords`
--

INSERT INTO `tblpersonalrecords` (`UserID`, `BP`, `Diabetes`, `HeartHealthIssues`, `Arthritis`, `Allergies`, `OtherIssues`) VALUES
(1, '', 'Yes', 'Yes', '', 'Nut', 'Sleepiness');

-- --------------------------------------------------------

--
-- Table structure for table `tblPrescriptions`
--

CREATE TABLE `tblPrescriptions` (
  `prescription_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `medicines` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `prescribedBy` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pharmacist` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblPrescriptions`
--

INSERT INTO `tblPrescriptions` (`prescription_id`, `name`, `medicines`, `prescribedBy`, `pharmacist`, `user_id`) VALUES
(1, 'Prescription 1', '[\"Medicine A\", \"Medicine B\", \"Medicine C\"]', 'Dr. John Doe', 'Mr. Smith', 1),
(2, 'Prescription 2', '[\"Medicine X\", \"Medicine Y\"]', 'Dr. Jane Smith', 'Mr. Johnson', 1),
(3, 'Prescription 3', '[\"Medicine P\", \"Medicine Q\", \"Medicine R\", \"Medicine S\"]', 'Dr. Alice Johnson', 'Mr. Brown', 2),
(4, 'Prescription 4', '[\"Medicine T\"]', 'Dr. Emily White', 'Mr. Wilson', 2),
(5, 'Prescription 5', '[\"Medicine U\", \"Medicine V\", \"Medicine W\"]', 'Dr. David Black', 'Mr. Taylor', 3),
(6, 'Common Cold', '[\"New\",\"New 2\"]', 'Dr shah', 'PharmacistOne Main', 1),
(7, 'Common Cold', '[\"Paracetaom\",\"JOdj\",\"csjcj\"]', 'Dr shah', 'PharmacistOne Main', 1),
(8, 'Common Cold', '[\"Paracetaom\",\"JOdj\",\"csjcj\"]', 'Dr shah', 'PharmacistOne Main', 1),
(9, 'Common Cold', '[\"Paracetaom\",\"JOdj\",\"csjcj\"]', 'Dr shah', 'PharmacistOne Main', 1),
(10, 'Common Cold', '[\"cksnc\"]', 'Dr shah', 'PharmacistOne Main', 1),
(11, 'Common Cold', '[\"cksnc\"]', 'Dr shah', 'PharmacistOne Main', 1),
(12, 'Headache', '[\"Paracetmol\"]', 'Dr Singh', 'PharmacistOne Main', 8);

-- --------------------------------------------------------

--
-- Table structure for table `tblreminders`
--

CREATE TABLE `tblreminders` (
  `reminderID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `reminderName` text COLLATE utf8mb4_unicode_ci,
  `reminderTime` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblreminders`
--

INSERT INTO `tblreminders` (`reminderID`, `userID`, `reminderName`, `reminderTime`) VALUES
(8, 2, 'kg', '08:34:00'),
(18, 6, 'Paracetamol', '01:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--

CREATE TABLE `tblusers` (
  `ID` int(10) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `ContactNumber` bigint(10) DEFAULT NULL,
  `Password` varchar(200) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `UserType` varchar(255) DEFAULT NULL,
  `code` mediumint(50) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblusers`
--

INSERT INTO `tblusers` (`ID`, `FirstName`, `Email`, `ContactNumber`, `Password`, `LastName`, `UserType`, `code`, `status`) VALUES
(1, 'Sample', 'patient@gmail.com', 8320930119, '12345678', 'One', 'Patient', 0, 'verified'),
(2, 'Admin', 'admin@gmail.com', 8320930118, '12345678', 'Shah', 'Admin', 0, 'verified'),
(3, 'HealthAdminOne', 'healthadmin@gmail.com', 8320930113, '12345678', 'One', 'HealthAdminstrator', 0, 'verified'),
(4, 'PharmacistOne', 'pharmacist@gmail.com', 8320930128, '12345678', 'Main', 'Pharmacist', 0, 'verified'),
(6, 'Provider', 'healthcare@mail.com', 8320930110, '12345678', 'Healthcare', 'HealthcareProvider', 0, 'verified'),
(7, 'Provider 1', 'john@example.com', 1234567890, 'password123', 'Doe', 'HealthcareProvider', 0, 'verified'),
(8, 'Vatsal', 'vatsalcshah@gmail.com', 8320930118, '12345678', 'Shah', 'Patient', 0, 'verified');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_list`
--
ALTER TABLE `chat_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblAppointments`
--
ALTER TABLE `tblAppointments`
  ADD PRIMARY KEY (`AppointmentID`),
  ADD KEY `FK_PatientID` (`PatientID`);

--
-- Indexes for table `tblBlogs`
--
ALTER TABLE `tblBlogs`
  ADD PRIMARY KEY (`BlogID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `tblComments`
--
ALTER TABLE `tblComments`
  ADD PRIMARY KEY (`CommentID`),
  ADD KEY `BlogID` (`BlogID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `tblfacilities`
--
ALTER TABLE `tblfacilities`
  ADD PRIMARY KEY (`FacilityID`);

--
-- Indexes for table `tblpersonalrecords`
--
ALTER TABLE `tblpersonalrecords`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `tblPrescriptions`
--
ALTER TABLE `tblPrescriptions`
  ADD PRIMARY KEY (`prescription_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tblreminders`
--
ALTER TABLE `tblreminders`
  ADD PRIMARY KEY (`reminderID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_list`
--
ALTER TABLE `chat_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=361;

--
-- AUTO_INCREMENT for table `tblAppointments`
--
ALTER TABLE `tblAppointments`
  MODIFY `AppointmentID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tblBlogs`
--
ALTER TABLE `tblBlogs`
  MODIFY `BlogID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tblComments`
--
ALTER TABLE `tblComments`
  MODIFY `CommentID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tblfacilities`
--
ALTER TABLE `tblfacilities`
  MODIFY `FacilityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tblPrescriptions`
--
ALTER TABLE `tblPrescriptions`
  MODIFY `prescription_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tblreminders`
--
ALTER TABLE `tblreminders`
  MODIFY `reminderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tblusers`
--
ALTER TABLE `tblusers`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblAppointments`
--
ALTER TABLE `tblAppointments`
  ADD CONSTRAINT `FK_PatientID` FOREIGN KEY (`PatientID`) REFERENCES `tblusers` (`ID`);

--
-- Constraints for table `tblBlogs`
--
ALTER TABLE `tblBlogs`
  ADD CONSTRAINT `tblBlogs_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblusers` (`ID`);

--
-- Constraints for table `tblComments`
--
ALTER TABLE `tblComments`
  ADD CONSTRAINT `tblComments_ibfk_1` FOREIGN KEY (`BlogID`) REFERENCES `tblBlogs` (`BlogID`),
  ADD CONSTRAINT `tblComments_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `tblusers` (`ID`);

--
-- Constraints for table `tblpersonalrecords`
--
ALTER TABLE `tblpersonalrecords`
  ADD CONSTRAINT `tblpersonalrecords_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblusers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblPrescriptions`
--
ALTER TABLE `tblPrescriptions`
  ADD CONSTRAINT `tblPrescriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tblusers` (`ID`);

--
-- Constraints for table `tblreminders`
--
ALTER TABLE `tblreminders`
  ADD CONSTRAINT `tblreminders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `tblusers` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
