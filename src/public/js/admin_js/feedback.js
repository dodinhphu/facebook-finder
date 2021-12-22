function xoa(_id) {
    if (confirm(`Are You sure to delete Feedback  ? `)) {
        $.ajax({
            url: './feedback',
            type: "DELETE",
            data: {
                _id: _id,
            },
        })
            .then(function (response) {
                $(`#${_id}`).hide(200);
            })
            .catch(function (err) {
                console.log(err);
            })
    }
}
function update_status(_id, status) {
    $.ajax({
        url: './feedback',
        type: "POST",
        data: {
            _id: _id,
            status: status
        },
    })
        .then(function (response) {
            location.reload();
        })
        .catch(function (err) {
            console.log(err);
        })
}