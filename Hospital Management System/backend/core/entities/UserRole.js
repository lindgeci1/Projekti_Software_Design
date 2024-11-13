const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');
const Role = require('./Role');

class UserRole {
  constructor() {
    this.model = sequelize.define('UserRole', {
      UserRole_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // Reference model by name
          key: 'user_id',
        },
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Role', // Reference model by name
          key: 'role_id',
        },
      },
    }, {
      tableName: 'UserRole',
      timestamps: true,
    });

    // Define associations
    // this.model.belongsTo(User, { foreignKey: 'user_id' });
    // this.model.belongsTo(Role, { foreignKey: 'role_id' });
  }

  getModel() {
    return this.model;
  }
}

module.exports = new UserRole().getModel();
