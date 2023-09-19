$(document).ready(function () {

    sessionStorage.removeItem('login');
    $('body').on('submit', '#frmLogin', function (e) {

        var u = $('input[name="Username"]').val();
        var p = $('input[name="Password"]').val();
        if (u === 'admin' && p === 'admin123.') {
            sessionStorage.setItem("login", true);
            location.href='./'
        }

    })

})