function login() {
    $.ajax({
        url: document.location.pathname + document.location.search,
        type: "POST",
        data: {
            username: $('#username').val().toString(),
            password: $('#password').val().toString()
        },
    }).then(data => {
        let checkbox = document.getElementById('customCheck1');
        if (checkbox.checked) {
            setCookie('token', data.data.token_key, 14);
            setCookie('username', data.data.username, 14);
        }
        else {
            setCookie('token', data.data.token_key);
            setCookie('username', data.data.username);
        }

        if (data.data.prevlink) {
            window.location = `..${data.data.prevlink}`;
        }
        else {
            window.location = `../home`;
        }
    })
        .catch(err => {
            let tb = document.getElementById('tb');
            tb.innerText = err.responseJSON.message;
            $('#tb').show(200);

            setTimeout(function () {
                $('#tb').hide(1000);
            }, 3000)
        })
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function quen_mk() {
    $('#noidungmodule').css('background-color', '#ccc');
    $('#noidungmodule').append('<div id="loader" class="loader"></div>')
    $('#username_quen').attr('readonly', true);
    $('#username_quen').css('cursor',"not-allowed");
    $.ajax({
        url: './forgotpassword',
        method: 'POST',
        data: {
            username: $('#username_quen').val().trim(),
        }
    }).then(function (response) {
        $('#loader').remove();
        $('#username_quen').attr('readonly', false);
        $('#username_quen').css('cursor',"text");
        $('#noidungmodule').css('background-color', '#fff');
        $('#txt_tbqmk_true').text(`Please check your emails ${response.accepted[0]}`);
        $('#username_quen').val('');
        $('#username_quen').hide();
        $('#btn_qmk_ctn').hide();
        $('#qmk_true').show(200);
    })
        .catch(function (error) {
            $('#loader').remove();
            $('#username_quen').attr('readonly', false);
            $('#username_quen').css('cursor',"text");
            $('#noidungmodule').css('background-color', '#fff');
            $('#txt_tbqmk_false').text(JSON.parse(error.responseText).message);
            $('#qmk_false').show(200);
        })
}
function an_qmk() {
    $('#username_quen').val('');
    $('#qmk_false').hide(200);
    $('#qmk_true').hide(200);
}
function hien_qmk() {
    $('#username_quen').show();
    $('#btn_qmk_ctn').show();
}