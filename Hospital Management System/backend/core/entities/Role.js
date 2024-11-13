const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Role {
  constructor() {
    this.model = sequelize.define('Role', {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'roles',
      timestamps: true,
    });
  }

  getModel() {
    return this.model;
  }
}

module.exports = new Role().getModel();
