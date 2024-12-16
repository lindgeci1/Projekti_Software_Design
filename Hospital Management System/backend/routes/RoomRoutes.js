const express = require("express");
const { authenticateToken } = require('../middleware/authMiddleware');

const RoomController = require("../adapters/controllers/RoomController");
const RoomServiceAdapter = require("../core/adapter_pattern/RoomServiceAdapter");
const RoomRepository = require("../adapters/repositories/RoomRepository");

class RoomRoutes {
    constructor() {
        this.router = express.Router();

        const roomRepository = new RoomRepository();//sherben sikur adaptee
        const roomAdapter = new RoomServiceAdapter(roomRepository);//adapter qe i bon adaptimin e t dhanave ne kat rast metodave
        const roomController = new RoomController(roomAdapter);//clienti 

  
        this.initializeRoutes(roomController);
    }

    initializeRoutes(roomController) {
        this.router.get("/room", authenticateToken(['admin', 'doctor', 'patient']), roomController.findAllRooms.bind(roomController));
        this.router.get("/room/:id", authenticateToken(['admin', 'doctor', 'patient']), roomController.findSingleRoom.bind(roomController));
        this.router.post("/room/create", authenticateToken(['admin', 'doctor']), roomController.addRoom.bind(roomController));
        this.router.put("/room/update/:id", authenticateToken(['admin', 'doctor']), roomController.updateRoom.bind(roomController));
        this.router.delete("/room/delete/:id", authenticateToken(['admin', 'doctor']), roomController.deleteRoom.bind(roomController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new RoomRoutes().getRouter();
