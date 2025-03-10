const express = require('express');
const router = express.Router();
 const connection = require('../connection/connections');

router.get('/', (req, res) => {
    res.json({
        mess: 'data'
    });
});

// add schools
router.post('/addSchool', async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validate all required fields
        if (!name || !address || latitude == null || longitude == null) {
            return res.status(400).json({ 
                mess: 'All fields are required', 
                success: false, 
                error: true 
            });
        }

        

        //  if the school already exists in the database
        connection.query(`SELECT * FROM school_data WHERE name = ?`, [name], (err, results) => {
            if (err) {
                console.error("database  error:", err.message);
                return res.status(500).json({ 
                    mess: 'Database query failed', 
                    success: false, 
                    error: true 
                });
            }

            //   school already exist chack
            if (results.length > 0) {
                return res.status(400).json({ 
                    mess: 'Already registered', 
                    success: false, 
                    error: true 
                });
            }

            //   exists, insert the new school
            let sql = `INSERT INTO school_data (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;

            connection.query(sql, [name, address, latitude, longitude], (err, result) => {
                if (err) {
                    console.error("Insert Query Error:", err.message);
                    return res.status(500).json({ 
                        mess: 'Entry Not Successful on DB', 
                        success: false, 
                        error: true 
                    });
                }

                res.status(201).json({ 
                    mess: 'Entry Successful on DB', 
                    success: true, 
                    error: false, 
                    result 
                });
            });
        });

    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ 
            mess: 'Internal server error', 
            success: false, 
            error: true 
        });
    }
});


 
// Function to calculate distance using Haversine formula
function distancees(lat1, lon1, lat2, lon2) {
    const toRadians = (deg) => (deg * Math.PI) / 180;
    const R = 6371; // Earth radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

// fetch and sort schools by distanc
router.get('/listSchool', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validate user location input
        if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ 
                mess: 'Latitude and Longitude are required and must be valid numbers',
                success: false,
                error: true 
            });
        }

         const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        let sql = `SELECT * FROM school_data`;

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ 
                    mess: 'Database query failed', 
                    success: false, 
                    error: true 
                });
            }

            // Calculate distance for each school and sort by proximity
            const sortedSchools = results?.map(school => ({
                ...school,
                distance: distancees(userLat, userLon, school?.latitude, school?.longitude)
            })).sort((a, b) => a.distance - b.distance);

            res.status(200).json({ 
                mess: 'Schools fetched successfully', 
                success: true, 
                error: false, 
                schools: sortedSchools 
            });
        });

    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ 
            mess: 'Internal server error', 
            success: false, 
            error: true 
        });
    }
});

 

 

module.exports = router;