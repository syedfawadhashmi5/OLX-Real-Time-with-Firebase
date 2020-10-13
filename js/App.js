var storage = firebase.storage();
var db = firebase.firestore();
var database = firebase.database();

/* Loader */
var loader = document.getElementById("loader");

// Hide the loader from DOM

function hideLoader() {

  loader.style.display = "none";

}

// Show the loader on DOM

function showLoader() {

  loader.style.display = "block";

}



function showAdd() {

  var allAds = document.getElementById("show_product");
  showLoader()

  db.collection("cities")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {


        allAds.innerHTML += `
              <div class="card" style="width: 25rem";"border-radius: 15px" >
              <img class="card-img-top" src='${doc.data().img}'/>
              <div class="card-body">
                <h3 class="card-title" id="card-title">Name : ${doc.data().title}</h3>
                <h4 class="card-text" id="card-text"><span class="glyphicon glyphicon-map-marker"></span>Location : ${doc.data().Location}</h4>
                <h3 class="card-text" id="card-price">Rs : ${doc.data().price}</h3>
                <p class="card-text" id="card-title">description : ${doc.data().description}</p>
                <p class="card-title" id="card-title">Number : ${doc.data().MoblieNumber}</p>

                <button  class="btn btn-primary btn-danger" onclick="addFavorite()" fav="no"><span class="glyphicon glyphicon-heart-empty" "></span>Add To Favorite</button>

  
              </div>
              </div>
             `;
        hideLoader();

      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      hideLoader();
    });


}

var userImage = document.getElementById('user_img');
var username = document.getElementById("user_name");
var userId = localStorage.getItem('userId');


if (userId == userId) {
  var userInfo = localStorage.getItem('userInfo');
  userName = JSON.parse(userInfo).profileName;
  userimage = JSON.parse(userInfo).profile_picture;
  username.innerHTML = userName;
  userImage.src = `${userimage}`

  // var userImage = localStorage.getItem(userInfo);
}


function searchByText() {

  var searchInput = document.getElementById("search").value;


  var searchallAds = document.getElementById("show_productw");

  var allAds = document.getElementById("show_product");

  allAds.style.display = 'none';
  
  db.collection("cities").where("name", "==", searchInput)

    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        showLoader()

        // console.log(doc.id, " => ", doc.data());

        var userId = localStorage.getItem('userId');

        if (userId == userId) {
          searchallAds.innerHTML += `
          <div class="card" style="width: 25rem";"border-radius: 15px" >
          <img class="card-img-top" src='${doc.data().img}'/>
          <div class="card-body">
            <h3 class="card-title" id="card-title">Name : ${doc.data().title}</h3>
            <h4 class="card-text" id="card-text"><span class="glyphicon glyphicon-map-marker"></span>Location : ${doc.data().Location}</h4>
            <h3 class="card-text" id="card-price">Rs : ${doc.data().price}</h3>
            <p class="card-text" id="card-title">description : ${doc.data().description}</p>
            <p class="card-title" id="card-title">Number : ${doc.data().MoblieNumber}</p>
            <button  class="btn btn-primary btn-danger" onclick="addFavorite()" fav="no"><span class="glyphicon glyphicon-heart-empty" "></span>Add To Favorite</button>

          </div>
          </div>
         `;
          hideLoader();
        }

        else {


          searchallAds.innerHTML+=`
          <div class="card" style="width: 25rem";"border-radius: 15px" >
          <img class="card-img-top" src='${doc.data().img}'/>
          <div class="card-body">
            <h3 class="card-title" id="card-title">Name : ${doc.data().title}</h3>
            <h4 class="card-text" id="card-text"><span class="glyphicon glyphicon-map-marker"></span>Location : ${doc.data().Location}</h4>
            <h3 class="card-text" id="card-price">Rs : ${doc.data().price}</h3>
            <p class="card-text" id="card-title">description : ${doc.data().description}</p>
            <p class="card-title" id="card-title">Number : ${doc.data().MoblieNumber}</p>

            <button  class="btn btn-primary btn-danger" onclick="addFavorite()" fav="no"><span class="glyphicon glyphicon-heart-empty" "></span>Add To Favorite</button>


          </div>
          </div>
         `;
          hideLoader();



        }


      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
    
  if (searchInput == '') {

    showLoader()

    allAds.style.display = 'flex';
    searchallAds.style.display = 'none';

    hideLoader();



  }
}



if(userId == userId){

  var userIn = document.getElementById("user_in");
  var userOut = document.getElementById("user_out");

  userIn.style.display = 'none';
  userOut.style.display = 'block';
  
}

function log_out() {
  firebase.auth().signOut().then(function() {
    localStorage.clear();
    userOut.style.display = 'none';
    userIn.style.display = 'block';
  }).catch(function(error) {
    alert(error.massage);
  });
}