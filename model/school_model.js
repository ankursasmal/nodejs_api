const connection = require('../connection/connections');
 
// Define table schema
const school = `
CREATE TABLE IF NOT EXISTS school_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(100),
    latitude  float ,
    longitude float

);
`;
 
// Create the table
connection.query(school, (err, results) => {
    if (err) {
        console.error('Error creating User table:', err);
    } else {
        console.log('User table created successfully:', results);
    }
});

module.exports = school;
