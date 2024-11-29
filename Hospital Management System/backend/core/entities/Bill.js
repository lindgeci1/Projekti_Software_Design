const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Patient = require('../entities/Patient');

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
  }

  getModel() {
    return this.model;
  }
}

const billModel = new Bill().getModel();
billModel.belongsTo(Patient, { foreignKey: 'Patient_ID' }); // Define association outside constructor
Patient.hasOne(billModel, { foreignKey: 'Patient_ID' });
module.exports = billModel;
