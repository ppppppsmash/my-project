CREATE TABLE pagespeedinsights.user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  loginedAt VARCHAR(255)
);

CREATE TABLE pagespeedinsights.site_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  device ENUM('desktop', 'mobile'),
  name VARCHAR(50),
  url VARCHAR(50),
  schedule VARCHAR(10),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES pagespeedinsights.user(id)
);

CREATE TABLE pagespeedinsights.site_metrics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  url VARCHAR(50),
  site_list_id INT,
  score INT,
  lcp VARCHAR(50),
  tti VARCHAR(50),
  cls VARCHAR(50),
  fcp VARCHAR(50),
  tbt VARCHAR(50),
  si VARCHAR(50),
  user_fcp INT,
  user_lcp INT,
  user_fid INT,
  user_cls INT,
  user_inp INT,
  user_ttfb INT,
  FOREIGN KEY (site_list_id) REFERENCES pagespeedinsights.site_list(id),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE pagespeedinsights.user_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255) NOT NULL,
  site_name VARCHAR(50),
  site_url VARCHAR(50),
  device VARCHAR(50),
  action_date DATETIME DEFAULT CURRENT_TIMESTAMP
);