// client-side js
// run by the browser each time your view template is loaded

$(function() {
  $.get('/tracks', function(tracks) {
    tracks.forEach(function(track) {
      let newEl = '<li><a href="'+track.url+'" target="_blank">'+track.title+'</a></li>';
      $('ul#tracks').append(newEl);
    });
  });
});
