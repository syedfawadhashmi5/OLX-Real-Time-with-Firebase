var auth = firebase.auth();


alert("Please image Must be upload");


function signUpsubmit() {


    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let imageUrl = document.getElementById("image_file").files[0];
    let profileName = document.getElementById("username").value;
    let password_2 = document.getElementById("password2").value;
    let error = document.getElementById("error");
    error.innerHTML="";


    if(password == password_2){

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
                            profileName : profileName,
                            userUid : auth.currentUser.uid
                        }
        
                        firebase.database().ref('users/').push().set(user);
        
                        localStorage.setItem("userId", auth.currentUser.uid);
                        
                        localStorage.setItem("userInfo", JSON.stringify(user));
        
                        redirected()
        
        
                })
                .catch(function (error) {
        
                    console.log(error)
                });
        });
  
}else {
    error.style.display="block"
    error.innerHTML="Please Fill All Feilds"
} 
    


 
}


function redirected() {

    window.location.href = "../user_login.html"

}