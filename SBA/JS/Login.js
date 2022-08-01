function validate(){
    console.log("enter");
    const form = document.getElementById("form");
    var userName= document.getElementById('userName').value;
    var password= document.getElementById('password').value;
    if(userName == 'admin' && password == 'password'){
       console.log(window.location);
        window.location.href="../HTML/Home.html";
        alert('login successful');
        return ;
    }
    else{
        alert('login failed');
    }
}
