// RoomPort.js
const RoomService = require("../core/services/RoomService");

class RoomPort {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async findAllRooms(user) {
        console.log("Calling RoomService.findAllRooms with user:", user);
        return await this.roomService.findAllRooms(user);
    }

    async findSingleRoom(roomId) {
        return await this.roomService.findSingleRoom(roomId);
    }

    async addRoom(roomData) {
        return await this.roomService.addRoom(roomData);
    }

    async updateRoom(roomId, roomData) {
        return await this.roomService.updateRoom(roomId, roomData);
    }

    async deleteRoom(roomId) {
        return await this.roomService.deleteRoom(roomId);
    }
}

module.exports = new RoomPort(RoomService);
