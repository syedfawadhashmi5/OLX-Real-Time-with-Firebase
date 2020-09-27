var auth = firebase.auth();


function signUpsubmit() {

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let imageUrl = document.getElementById("image_file").files[0];
    let profileName = imageUrl.name;




    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (sucess) {

        alert("Your Email is sucessfully register" + sucess.message)

        // Create a root reference
        var storageRef = firebase.storage().ref();
        // Create file metadata including the content type
        var metadata = {
            contentType: imageUrl.type,
        };

        // Upload the file and metadata
        var uploadTask = storageRef.child('images/').child(profileName).put(imageUrl, metadata);
        uploadTask.then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {

                    var user = {

                        username: username,
                        email: email,
                        profile_picture: url,
                        userUid : auth.currentUser.uid
                    }

                    firebase.database().ref('users/').push().set(user);

                    console.log(user)

            })
            .catch(function (error) {

                console.log(error)
            });
    });

}