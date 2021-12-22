function gui() {
    if ($('#phone').val().trim() == '') {
        $('#tb_phone').text('Please enter Phone Number')
        $('#tb_phone').show(200)
    }
    else if ($('#tieude').val().trim() == '') {
        $('#tb_tieude').text('Please enter subject')
        $('#tb_tieude').show(200);
    }
    else if ($('#noidung').val().trim() == '') {
        $('#tb_noidung').text('Please enter message')
        $('#tb_noidung').show(200);
    }
    else if ((validateNumber($('#phone').val())) == false) {
        $('#tb_phone').text('Phone number Incorrect format')
        $('#tb_phone').show(200)
    }
    else {
        $.ajax({
            url: '/contact',
            method: 'POST',
            data: {
                username: $('#username').val(),
                email: $('#email').val(),
                fullname: $('#fullname').val(),
                number_phone: $('#phone').val(),
                Subject: $('#tieude').val(),
                content_feedback: $('#noidung').val()
            }
        }).then(function (data) {
            $('#phone').attr('readonly', true);
            $('#tieude').attr('readonly', true);
            $('#noidung').attr('readonly', true);
            $('.btn_str').hide(300);
            $('#tong_tbaaa').show(300);
        })
            .catch(function (error) {
                console.log(error)
            })
    }
}
function validateNumber(value) {
    return (!isNaN(Number(value)));
}
function an() {
    $('.tb_ct').hide(200)
}