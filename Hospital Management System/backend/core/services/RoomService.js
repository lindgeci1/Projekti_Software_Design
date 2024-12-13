const IRoomServiceAdapter = require("../adapter_pattern/IRoomServiceAdapter");

class RoomService extends IRoomServiceAdapter {
    constructor(roomServiceAdapter) {
        super(); 
        this.roomServiceAdapter = roomServiceAdapter; 
    }

    async findAllRooms(user) {
        return await this.roomServiceAdapter.findAllRooms(user);
    }

    async findSingleRoom(roomId) {
        return await this.roomServiceAdapter.findSingleRoom(roomId);
    }

    async addRoom(roomData) {
        return await this.roomServiceAdapter.addRoom(roomData);
    }

    async updateRoom(roomId, roomData) {
        return await this.roomServiceAdapter.updateRoom(roomId, roomData);
    }

    async deleteRoom(roomId) {
        return await this.roomServiceAdapter.deleteRoom(roomId);
    }
}

module.exports = RoomService;
