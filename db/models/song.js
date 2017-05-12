'use strict';

const Sequelize = require('sequelize');

module.exports = db => db.define('songs', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	distribution: Sequelize.JSON,
	public: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	lyrics: Sequelize.TEXT
});

module.exports.associations = (Song, {Band, User}) => {
  Song.belongsTo(User);
  Song.belongsTo(Band);
};
