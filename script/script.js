let clickCounter1 = 0;
let clickCounter2 = 0;

$("#click_number_1").html(clickCounter1);
$("#click_number_2").html(clickCounter2);

let catName1 = "IKKI";
let catName2 = "SAMMY";

$("#cat_name_1").html(catName1);
$("#cat_name_2").html(catName2);

$("#cat_image_1").click(function(){
  clickCounter1 += 1;
  $("#click_number_1").html(clickCounter1);
});

$("#cat_image_2").click(function(){
  clickCounter2 += 1;
  $("#click_number_2").html(clickCounter2);
});
