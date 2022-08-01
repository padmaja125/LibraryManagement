function register(){
    const form = document.getElementById("form");
    const userName = document.getElementById("userName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const passwordCheck= document.getElementById("passwordCheck");

    form.addEventListener('submit', e=>{
        e.preventDefault();
        checkInput();
    });
}
function checkInput(){
    const details = [];
    details.push(userName.value.trim());
    details.push(email.value.trim());
    details.push(password.value.trim());
    details.push(passwordCheck.value.trim());

    if (details[0] == ''){
        setError(userName,'Username cannot be blank');
    }else{
        setSuccess(userName);
    }
    if (details[1] == ''){
        setError(email,'email cannot be blank');
    }else if(!isEmail(details[1])){
        setError(email,'Not a valid email');
    }
    else{
        setSuccess(email);
    }
    if (details[2] == ''){
        setError(password,'password cannot be blank');
    }else{
        setSuccess(password);
    }
    if (details[3] == ''){
        setError(passwordCheck,'passwordCheck cannot be blank');
    }else if(details[2] !== details[3]){
        setError(passwordCheck,'passwordCheck is not matching');
    }
    else{
        setSuccess(passwordCheck);
    }
}

function isEmail(email){
    var mail_format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(mail_format)){
        return true
    }
}

function setError(input, msg){
    const formControl = input.parentElement;
    var small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = msg;
}

function setSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}