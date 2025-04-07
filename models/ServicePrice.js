const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Service = require('./service');

const ServicePrice = sequelize.define('ServicePrice', {
  duration: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  type: { type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'), allowNull: false }
});

Service.hasMany(ServicePrice, { onDelete: 'CASCADE' });
ServicePrice.belongsTo(Service);

module.exports = ServicePrice;
