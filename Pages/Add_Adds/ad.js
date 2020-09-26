
var storage = firebase.storage();
var db = firebase.firestore();


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
  /* Loader End */

function submitAdForm() {

    var title = document.getElementById("adTitle").value;
    var description = document.getElementById("AdDescription").value;
    var category = document.getElementById("Category").value;
    var price = document.getElementById("price").value;
    var name = document.getElementById("Name").value;
    var MoblieNumber = document.getElementById("Number").value;
    var categoryLocation = document.getElementById("city").value;
    var typeError = document.getElementById("error");
    
    typeError.innerHTML = " ";

        if(title == " " || description == " " || MoblieNumber == " " || category == " "|| categoryLocation == "" ||price == " " ){

            typeError.style.display="block"
            typeError.innerHTML="Please Fill All Feilds"
        }

    // console.log(title ,description , category , price , )


    // Upload the file and metadata
    // var uploadTask = storageRef.child('Ads/').put(file, metadata);


    // //Uploading Image To Storage 

    let ref = firebase.storage().ref();
    let file = document.getElementById("UploadImage").files[0];
    let fileName = (+new Date()) + " " + file.name;

    // Create file metadata including the content type

    var metadata = {
        contentType: file.type,
    };
    const task = ref.child("ads").child(fileName).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {



            //adding Data TO Database 

            // var uid = firebase.auth().currentUser.uid;
            // var displayName = firebase.auth().currentUser.displayName;

            db.collection("cities").add({

                title: title,
                description: description,
                category: category,
                price: price,
                name: name,
                MoblieNumber: MoblieNumber,
                url: url,
            }).then(function (docRef) {
                showLoader()
            error.style.color="green"
            error.style.display="block"
            error.innerHTML="Your Ad Has Been Posted"
            console.log("Document written with ID: ", docRef.id);
            setTimeout(function(){

                window.location.href="../My account/account.html"

            }, 3000)
            })
                .catch(function (error) {
                    var p = document.getElementbyid("error");
                    p.innherHTML = error;
                });
        });

}