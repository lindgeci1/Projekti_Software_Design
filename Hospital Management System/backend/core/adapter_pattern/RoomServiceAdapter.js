const IRoomServiceAdapter = require('./IRoomServiceAdapter');

class RoomServiceAdapter extends IRoomServiceAdapter {
    constructor(roomRepository) {
        super();
        this.roomRepository = roomRepository;
    }

   async findAllRooms(user) {
    console.log("RoomServiceAdapter: findAllRooms called with user:", user);
    const { email, role } = user;
    switch (role) {
        case "admin":
            console.log("RoomServiceAdapter: Delegating to roomRepository.findAll()");
            return await this.roomRepository.findAll();
        case "doctor":
            console.log(`RoomServiceAdapter: Delegating to roomRepository.findByDoctorEmail(${email})`);
            return await this.roomRepository.findByDoctorEmail(email);
        case "patient":
            console.log(`RoomServiceAdapter: Delegating to roomRepository.findByPatientEmail(${email})`);
            return await this.roomRepository.findByPatientEmail(email);
        default:
            console.error("RoomServiceAdapter: Unauthorized access");
            throw new Error("Unauthorized access");
    }
}

    async findSingleRoom(roomId) {
        return await this.roomRepository.findById(roomId);
    }

    async addRoom(roomData) {
        console.log("RoomServiceAdapter: Delegating to roomRepository.addRoom()");
        return await this.roomRepository.create(roomData);
    }

    async updateRoom(roomId, roomData) {
        return await this.roomRepository.update(roomId, roomData);
    }

    async deleteRoom(roomId) {
        return await this.roomRepository.delete(roomId);
    }
}

module.exports = RoomServiceAdapter;
