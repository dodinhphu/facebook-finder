function change_password() {
    if ($('#newpassword').val().trim() == '') {
        $('#tb_newpw').text('Please enter a new password');
        $('#tb_newpw').show(200);
    }
    else if ($('#check_newpassword').val().trim() == '') {
        $('#tb_checknewp').text('Please re - enter new password');
        $('#tb_checknewp').show(200);
    }
    else if ($('#newpassword').val().trim() != $('#check_newpassword').val().trim()) {
        $('#tb_checknewp').text('Password Incorrect');
        $('#tb_checknewp').show(200);
    }
    else {
        $.ajax({
            url: `/auth/changeforgotpassword`,
            method: 'POST',
            data: {
                token: window.location.search,
                newpassword: $('#newpassword').val(),
                check_newpassword: $('#check_newpassword').val()
            }
        })
            .then(function (data) {
                $('#toankhung').hide(200);
                $('#tong_tren').append('<div class= "alert alert-success" role = "alert">Thay Đỗi Thành Công</div>')
                console.log(data);
            })
            .catch(function (err) {
                if (err.status === 408) {
                    $('#tb_tong_rsmk').text(JSON.parse(err.responseText).message);
                    $('#tb_tong_rsmk').show(200);
                }
                else {
                    $('#tb_newpw').text(JSON.parse(err.responseText).errors.password.message);
                    $('#tb_newpw').show(200);
                }
            })
    }
}
function an() {
    $('#tb_checknewp').hide(200);
    $('#tb_newpw').hide(200);
    $('#tb_tong_rsmk').hide(200);
}