-- =======================================
-- ORGANIZATION TABLE CREATION
-- =======================================
DROP TABLE IF EXISTS Organization;
CREATE TABLE Organization(
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT  NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO Organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 
  'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 
  'info@brightfuturebuilders.org', 
  'brightfuture-logo.png'),
  
('GreenHarvest Growers', 
  'An urban farming collective promoting food sustainability and education in local neighborhoods.',
  'contact@greenharvest.org', 
  'greenharvest-logo.png'),
  
('UnityServe Volunteers', 
  'A volunteer coordination group supporting local charities and service initiatives.', 
  'hello@unityserve.org', 
  'unityserve-logo.png');

SELECT * FROM Organization;

-- =======================================
-- SERVICE PROJECT TABLE CREATION
-- =======================================
DROP TABLE IF EXISTS ServiceProject;
CREATE TABLE ServiceProject (
    project_id      SERIAL PRIMARY KEY,
    organization_id  INT NOT NULL,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    location        VARCHAR(255),
    date            DATE,
    CONSTRAINT fk_ServiceProject_Organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- Organization: Bright Future Builders (organization_id = 1)
INSERT INTO ServiceProject (organization_id, title, description, location, date)
VALUES
(1, 'Community Playground Renovation',
 'Renovating an aging community playground with new equipment and safety features.',
 'Leduc, AB',
 '2026-04-12'),

(1, 'Accessible Ramp Construction',
 'Building wheelchair-accessible ramps for a local community center.',
 'Edmonton, AB',
 '2026-05-03'),

(1, 'Neighborhood Clean-Up Stations',
 'Installing permanent waste and recycling stations in high-traffic areas.',
 'Leduc, AB',
 '2026-06-18'),

(1, 'Sustainable Bus Stop Shelters',
 'Constructing eco-friendly bus stop shelters using recycled materials.',
 'Calgary, AB',
 '2026-07-09'),

(1, 'Community Garden Tool Shed Build',
 'Designing and building a secure tool shed for a local community garden.',
 'Red Deer, AB',
 '2026-08-21');

 -- Organization: Green Harvest Growers (organization_id = 2)
 INSERT INTO ServiceProject (organization_id, title, description, location, date)
VALUES
(2, 'Urban Garden Expansion',
 'Expanding an existing urban garden to include more raised beds and composting areas.',
 'Edmonton, AB',
 '2026-04-20'),

(2, 'Youth Agriculture Workshop',
 'Hosting an educational workshop teaching youth about sustainable farming practices.',
 'Leduc, AB',
 '2026-05-14'),

(2, 'Pollinator Habitat Planting',
 'Planting native flowers to support bees and other pollinators.',
 'Spruce Grove, AB',
 '2026-06-02'),

(2, 'Rainwater Harvesting System Install',
 'Installing a rainwater collection system for irrigation at a community greenhouse.',
 'St. Albert, AB',
 '2026-07-16'),

(2, 'Food Security Harvest Drive',
 'Coordinating volunteers to harvest and distribute produce to local food banks.',
 'Edmonton, AB',
 '2026-08-28');

-- Organization: UnityServe Volunteers (organization_id = 3)
INSERT INTO ServiceProject (organization_id, title, description, location, date)
VALUES
(3, 'Senior Support Visit Day',
 'Organizing volunteers to visit seniors for conversation, errands, and light chores.',
 'Leduc, AB',
 '2026-04-08'),

(3, 'Charity Clothing Sort',
 'Sorting and preparing donated clothing for distribution to shelters.',
 'Edmonton, AB',
 '2026-05-01'),

(3, 'Community Meal Prep',
 'Preparing and serving meals for families in need at a local community kitchen.',
 'Edmonton, AB',
 '2026-06-11'),

(3, 'Park Beautification Event',
 'Coordinating volunteers to plant flowers and clean up a local park.',
 'Leduc, AB',
 '2026-07-05'),

(3, 'Back-to-School Supply Drive',
 'Collecting and organizing school supplies for children from low-income families.',
 'Red Deer, AB',
 '2026-08-19');

 SELECT * FROM ServiceProject;

 -- SELECT org.name, sp.title, sp.description, sp.location, sp.date
 -- FROM Organization as org
 -- INNER JOIN ServiceProject as sp
 -- ON org.organization_id = sp.organization_id

-- =======================================
-- CATEGORIES TABLE CREATION
-- =======================================
DROP TABLE IF EXISTS Category;
CREATE TABLE Category (
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(255) NOT NULL
);

INSERT INTO Category (category_name)
VALUES ('Environmental'),
	   ('Educational'),
	   ('Community Service'),
	   ('Health and Wellness'),
	   ('Construction and Infrastructure'),
	   ('Food Security'),
	   ('Environmental Stewardship'),
	   ('Public Spaces Improvement'),
	   ('Accessibility and Inclusion'),
	   ('Support and Care Services'),
	   ('Event and Volunteer Coordination'),
	   ('Sustainability'),
	   ('Community Development'),
	   ('Youth Engagement'),
	   ('Poverty Relief'),
	   ('Nutrition and Healthy Living');

SELECT * FROM Category;
	   
-- =======================================
-- SERVICE PROJECT CATEGORIES TABLE CREATION
-- Junction table ( M:M ) 
-- =======================================
DROP TABLE IF EXISTS ServiceProject_Category;
CREATE TABLE ServiceProject_Category (
	project_id INT NOT NULL,
	category_id INT NOT NULL,
	PRIMARY KEY (project_id, category_id),
	FOREIGN KEY (project_id) REFERENCES ServiceProject(project_id),
	FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

INSERT INTO ServiceProject_Category (project_id, category_id)
VALUES
-- Community Playground Renovation
(1, 3),
(1, 8),
(1, 13),
-- Accessible Ramp Construction
(2, 3),
(2, 4),
(2, 9),
(2, 5),
-- Neighborhood Clean-Up Stations
(3, 1),
(3, 3),
(3, 7),
(3, 8),
-- Sustainable Bus Stop Shelters
(4, 1),
(4, 3),
(4, 12),
(4, 5),
-- Community Garden Tool Shed Build
(5, 1),
(5, 3),
(5, 6),
(5, 5),
-- Urban Garden Expansion
(6, 1),
(6, 3),
(6, 6),
(6, 12),
-- Youth Agriculture Workshop
(7, 2),
(7, 1),
(7, 14),
(7, 12),
-- Pollinator Habitat Planting
(8, 1),
(8, 7),
(8, 12),
-- Rainwater Harvestin System Install
(9, 1),
(9, 12),
(9, 5),
-- Food Secrity Harvest Drive
(10, 3),
(10, 4),
(10, 6),
(10, 15),
--Senior Support Visit Day
(11, 3),
(11, 4),
(11, 10),
-- Charity Clothing Sort 
(12, 3),
(12, 15),
(12, 11),
-- Community Meal Prep
(13, 3),
(13, 4),
(13, 16),
-- Park Beautification Event
(14, 1),
(14, 3),
(14, 8),
(14, 7),
-- Back-to-School Supply Drive
(15, 2),
(15, 3),
(15, 14),
(15, 15);

SELECT * FROM ServiceProject_Category;

SELECT c.category_name, sp.title
FROM Category AS c
INNER JOIN ServiceProject_Category AS spc
ON c.category_id = spc.category_id
INNER JOIN ServiceProject AS sp
ON spc.project_id = sp.project_id

-- =======================================
-- ROLES TABLE CREATION
-- =======================================
DROP TABLE IF EXISTS Roles;
CREATE TABLE Roles (
	role_id SERIAL PRIMARY KEY,
	role_name VARCHAR(50) UNIQUE NOT NULL,
	role_description TEXT
);

INSERT INTO Roles (role_name, role_description)
VALUES
('user', 'Standard user with basic access'),
('admin', 'Administrator with full system access');

SELECT * FROM Roles;

-- =======================================
-- USERS TABLE CREATION
-- =======================================
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	role_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_Users_Roles
		FOREIGN KEY (role_id)
		REFERENCES Roles(role_id)
);

-- Insert test user
INSERT INTO Users(name, email, password_hash, role_id)
VALUES
('test-user', 'test@email.com', 'placehoder_hash', 1);

SELECT * FROM Users;

--Join users and roles to see complete info
SELECT u.user_id, u.name, u.email, r.role_name, r.role_description
FROM Users as u
JOIN Roles as r ON u.role_id = r.role_id;

-- Delete the test user
DELETE FROM Users WHERE email = 'test@email.com';

-- Update a specific user to have admin role
UPDATE users SET role_id = (SELECT role_id FROM roles WHERE role_name = 'admin') WHERE user_id = 1;

-- Verify the update by listing all users and their roles
SELECT users.user_id, users.email, roles.role_name FROM users JOIN roles ON users.role_id = roles.role_id;

-- =======================================
-- USERS PROJECTS TABLE CREATION
-- Junction table ( M:M ) 
-- =======================================
DROP TABLE IF EXISTS Users_ServiceProject;
CREATE TABLE Users_ServiceProject (
	user_id INT NOT NULL,
	project_id INT NOT NULL,
	PRIMARY KEY (project_id, user_id ),
	FOREIGN KEY (user_id ) REFERENCES Users(user_id),
	FOREIGN KEY (project_id) REFERENCES ServiceProject(project_id)
);

SELECT * FROM Users_ServiceProject;