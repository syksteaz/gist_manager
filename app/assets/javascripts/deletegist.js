function deleteGist() {
  $.ajax({
    type: "DELETE",
    url: "https://api.github.com/gists/" + $('#delete').parent(".card").attr("id"),
    success: function(data) {
      console.log("delete ok");
    },
    error: function(jqXHR) {
      console.log("<h4> Error : " + jqXHR.responseText + "</h4>");
    }
    });
}

$(document).ready(function() {
  $('#delete').click(function() {
    $('.tab-content > h4').empty();
    deleteGist();
  });
});
