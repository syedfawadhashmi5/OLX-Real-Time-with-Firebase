var auth = firebase.auth();


function Login() {


    let email = document.getElementById("email");
    let password = document.getElementById("password");


    var Email = email.value;
    var Password = password.value;

    firebase.auth().signInWithEmailAndPassword(Email, Password).then(function (sucess) {

        alert("Your Email is sucess", sucess.message);

        redirected();


    }).catch(function (error) {
        alert(error.message);
    });

}


function reset_password() {

    let email = document.getElementById("email");
    var Email = email.value;

    if (Email !== "") {

        var auth = firebase.auth();


        auth.sendPasswordResetEmail(Email).then(function (success) {
            alert("Please Check Your Email Box");
        }).catch(function (error) {
            // An error happened.
        });

    } else {

        alert("Please type Your Email");
    }

}



function redirected() {

    window.location.href = "../index.html";



    var userInfo = localStorage.getItem('userInfo');
    userName = JSON.parse(userInfo).profileName;
    userimage = JSON.parse(userInfo).profile_picture;
    userimage = JSON.parse(localStorage.getItem('userId'));



    console.log(userName)

}


function change_screen() {

    let right = document.getElementById('right');
    let left = document.getElementById('left');

    right.style.display = "block";

    left.style.display = "none";

    let back = document.getElementById('back_btn');

    back.style.display = 'none';

    var backImg = document.getElementById("back_image");

    backImg.style.display = 'block';

    backImg.classList.add('or');

}


function back_Btn() {

    let right = document.getElementById('right');
    let left = document.getElementById('left');

    right.style.display = "none";

    left.style.display = "block";

    let back = document.getElementById('back_btn');

    back.style.display = 'block';

    var backImg = document.getElementById("back_image");

    backImg.style.display = 'none';

    backImg.classList.add('or');
}

function login_facebook() {

    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user');

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        var user_facebook = {

            username : user.displayName,
            userimage : user.photoURL,
        }

        var googleinfo = localStorage.setItem('user' , JSON.stringify(user_facebook));

        redirected();

        console.log(googleinfo);
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

        console.log(errorMessage, email, credential)
    });

}

function login_google() {

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        var user_goole = {

            username : user.displayName,
            userimage : user.photoURL,
        }

        var googleinfo = localStorage.setItem('user' , JSON.stringify(user_goole));

        redirected();

        console.log(googleinfo);


    }).catch(function (error) {

        console.log(error.message, error.email, error.credential);

    });
}