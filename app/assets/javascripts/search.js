function fetchGists() {
  $.ajax({
    url: "https://api.github.com/users/" + $('#username').val() + "/gists",
    success: function(data) {
      $('#create-gist').addClass('hidden');
      $('.tabs').addClass('hidden');
      $('#back-button').removeClass('hidden');
      $('#content').empty();
      $('#header').empty();
      var username = data[0].owner.login
      if(data[0].owner.avatar_url){
          var picture = data[0].owner.avatar_url;
        } else{
          var picture = "http://placehold.it/350x350";
        };

      $('#header').html([
        '<img src = '+ picture +', class="avatar-x-large">',
        ].join("\n"));
      $('#header').prepend('<h4>All the gists of '+ username +'</h4>');
      data.forEach(function(gist) {
        var filename = Object.keys(gist.files)[0]
        var language = gist.files[filename].language
        var content = gist.files[filename].raw_url
        var description = gist.description
        var updated_at = gist.updated_at
        var text_content = $.ajax({
          url: content,
          success: function(data){
            return data;
          }
        });
        var card = $([
          '<div class="card">',
            '<div class= "panel panel-default">',
            '    <div class = "panel-heading">',
            '      <div class = "card-head">',
            '        <div class = "filename">',
                       filename,
            '        </div>',
            '        <div class = "description">',
                       description,
            '        </div>',
            '        <div class = "language">',
                        language,
            '        </div>',
            '     </div>',
            '   </div>',
            '    <div class = "content panel-body pannel-overflow">',
                    text_content,
            '    </div>',
            '</div>',
            '<div class= "last-update">',
               updated_at,
            '</div>',
          '</div>'
        ].join("\n"));

        $('#content').append(
          card
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
  $('#back-button').on("click", function() {
    window.location.reload();
  });
});
