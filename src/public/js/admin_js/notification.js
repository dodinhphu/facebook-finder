function them() {
    if ($('#txt_tieude').val().trim() == '') {
        $('#tb__td').text('Please enter title')
        $('#tb__td').show(300);
    }
    else if ($('#txt_loai').val().trim() == '') {
        $('#tb__loai').text('Please choose a type')
        $('#tb__loai').show(300);
    }
    else if ($('#txt_noidung').val().trim() == '') {
        $('#tb__nd').text('Please enter content')
        $('#tb__nd').show(300);
    }
    else {
        $.ajax({
            url: "./notification",
            method: "POST",
            data: {
                loai: $('#txt_loai').val(),
                tieude: $('#txt_tieude').val(),
                noidung: $('#txt_noidung').val(),
            }
        })
            .then(function (response) {
                $('#txt_loai').val('1');
                $('#txt_tieude').val('');
                $('#txt_noidung').val('');
                let tb = $(`
            <div id="qmk_true">
                <div id="tb_quenmk_true">
                    <i class="icon_qmk fas fa-check-square"></i>
                    <div id="txt_tbqmk_true">
                        <h6 class='tbtbtbt'>Add success notification</h6>
                        <div class='tb__ tb_titel'>
                            <span>Titel:</span>
                            <p>${response.tieude}</p>
                        </div>
                        <div class='tb__ tb_tyfe'>
                            <span>Tyfe:</span>
                            <p>${phanloai(response.loai)}</p>
                        </div>
                        <div class='tb__ tb_content'>
                            <span>Content:</span>
                            <p>${response.noidung}</p>
                        </div>
                    </div>
                </div>
            </div>                               
            `)
                $('#form_nhap').hide(200);
                $('#btn_them').hide(200);
                $('#body_module').append(tb);
                $('#btn_close').text('OK');
                $('#btn_close').css({
                    'background-color': '#0b5ed7 ',
                    'border-color': '#0a58ca ;'
                })
                $('#conten_tb').prepend(`
                <tr id="${response.id}">
                    <td style="text-align:center">${phanloai(response.loai)}</td>
                    <td>${response.tieude}</td>
                    <td style="max-width: 770px;">${response.noidung}</td>
                    <td>${response.thoigian}</td>
                    <td class="tools">
                        <i onclick="xoa('${response.id}')" class="fas fa-trash"
                            style="color: red;text-align:center"></i>
                    </td>
                </tr>
        `)

            })
            .catch(function (err) {
                console.log(err);
            })
    }

}
function phanloai(a) {
    if (a === '1') {
        return '<span class="chumau badge bg-primary">Notification</span>'
    }
    else if (a === '2') {
        return '<span class="chumau badge bg-warning text-dark">Require</span>'
    }
    else if (a == '3') {
        return '<span class="chumau badge bg-danger">Warning</span>'
    }
    else {
        return '<span class="chumau badge bg-info text-dark">Others</span>'
    }
}
function reset() {
    $('#qmk_true').remove();
    $('#form_nhap').show();
    $('#btn_them').show();
    $('#btn_close').text('Close');
    $('#btn_close').css({
        'background-color': '#6c757d ',
        'border-color': '#6c757d ;'
    })

}
function xoa(id) {
    if (confirm(`Are you sure to delete Notification ? `)) {
        $.ajax({
            url: "./notification",
            method: "PUT",
            data: {
                id: id
            }
        })
            .then(function (response) {
                $(`#${id}`).hide(100);
            })
            .catch(function (err) {
                console.log(err);
            })
    }
}

function an() {
    $('._tb').hide(200);
}