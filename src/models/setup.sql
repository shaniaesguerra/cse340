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
    project_id      INT PRIMARY KEY,
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
INSERT INTO ServiceProject (project_id, organization_id, title, description, location, date)
VALUES
(11, 1, 'Community Playground Renovation',
 'Renovating an aging community playground with new equipment and safety features.',
 'Leduc, AB',
 '2026-04-12'),

(12, 1, 'Accessible Ramp Construction',
 'Building wheelchair-accessible ramps for a local community center.',
 'Edmonton, AB',
 '2026-05-03'),

(13, 1, 'Neighborhood Clean-Up Stations',
 'Installing permanent waste and recycling stations in high-traffic areas.',
 'Leduc, AB',
 '2026-06-18'),

(14, 1, 'Sustainable Bus Stop Shelters',
 'Constructing eco-friendly bus stop shelters using recycled materials.',
 'Calgary, AB',
 '2026-07-09'),

(15, 1, 'Community Garden Tool Shed Build',
 'Designing and building a secure tool shed for a local community garden.',
 'Red Deer, AB',
 '2026-08-21');

 -- Organization: Green Harvest Growers (organization_id = 2)
 INSERT INTO ServiceProject (project_id, organization_id, title, description, location, date)
VALUES
(21, 2, 'Urban Garden Expansion',
 'Expanding an existing urban garden to include more raised beds and composting areas.',
 'Edmonton, AB',
 '2026-04-20'),

(22, 2, 'Youth Agriculture Workshop',
 'Hosting an educational workshop teaching youth about sustainable farming practices.',
 'Leduc, AB',
 '2026-05-14'),

(23, 2, 'Pollinator Habitat Planting',
 'Planting native flowers to support bees and other pollinators.',
 'Spruce Grove, AB',
 '2026-06-02'),

(24, 2, 'Rainwater Harvesting System Install',
 'Installing a rainwater collection system for irrigation at a community greenhouse.',
 'St. Albert, AB',
 '2026-07-16'),

(25, 2, 'Food Security Harvest Drive',
 'Coordinating volunteers to harvest and distribute produce to local food banks.',
 'Edmonton, AB',
 '2026-08-28');

-- Organization: UnityServe Volunteers (organization_id = 3)
INSERT INTO ServiceProject (project_id, organization_id, title, description, location, date)
VALUES
(31, 3, 'Senior Support Visit Day',
 'Organizing volunteers to visit seniors for conversation, errands, and light chores.',
 'Leduc, AB',
 '2026-04-08'),

(32, 3, 'Charity Clothing Sort',
 'Sorting and preparing donated clothing for distribution to shelters.',
 'Edmonton, AB',
 '2026-05-01'),

(33, 3, 'Community Meal Prep',
 'Preparing and serving meals for families in need at a local community kitchen.',
 'Edmonton, AB',
 '2026-06-11'),

(34, 3, 'Park Beautification Event',
 'Coordinating volunteers to plant flowers and clean up a local park.',
 'Leduc, AB',
 '2026-07-05'),

(35, 3, 'Back-to-School Supply Drive',
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
(11, 3),
(11, 8),
(11, 13),
-- Accessible Ramp Construction
(12, 3),
(12, 4),
(12, 9),
(12, 5),
-- Neighborhood Clean-Up Stations
(13, 1),
(13, 3),
(13, 7),
(13, 8),
-- Sustainable Bus Stop Shelters
(14, 1),
(14, 3),
(14, 12),
(14, 5),
-- Community Garden Tool Shed Build
(15, 1),
(15, 3),
(15, 6),
(15, 5),
-- Urban Garden Expansion
(21, 1),
(21, 3),
(21, 6),
(21, 12),
-- Youth Agriculture Workshop
(22, 2),
(22, 1),
(22, 14),
(22, 12),
-- Pollinator Habitat Planting
(23, 1),
(23, 7),
(23, 12),
-- Rainwater Harvestin System Install
(24, 1),
(24, 12),
(24, 5),
-- Food Secrity Harvest Drive
(25, 3),
(25, 4),
(25, 6),
(25, 15),
--Senior Support Visit Day
(31, 3),
(31, 4),
(31, 10),
-- Charity Clothing Sort 
(32, 3),
(32, 15),
(32, 11),
-- Community Meal Prep
(33, 3),
(33, 4),
(33, 16),
-- Park Beautification Event
(34, 1),
(34, 3),
(34, 8),
(34, 7),
-- Back-to-School Supply Drive
(35, 2),
(35, 3),
(35, 14),
(35, 15);

SELECT * FROM ServiceProject_Category;

-- SELECT c.category_name, sp.title
-- FROM Category AS c
-- INNER JOIN ServiceProject_Category AS spc
-- ON c.category_id = spc.category_id
-- INNER JOIN ServiceProject AS sp
-- ON spc.project_id = sp.project_id