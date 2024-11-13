const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Department = require('../entities/Department'); // Import the Department model
const User = require('./User');

class Staff {
  constructor() {
    this.model = sequelize.define('Staff', {
      Emp_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Emp_Fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Emp_Lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Joining_Date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Emp_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Dept_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'department',
          key: 'Dept_ID',
        },
      },
      DOB: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Qualifications: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Specialization: {
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
      tableName: 'staff',
      timestamps: false,
    });

    // Define the associations
    this.model.belongsTo(Department, { foreignKey: 'Dept_ID' });
    this.model.belongsTo(User, { foreignKey: 'user_id' });
  }

  getModel() {
    return this.model;
  }
}

module.exports = new Staff().getModel();
