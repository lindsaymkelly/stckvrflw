$(document).ready(function() {

    $(document).on('click', ".vote-button", function(event){
    event.preventDefault();
    var data = {};
    var comment_id= $(this).parent('.points').parent('.comment_container').attr('id').replace("comment", "");
    data["comment_id"] = comment_id;

    debugger
    if ($(this).hasClass('upvote-button'))
    {
      data["vote_direction"] = 1;
    }
    else
    {
      data["vote_direction"] = -1;
    }
    // $.ajax({
    //       url: url,
    //       method: "post",
    //       data: data


    });

    $(document).on('click', "#question_comment", function(event){
    event.preventDefault();
    $(this).siblings('form').removeClass('hidden');
    $(this).addClass('hidden');
    });

    $(document).on('click', "#answer_comment", function(event){
    event.preventDefault();
    $(this).siblings('form').removeClass('hidden');
    $(this).addClass('hidden');
    });

  $(document).on('submit', ".submitform", function(event){

    var temp = $(this)
    data = $(this).serialize();
    url = $(this).attr("action");
    event.preventDefault();

    $.ajax({
          url: url,
          method: "post",
          data: data
    }).done(function(response){

      temp.siblings('div.comments').append(response);
      temp.siblings('button').removeClass('hidden');
      temp.addClass('hidden');
      temp.trigger('reset');
    })
    .fail(function(response){

    });

  });
  $(document).on('submit', ".submitform2", function(event){

    var temp = $(this)
    data = $(this).serialize();
    url = $(this).attr("action");
    event.preventDefault();

    $.ajax({
          url: url,
          method: "post",
          data: data
    }).done(function(response){


      temp.siblings('div.comments2').append(response);
      temp.siblings('button').removeClass('hidden');
      temp.addClass('hidden');
      temp.trigger('reset');
    })
    .fail(function(response){

    });

  });

  $(document).on('submit', ".answer_form", function(event){

    var temp = $(this)
    data = $(this).serialize();
    url = $(this).attr("action");
    event.preventDefault();

    $.ajax({
          url: url,
          method: "post",
          data: data
    }).done(function(response){
      // debugger;
      var text = "<div class=\"answers\" id=\"answer"+response["answer_id"]+"\">\
        "+response["points"]+" POINTS\
        "+response["text"] +"\
        Answer By: "+response["username"]+"\
        <button id=\"answer_comment\">Add Comment</button>\
        <form class=\'hidden submitform2\' method = \'post\' action=\'/questions/"+response["question_id"]+"/answers/"+response["answer_id"]+"/comments'>\
          <textarea name=\'text\' rows=5 cols=20> </textarea>\
          <input type=\'submit\' value=\"ANSWER COMMENT SUBMIT BUTT\">\
        </form>\
        <div class=\'comments2\'>\
      </div>\
      </div>";
      temp.parent().siblings('div.answerwrapper').append(text);
      temp.trigger('reset');
    })
    .fail(function(response){

    });

  });


});
