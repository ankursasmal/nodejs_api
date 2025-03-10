### **✅ README for Backend Project (Node.js + Express + MySQL)**  

---

## **📌 Project Overview**  
This is a **Node.js + Express.js** backend project using **MySQL** as the database. The project includes:  
- **User input validation**  
- **Database interaction with MySQL**  
- **Environment variables for security**  
- **Proper API structure for CRUD operations**  

---

## **📂 Project Structure**  
```
backend-project/
│── node_modules/        # Installed dependencies  
│── connection/          # Database connection file  
|-- model/               # Database model file  
│── router/              # API route handlers  
│── ddl.sql              # MySQL Database & Table Creation  
│── .env                 # Environment variables (Port, DB credentials)  
│── index.js            # Main Express server  
│── package.json         # Project dependencies  
│── README.md            # Project documentation  
```

---

## **⚙️ Installation & Setup**  

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/backend-project.git
cd nodejs_schoolmanagement
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file inside the project and add the following:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_DATABASE=school_db
```

### **4️⃣ Create MySQL Database & Tables**
Run the SQL script in MySQL:
```sh
mysql -u root -p < ddl.sql
```

OR execute it manually:
```sql
-- ddl.sql (Database & Table Creation)
CREATE DATABASE IF NOT EXISTS school;

USE school;

CREATE TABLE IF NOT EXISTS school_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
 );
```

### **5️⃣ Start the Server**
 
 ```sh
nodemon index.js
```

---

## **🚀 API Endpoints**
| HTTP Method | Endpoint       | Description                    |
|------------|---------------|--------------------------------|
| `POST`     | `/addSchool`   | Add a new school to database  |
| `GET`      | `/listSchool`  | Get all schools sorted by distance |

---

## **📌 Example API Usage**
### **📍 Add a New School**
**POST** `http://localhost:3000/addSchool`  
**Request Body (JSON)**:
```json
{
    "name": "Green Valley School",
    "address": "123 Street, City",
    "latitude": "28.7041",
    "longitude": "77.1025"
}
```
**Response**:
```json
{
    "mess": "Entry Successful on DB",
    "success": true,
    "error": false
}
```
**GET** `http://localhost:3000/listSchool?latitude=23.7041&longitude=75.1025` 
---

## **📌 Common Issues & Fixes**
✅ **Error: "Database query failed"**  
➡️ Solution: Ensure MySQL is running and `.env` credentials are correct.  

✅ **Port Conflict**  
➡️ Solution: Change `PORT` in `.env` file.  

---
 
