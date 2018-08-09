/* ======= Model ======= */

var model = {
  selectedCat: 0,
  catNames: ['ikki','sammy','mia','licota','meg'],
  cats: [],
};

/* ======= Octopus ======= */

var octopus = {

  init: function(){
    // fetch images from unsplash
    fetch(`https://api.unsplash.com/search/photos?page=1&query=kitten`, {
      headers: {
        Authorization: 'Client-ID 28bef4c545a23c2aebbbb975c8b1d89fbe979f2c0917a7f01e5346b6eb2974d7'
      }
    }).then(response => response.json())
    .then(this.addCats)
    .then(this.startViews)
    .catch(e => this.requestError(e, 'image'));
  },

  addCats: function(images){
    for (let i = 0; i < model.catNames.length; i++){
      let newCat = {};
      newCat.name = model.catNames[i];
      newCat.clickCounter = 0;
      newCat.image = images.results[i].urls.small;
      model.cats.push(newCat);
    }
  },

  startViews: function(){
    catListView.init();
    catView.init();
  },

  setSelectedCat: function(selection){
    model.selectedCat = selection;
    catView.addCatInfo();
  },

  // increments the counter for the currently-selected cat
  incrementCounter: function() {
    model.cats[model.selectedCat].clickCounter++;
    catView.addCatInfo();
    catListView.incrementList();
  },

  requestError: function (e, part) {
    console.log(e);
  }
};


/* ======= View ======= */

var catView = {

  init: function() {
    $("#cat_images").click(function(){
      octopus.incrementCounter();
    });
    // render this view (update the DOM elements with the right values)
    this.addCatInfo();
  },

  addCatInfo: function(){
    $("#cat_images").empty();
    let htmlImageInfo =
    `<p class="text" id="cat_name">${model.cats[model.selectedCat].name}</p>
    <figure>
    <img id="cat_image" src="${model.cats[model.selectedCat].image}" alt="Cat Image" height="600" width="450">
    <figcaption >
    <p>Cliques</p>
    <p id="click_number">${model.cats[model.selectedCat].clickCounter}</p></figcaption>
    </figure>`

    $("#cat_images").html(htmlImageInfo);
  }
};

var catListView = {

  init: function() {
    $("#list").empty();
    let htmlListInfo =
    `<tr>
    <th>Gato</th>
    <th>Cliques</th>
    </tr>`
    $("#list").append(htmlListInfo);
    for (let i = 0; i < model.cats.length; i++){
      htmlListInfo =
      `<tr id="cat-list${i}">
      <td>${model.cats[i].name}</td>
      <td class="counter cat${i}">${model.cats[i].clickCounter}</td>
      </tr>`
      $("#list").append(htmlListInfo);
      $("#cat-list" + i).bind('click', function(catCopy) {
        return function() {
          octopus.setSelectedCat(catCopy);
        };
      }(i));
    }
  },

  incrementList: function(){
    $(".cat" + model.selectedCat).text(model.cats[model.selectedCat].clickCounter);
  }

};

// make it go!
octopus.init();
