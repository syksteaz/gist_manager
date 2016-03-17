$(function(){

  $(".tab").on("click", function(e){
    $('.tab').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').addClass("hidden");
    $($(this).data("target")).removeClass('hidden');
  });

  $("#create-gist").on("click", function(e){
    $($(this).data("target")).toggleClass('hidden');
  });

  $("#your-gists").on("click", function(e){
    $('#search-box').addClass('hidden');
  });

  $("#all-users-gists").on("click", function(e){
    $('#search-box').removeClass('hidden');
  });

});
