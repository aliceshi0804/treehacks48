function AFTER_JOIN_INTERFACE() {
    $("#joinBut").hide();
    $("#login").show();
}

function AFTER_LOGIN_INTERFACE() {
    $("#intro").hide();
    $("#login").hide();
    $("#room").show();
}
