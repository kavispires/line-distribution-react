'use strict';

const db = require('APP/db');
const Band = db.model('bands');
const Member = db.model('members');
const Song = db.model('songs');

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Band.findAll({
        where: {
          public: true
        },
        include: [Member],
        order: ['name']
      })
        .then(bands => res.json(bands))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Band.create(req.body, {include: Member})
      .then(band => res.send(band))
      .catch(next))
  .get('/:id',
    (req, res, next) =>
      Band.findById(req.params.id, {include: [Member]})
      .then(band => res.json(band))
      .catch(next))
  .get('/:id/songs',
    (req, res, next) =>
      Song.findAll({
        where: {
          band_id: req.params.id
        },
        order: ['name']
      })
      .then(songs => res.json(songs))
      .catch(next));
