function fetchGists() {
  $.ajax({
  url: "https://api.github.com/users/" + $('#username').val() + "/gists",
  success: function(data) {
    $('#gists').empty();
    var username = data[0].owner.login
    if(data[0].owner.avatar_url){
        var picture = data[0].owner.avatar_url;
      } else{
        var picture = "http://placehold.it/350x350";
      };

    $('#gists').html('<img src = '+ picture +', class="avatar-x-large">');
    $('#gists').prepend('<h4>All the gists of '+ username +'</h4>');
    data.forEach(function(gist) {
      var filename = Object.keys(gist.files)[0]
      var language = gist.files[filename].language
      var content = gist.files[filename].raw_url
      var description = gist.description
      var updated_at = gist.updated_at
      $('#gists').append(
        "<ul>"
        +"<li>" + filename + "</li>"
        + "<li>" + language + "</li>"
        + "<li>" + content + "</li>"
        + "<li>" + description + "</li>"
        + "<li>" + updated_at + "</li>"
        + "</ul>"
        );
    });
  },
  error: function(jqXHR) {
    $('#gists').empty().append("<li>" + jqXHR.responseText + "</li>");
  }
  });
}

$(document).ready(function() {
  $('#search').click(function() {
    fetchGists();
  });
  $('#username').keyup(function(e) {
    if(e.keyCode == 13){
    fetchGists();
    }
  });
});
