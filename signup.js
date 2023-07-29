const uName = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const signupBtn = document.getElementById('signup-btn');
const errorAlert = document.getElementById('error-message');


function generate16ByteToken() {
    // generate random numbers of length 16
    const array = new Uint8Array(16);
    // The Crypto.getRandomValues() method lets us get cryptographically strong random values.
    window.crypto.getRandomValues(array);
    // toString(16) make our string to hexadecimal form
    const token = Array.from(array, byte => byte.toString(16).padStart(2,'0')).join('');
    return token;
}
// handle redirection to profile 
if(isLoggedIn()){
    window.location.href='profile.html';
}

// check existing user
function isLoggedIn() {
    let user = JSON.parse(localStorage.getItem('users'));
    return user !== null && user.token !== null;
}

// save user
function saveUser(fullName, email, password){
    const userObj = {
        fullName: fullName,
        email: email,
        token: generate16ByteToken(),
        password: password
    }
    let users = JSON.parse(localStorage.getItem('users'));
    if(users === null){
        users = [];
    }
    // add user into our localstorage 
    users.push(userObj);
    localStorage.setItem('users',JSON.stringify(users));

    // redirect to profile page
    window.location.href='profile.html';
}

// signup event
signupBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // invalid input
    if(uName.value.trim() === '' || 
        email.value.trim() === '' || 
        password.value.trim() === '' || 
        confirmPassword.value.trim() === ''){
        errorAlert.innerText = 'Error: All fields are mandatory!'
        errorAlert.style.display = 'block';
        return;
    }    
    // password matching
    if(password.value.trim() !== confirmPassword.value.trim()){
        errorAlert.innerText = 'Error: password not matching.';
        errorAlert.style.display = 'block';
        password.value = '';
        confirmPassword.value = '';
        return;
    }
    if(isLoggedIn()){
        window.location.href='profile.html';
    }else{
        saveUser(uName.value, email.value, password.value);    
    }

})


