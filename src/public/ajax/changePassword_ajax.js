function doimk() {
    if ($('#txt_username').val().trim() && $('#txt_name').val().trim() && $('#txt_email').val().trim() && $('#txt_password').val().trim() && $('#txt_newpassword').val().trim() && $('#txt_checknewpassword').val().trim()) {
        let newpassword = $('#txt_newpassword').val().toString().trim();
        let checknewpassword = $('#txt_checknewpassword').val().toString().trim();
        if (newpassword === checknewpassword) {
            $.ajax({
                url: './changepassword',
                type: "POST",
                data: {
                    username: $('#txt_username').val().toString().trim(),
                    fullname: $('#txt_name').val().toString().trim(),
                    email: $('#txt_email').val().toString().trim(),
                    password: $('#txt_password').val().toString().trim(),
                    newpassword: $('#txt_newpassword').val().toString().trim(),
                },
            }).then(function (response) {
                $('#tb_tong_dung').show(200);
                $('#txt_name').val("");
                $('#txt_password').val("");
                $('#txt_newpassword').val("");
                $('#txt_checknewpassword').val("");
            })
                .catch(function (err) {
                    if (err.status === 405) {
                        $('#tb_newpass').text(JSON.parse(err.responseText).errors.password.message);
                        $('#tb_newpass').show(200);
                        $('#tb_tong_sai').show(200);
                    }
                    if (err.status === 401) {
                        $('#tb_pass').text(JSON.parse(err.responseText).message);
                        $('#tb_pass').show(200);
                        $('#tb_tong_sai').show(200);
                    }
                })
        }
        else {
            $('#tb_check').show(200);
        }
    }

}
function an() {
    $('#tb_tong_dung').hide(200);
    $('#tb_tong_sai').hide(200);
    $('.tb_check').hide(200);
}