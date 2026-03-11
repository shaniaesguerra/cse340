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
-- Service Project TABLE CREATION
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

 SELECT org.name, sp.title, sp.description, sp.location, sp.date
 FROM Organization as org
 INNER JOIN ServiceProject as sp
 ON org.organization_id = sp.organization_id