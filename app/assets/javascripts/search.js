function fetchGists() {
  $.ajax({
  url: "https://api.github.com/users/" + $('#username').val() + "/gists",
  success: function(data) {
    $('#content').empty();
    $('#header').empty();
    var username = data[0].owner.login
    if(data[0].owner.avatar_url){
        var picture = data[0].owner.avatar_url;
      } else{
        var picture = "http://placehold.it/350x350";
      };

    $('#header').html('<img src = '+ picture +', class="avatar-x-large">');
    $('#header').prepend('<h4>All the gists of '+ username +'</h4>');
    data.forEach(function(gist) {
      var filename = Object.keys(gist.files)[0]
      var language = gist.files[filename].language
      var content = gist.files[filename].raw_url
      var description = gist.description
      var updated_at = gist.updated_at
      $('#content').append(
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
    $('#content').empty()
    $('#header').empty().append("<h4> Error : " + jqXHR.responseText + "</h4>");
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
