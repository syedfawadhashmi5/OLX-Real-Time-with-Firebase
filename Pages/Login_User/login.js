var auth = firebase.auth();


function Login() {


    let email = document.getElementById("email");
    let password = document.getElementById("password");


        var Email = email.value;
        var Password = password.value;
    
        firebase.auth().signInWithEmailAndPassword(Email, Password).then(function (sucess) {
    
            alert("Your Email is sucess" , sucess.message);

            redirected()
    
    
        }).catch(function (error) {
            alert(error.message);
        });

}


function reset_password() {

    let email = document.getElementById("email");
    var Email = email.value;

    if(Email !== ""){

        var auth = firebase.auth();
        
        
        auth.sendPasswordResetEmail(Email).then(function(success) {
            alert("Please Check Your Email Box");
        }).catch(function(error) {
          // An error happened.
        });
        
    }else{

        alert("Please type Your Email");
    }

}

 

function redirected() {

    // window.location.href = "../../index.html";



        var userInfo = localStorage.getItem('userInfo');
        userName = JSON.parse(userInfo).profileName;
        userimage = JSON.parse(userInfo).profile_picture;
        userimage = JSON.parse(localStorage.getItem('userId'));



      console.log(userName)

}
