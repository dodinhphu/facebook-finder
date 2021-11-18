function logout() {
    $.ajax({
        url: '/auth/logout',
        type: "POST",
    }).then(function () {
        window.location = '/auth/login';
    })
}