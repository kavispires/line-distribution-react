'use strict';

const Sequelize = require('sequelize');

module.exports = db => db.define('members', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	color: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports.associations = (Member, {Band}) => {
  Member.belongsTo(Band);
};
