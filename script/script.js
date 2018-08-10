/* ======= Model ======= */

var model = {
  selectedCat: 0,
  catNames: ['ikki','sammy','mia','licota','meg','pity','tuty','bobona'],
  cats: [],
};

/* ======= Octopus ======= */

var octopus = {

  init: function(){
    // fetch images from unsplash
    fetch(`https://api.unsplash.com/search/photos?page=1&query=cat`, {
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
    catAdminView.init();
  },

  setSelectedCat: function(selection){
    model.selectedCat = selection;
    catView.addCatInfo();
  },

  saveCatInfo: function(name, counter, image){
    model.cats[model.selectedCat].name = name;
    model.cats[model.selectedCat].clickCounter = counter;
    model.cats[model.selectedCat].image = image;
    catListView.changeCatValues();
    catView.addCatInfo();
  },

  // increments the counter for the currently-selected cat
  incrementCounter: function() {
    model.cats[model.selectedCat].clickCounter++;
    catView.incrementInfoCounter();
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
  },

  incrementInfoCounter: function(){
    $("#click_number").text(model.cats[model.selectedCat].clickCounter);
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
      `<tr id="cat_list${i}">
      <td class="cat_name${i}">${model.cats[i].name}</td>
      <td class="counter cat${i}">${model.cats[i].clickCounter}</td>
      </tr>`
      $("#list").append(htmlListInfo);
      $("#cat_list" + i).bind('click', function(catCopy) {
        return function() {
          octopus.setSelectedCat(catCopy);
          catAdminView.empty();
        };
      }(i));
    }
  },

  incrementList: function(){
    $(".cat" + model.selectedCat).text(model.cats[model.selectedCat].clickCounter);
  },

  changeCatValues: function(){
    $(".cat" + model.selectedCat).text(model.cats[model.selectedCat].clickCounter);
    $(".cat_name" + model.selectedCat).text(model.cats[model.selectedCat].name);
  }

};

var catAdminView = {

  init: function() {

    catAdminView.empty();

    $("#admin_button").click(function(){
      catAdminView.render();
    });

  },

  render: function() {
    htmlAdminInfo =
    `Gato<br>
    <input type="text" id="fName" value="${model.cats[model.selectedCat].name}" autocomplete='Cat Name'>
    <br>Cliques<br>
    <input type="text" id="fClicks" value="${model.cats[model.selectedCat].clickCounter}" autocomplete='Cat clicks'>
    <br>Image URL<br>
    <input type="text" id="fUrl" value="${model.cats[model.selectedCat].image}" autocomplete='Cat Image Url'>
    <button id="save_button">Save</button>
    <button id="cancel_button">Cancel</button>`
    $("#admin_form").append(htmlAdminInfo);
    $("#admin_button").hide();

    $("#save_button").click(function(){
      catAdminView.getValues();
      catAdminView.empty();
    });

    $("#cancel_button").click(function(){
      catAdminView.empty();
    });
  },

  empty: function(){
    $("#admin_form").empty();
    $("#admin_button").show();
  },

  getValues: function(){
    let catName, catCounter, catImage;
    catName = $("#fName").val();
    catCounter = $("#fClicks").val();
    catImage = $("#fUrl").val();
    console.log(catName);
    octopus.saveCatInfo(catName, catCounter, catImage);
    console.log(model.cats[model.selectedCat]);
  }

};

// make it go!
octopus.init();
