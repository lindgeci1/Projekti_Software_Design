const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');

class Patient {
  constructor() {
    this.model = sequelize.define('Patient', {
      Patient_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Personal_Number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Patient_Fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Birth_Date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Patient_Lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Blood_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
    }, {
      tableName: 'patient',
      timestamps: false,
    });

    this.model.belongsTo(User, { foreignKey: 'user_id' });
    User.hasOne(this.model, { foreignKey: 'user_id' });
  }

  getModel() {
    return this.model;
  }
}

module.exports = new Patient().getModel();
