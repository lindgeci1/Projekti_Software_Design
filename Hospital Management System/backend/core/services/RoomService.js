// RoomService.js
const RoomRepository = require("../../adapters/repositories/RoomRepository");

class RoomService {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }

    async findAllRooms(user) {
        console.log("Service: Finding all rooms for user:", user);
        const { email, role } = user;
        if (role === "admin") {
            return await this.roomRepository.findAll();
        } else if (role === "doctor") {
            return await this.roomRepository.findByDoctorEmail(email);
        } else if (role === "patient") {
            return await this.roomRepository.findByPatientEmail(email);
        } else {
            throw new Error("Unauthorized access");
        }
    }

    async findSingleRoom(roomId) {
        return await this.roomRepository.findById(roomId);
    }

    async addRoom(roomData) {
        return await this.roomRepository.create(roomData);
    }

    async updateRoom(roomId, roomData) {
        return await this.roomRepository.update(roomId, roomData);
    }

    async deleteRoom(roomId) {
        return await this.roomRepository.delete(roomId);
    }
}

module.exports = new RoomService(RoomRepository);
