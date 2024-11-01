const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Patient = require('../../models/Patient');

class Bill {
  constructor() {
    this.model = sequelize.define('Bill', {
      Bill_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Date_Issued: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Payment_Status: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      Patient_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Patient,
          key: 'Patient_ID',
        },
      },
    }, {
      tableName: 'Bill',
      timestamps: false,
    });

    this.model.belongsTo(Patient, { foreignKey: 'Patient_ID' });
  }

  getModel() {
    return this.model;
  }
}

module.exports = new Bill().getModel();
