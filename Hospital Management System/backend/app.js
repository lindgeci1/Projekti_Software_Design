const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// Import shared modules
const { getExpirationTime, getExpirationTimeJWT } = require("./adapters/repositories/AuthRepository");

// Import route handlers
const MedicineRoute = require("./routes/MedicineRoutes");
const Emergency_ContactRoute = require("./routes/Emergency_ContactRoutes");
const PatientRoutes = require("./routes/PatientRoutes");
const DepartmentRoutes = require("./routes/DepartmentRoutes");
const InsuranceRoutes = require("./routes/InsuranceRoutes");
const StaffRoutes = require("./routes/StaffRoutes");
const MedicalHistoryRoutes = require("./routes/MedicalHistoryRoutes");
const RoomRoutes = require("./routes/RoomRoutes");
const UserRoutes = require("./routes/UserRoutes");
const RatingRoutes = require("./routes/RatingRoutes");
const DoctorRoutes = require("./routes/DoctorRoutes");
const LoginRoutes = require("./routes/Login");
const RegisterRoutes = require("./routes/Register");
const ReportRoutes = require("./routes/ReportRoutes");
const BillRoutes = require("./routes/BillRoutes");
const VisitRoutes = require("./routes/VisitRoutes");
const PayrollRoutes = require("./routes/PayrollRoutes");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 9004;
    this.middlewares();
    this.routes();
  }

  // Initialize middleware
  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(fileUpload());
  }

  // Initialize routes
  routes() {
    this.app.use("/api", MedicineRoute);
    this.app.use("/api", Emergency_ContactRoute);
    this.app.use("/api", PatientRoutes);
    this.app.use("/api", DepartmentRoutes);
    this.app.use("/api", InsuranceRoutes);
    this.app.use("/api", StaffRoutes);
    this.app.use("/api", MedicalHistoryRoutes);
    this.app.use("/api", RoomRoutes);
    this.app.use("/api", UserRoutes);
    this.app.use("/api", RatingRoutes);
    this.app.use("/api", DoctorRoutes);
    this.app.use("/api", LoginRoutes);
    this.app.use("/api", RegisterRoutes);
    this.app.use("/api", BillRoutes);
    this.app.use("/api", ReportRoutes);
    this.app.use("/api", VisitRoutes);
    this.app.use("/api", PayrollRoutes);

    this.tokenRoutes();
  }

  // Define token-related routes
  tokenRoutes() {
    this.app.get("/api/expiration", (req, res) => {
      const expirationTime = getExpirationTime();
      if (!expirationTime) {
        return res.status(200).json({
          message: "Refresh token is expired or not set",
          expirationTime: null,
        });
      }
      res.status(200).json({
        message: "Refresh token is active",
        expirationTime: new Date(expirationTime).toLocaleString(),
      });
    });

    this.app.get("/api/expiration-jwt", (req, res) => {
      const expirationTime = getExpirationTimeJWT();
      if (!expirationTime) {
        return res.status(200).json({
          message: "JWT token is expired or not set",
          expirationTime: null,
        });
      }
      res.status(200).json({
        message: "JWT token is active",
        expirationTime: new Date(expirationTime).toLocaleString(),
      });
    });
  }

  // Start the server
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

// Initialize and start the server
const server = new Server();
server.start();

module.exports = server;
