(function () {
  'use strict';

  var tracks = require('../utils/tracks'),
      templates = require('../utils/templates');

  // The API that returns the in-email representation.
  module.exports = function(req, res) {
    var term = req.query.text.trim(),
        track;

    if (!term) {
      res.status(400).send('Song id required');
    }

    try {
      track = tracks.getById(term);
    } catch (e) {
      // Let the caller handle the error
      res.status(e.status).send(e.message);
      return;
    }

    if (!track || !track.id) {
      res.status(404).send('Song not found');
    }

    res.json({
      body: templates.getRobustTrackLinkTemplate(track),
      subject: 'This song === SWIPE RIGHT'
      // Add raw:true if you're returning content that you want the user to be able to edit
    });
  };
}());
