'use strict';

const db = require('APP/db');
const Song = db.model('songs');

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Song.findAll()
        .then(songs => res.json(songs))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Song.create(req.body)
      .then(song => res.status(201).json(song))
      .catch(next))
  .get('/:id',
    (req, res, next) =>
      Song.findById(req.params.id)
      .then(song => res.json(song))
      .catch(next));
