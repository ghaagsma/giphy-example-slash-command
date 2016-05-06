(function () {
  'use strict';

  var _ = require('underscore');

  module.exports = {
    getSearchPromptTemplate: function () {
      return `<i>(enter a search term)</i>`;
    },
    // Returns search result template for the track.
    getTrackSearchResultTemplate: function (track) {
      var result = '';

      if (!track || !track.name) {
        return result;
      }

      result += `<div><b>${track.name}</b></div>`;

      if (track.artists && track.artists.length && track.artists[0].name) {
        result += `<div>${track.artists[0].name}</div>`;
      } else {
        result += `<div>(unknown artist)</div>`;
      }

      return result;
    },
    getNoSearchResultsTemplate: function () {
      return `<i>(no results)</i>`;
    },
    // Returns full track link template
    getRobustTrackLinkTemplate: function (track) {
      var result = '',
          image,
          artistName;

      if (!track || !track.id) {
        return result;
      }

      result += `<div style="display:inline-block;padding:10px;font-family:helvetica,sans-serif;">`;
      result += `<a href="https://embed.spotify.com/?uri=spotify:track:${track.id}" ` +
        `target="_blank" style="text-decoration:none;color:#444;">`;
      result += `<div style="display:flex;align-items:center;">`;

      if (track.album && track.album.images && track.album.images.length) {
        image = _.chain(track.album.images)
          .sortBy('width')
          .first()
          .value();

        if (!!image) {
          result += `<img src="${image.url}" alt="Album cover" ` +
            `height="${image.height}" width="${image.width}" ` +
            `style="margin-right:10px;" />`;
        }
      }

      result += `<div>`;
      result += `<div><b>${track.name || '(unknown song name)'}</b></div>`;

      artistName = track.artists && track.artists.length ?
        track.artists[0].name : '(unknown artist)';
      result += `<div style="font-size:12px;margin-top:10px;">${artistName}</div>`;

      result += `</div></div></a></div>`;
      return result;
    }
  };
}());
