'use strict';

const Sequelize = require('sequelize');

module.exports = db => db.define('bands', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	public: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
		allowNull: false,
		set: function(value) {
			if (value === true) value = true;
			else value = false;
			this.setDataValue('public', value);
		}
	}
});

module.exports.associations = (Band, {User, Member, Song}) => {
  Band.belongsTo(User);
  Band.belongsTo(User, {as: 'originalCreator'});
  Band.hasMany(Member);
  Band.hasMany(Song);
};
