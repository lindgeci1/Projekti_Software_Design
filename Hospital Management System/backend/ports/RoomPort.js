// RoomPort.js
const RoomService = require("../core/services/RoomService");

class RoomPort {
    async findAllRooms(user) {
        console.log("Calling RoomService.findAllRooms with user:", user);
        return await RoomService.findAllRooms(user);
    }

    async findSingleRoom(roomId) {
        return await RoomService.findSingleRoom(roomId);
    }

    async addRoom(roomData) {
        return await RoomService.addRoom(roomData);
    }

    async updateRoom(roomId, roomData) {
        return await RoomService.updateRoom(roomId, roomData);
    }

    async deleteRoom(roomId) {
        return await RoomService.deleteRoom(roomId);
    }
}

module.exports = new RoomPort();
