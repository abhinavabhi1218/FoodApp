// $(document).ready(function () {
//   $(".all-locker a").click(function (e) {
//     e.preventDefault();
//     $(".all-locker").removeClass("selected");
//     $(this).closest('li').addClass('selected'); // I also tried .parent().addClass
//     // $('body').addClass('locker-open'); // I also tried .parent().addClass

// });

// // locker-alert
// $(".locker-alert a").click(function (e) {
//   setTimeout(function(){
//   $("body").addClass("police-entry");
// }, 1000);
// });

// // bank to jail room
// $(".locker-alert a").click(function (e) {
//   setTimeout(function(){
//     $(".room").addClass("changes");
// }, 800);
// });

// });

var mines = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];
var newItems = [];
var click = 0;
var n = mines.length;

// if (invest > 10 && invest < 100) {

// }
$(document).ready(function () {
  $("#submit_button").click(function () {
    console.log("SUBMIT BUTTON");
    var invest = $("#invest_amount").val();
    // var str = $("#myInput").val();
    console.log(typeof(parseFloat(invest)));
    if (invest === ''){
      $("info").text("Choose bet amount ");
    }
    else{
      var str = $("#myInput select").on("change").val();
    // alert(str);
    console.log();
    var gems = mines.length - str;
    // alert(gems)
    // $("#submit_button").css('disabled','disabled');
    $("#submit_button").prop("disabled", true);
    for (var i = 0; i < str; i++) {
      var idx = Math.floor(Math.random() * mines.length);
      // console.log(idx);
      newItems.push(mines[idx]);
      mines.splice(idx, 1);
    }
    // console.log(newItems)

    $(document).ready(function () {
      $(".all-locker a").click(function (e) {
        // console.log("function ------"+e);
        e.preventDefault();
        click = click + 1;
        console.log(click);
        // $(".all-locker").removeClass("selected");
        $(this).closest("li").addClass("selected"); // I also tried .parent().addClass
        $("#clime_button").css("display", "block");
        var secondImageId = $(this).find("img.open").attr("id");
        // console.log(secondImageId);
        $.each(newItems, function (index, value) {
          var selector = "#" + value.toString();
          // use jQuery to select the current image by id and change its src attribute
          $(selector).attr("src", "assets/images/mines/locker-alert.png");
          var current_result =
            (factorial(n) * factorial(gems - click)) /
            (factorial(gems) * factorial(n - click));
            // next value
            var current_next_result =
            (factorial(n) * factorial(gems - (click+1))) /
            (factorial(gems) * factorial(n - (click+1)));
          // console.log(current_result);
          var current_result_percentage =
            current_result - 0.01 * current_result;
          var current_next_value_percentage =  current_next_result -0.01*current_next_result; 
          if (secondImageId == value) {
            $(document).ready(function () {
              $(".all-locker a").addClass("selected");
              var current_next_value_percentage = 0;
              var current_result_percentage = 0;
              $("#next_value_rewards").text(current_next_value_percentage);
              $("#current_value_rewards").text(current_result_percentage);
              $("#next").text("Profit on Next Tile  "+ current_next_value_percentage);
              $("#current").text(" Total profit  "+  current_result_percentage);

            });
          } else {
            $("#next").text("Profit on Next Tile  ("+ current_next_value_percentage.toFixed(2) + "X)");
            $("#current").text(" Total profit  ("+  current_result_percentage.toFixed(2) + "X)");
            $("#next_value_rewards").text((parseFloat(invest)*current_next_value_percentage).toFixed(2));
            $("#current_value_rewards").text((parseFloat(invest)*current_result_percentage).toFixed(2));
          }
        });
      });
    });
    }
    // Get the selected option value when the select element changes
    
  });
});

function factorial(num) {
  if (num < 0) {
    return -1;
  } else if (num == 0) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
