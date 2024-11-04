const express = require("express");
const RoomController = require("../adapters/controllers/RoomController"); // Update the path if necessary
const { authenticateToken } = require('../middleware/authMiddleware');

class RoomRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/room", authenticateToken(['admin', 'doctor', 'patient']), RoomController.findAllRooms.bind(RoomController));
        this.router.get("/room/:id", authenticateToken(['admin', 'doctor', 'patient']), RoomController.findSingleRoom.bind(RoomController));
        this.router.post("/room/create", authenticateToken(['admin', 'doctor']), RoomController.addRoom.bind(RoomController));
        this.router.put("/room/update/:id", authenticateToken(['admin', 'doctor']), RoomController.updateRoom.bind(RoomController));
        this.router.delete("/room/delete/:id", authenticateToken(['admin', 'doctor']), RoomController.deleteRoom.bind(RoomController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new RoomRoutes().getRouter();
