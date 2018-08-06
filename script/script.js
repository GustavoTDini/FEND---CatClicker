let clickCounter = [0,0,0,0,0];

let catName = ["ikki","sammy","mia","licota","meg"];

let catImages = [];

let selectedCat = 0;

let listRows;

fetch(`https://api.unsplash.com/search/photos?page=1&query=cat`, {
  headers: {
    Authorization: 'Client-ID 28bef4c545a23c2aebbbb975c8b1d89fbe979f2c0917a7f01e5346b6eb2974d7'
  }
}).then(response => response.json())
.then(addCats)
.then(addCatInfo)
.catch(e => requestError(e, 'image'));

function addCats(images){
  for (let i = 0; i < catName.length; i++){
    catImages.push(images.results[i].urls.small);
  }
}

function addCatInfo(){
  $("#cat_images").empty();
  let htmlImageInfo =
  `<p class="text" id="cat_name">${catName[selectedCat]}</p>
  <figure>
    <img id="cat_image" src="${catImages[selectedCat]}" alt="Cat Image" height="600" width="450">
    <figcaption >
      <p>Cliques</p>
      <p id="click_number">${clickCounter[selectedCat]}</p></figcaption>
  </figure>`

  $("#cat_images").html(htmlImageInfo);

  addCatList();
}

function addCatList(){
  $("#list").empty();
  let htmlListInfo =
  `<tr>
    <th>Gato</th>
    <th>Cliques</th>
  </tr>`
  $("#list").append(htmlListInfo);
  for (let i = 0; i < catName.length; i++){
    htmlListInfo =
    `<tr>
      <td>${catName[i]}</td>
      <td class="counter">${clickCounter[i]}</td>
    </tr>`
    $("#list").append(htmlListInfo);
  }
}

function requestError(e, part) {
  console.log(e);
}

$('#list').click(function(){
   $('td').click(function(){
     var row_index = $(this).parent().index();
     if (row_index != 0){
       selectedCat = row_index-1;
       addCatInfo();
     };
   });
});

$("#cat_images").click(function(){
  clickCounter[selectedCat] += 1;
  $("#click_number").html(clickCounter[selectedCat]);
  addCatList();
});
