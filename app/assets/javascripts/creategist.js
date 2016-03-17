function getGistDataAsJson() {
    return JSON.stringify({
    "description": $('#description').val(),
    "public": true,
    "files": {
      "File1.md": {
        "content": $('#new-gist-content').val()
        }
    }
  })
}

function createGist() {

  $.ajax({
    type: "POST",
    url: "https://api.github.com/gists",
    data: getGistDataAsJson(),
    success: function(data) {
      window.location.reload();
      $('#result').removeClass('error').html(
        "Successfully created gist at " + data.html_url + "//  Please wait while updating the page...");
    },
    error: function(jqXHR) {
      $('#result').addClass('error').html(jqXHR.responseText);
    }
  });
}

$(document).ready(function() {
  $("#submit-gist").submit(function(e) {
    e.preventDefault();
    createGist();
  });
});
