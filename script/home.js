function login_modal() {
    // console.log("click");
    document.getElementById("modal-login").style.display = "block";
}
function close() {
    // console.log("click");
    document.getElementById("modal-login").style.display = "none";
    document.getElementById("modal-signup").style.display = "none";
}
function switchToSignup() {
    // console.log("click");
    document.getElementById("modal-login").style.display = "none";
    document.getElementById("modal-signup").style.display = "block";
}
function signup_modal() {
    // console.log("click");
    document.getElementById("modal-login").style.display = "none";
    document.getElementById("modal-signup").style.display = "block";
}
function login_request() {
    console.log("click");
    console.log(document.getElementsByClassName("login_data"));
}
function signup_request() {
    console.log("click");
    console.log(document.getElementsByClassName("signup_data"));
}
// function logout() {
//     console.log("Bye");
//     $.ajax({
//         url: "/auth/logout",
//         type: "GET",
//         success: function(){
//             alert("Logout Sucessfully");
//             // window.location.reload("/");
//     }}); 
// }