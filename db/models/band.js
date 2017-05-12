'use strict';

const Sequelize = require('sequelize');

module.exports = db => db.define('bands', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	public: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	}
});

module.exports.associations = (Band, {User, Member, Song}) => {
  Band.belongsTo(User);
  Band.belongsTo(User, {as: 'originalCreator'});
  Band.hasMany(Member);
  Band.hasMany(Song);
};
