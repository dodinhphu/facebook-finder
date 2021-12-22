function xoa(username) {
    if (confirm(`Are You Sure to Delete User ${username} ? `)) {
        $.ajax({
            url: './delete_user',
            type: "DELETE",
            data: {
                username: username,
            },
        })
            .then(function (response) {
                $(`#${username}`).hide(300);
            })
    }
}

$('#trang').pagination({
    dataSource: `./total_page_user`,
    locator: 'data',

    totalNumberLocator: function (a) {
        return a.total;
    },
    pageSize: 5,
    afterPageOnClick: function (event, pageNumber) {
        loadpage(pageNumber);
    },
    afterPreviousOnClick: function (event, previousPageNumber) {
        loadpage(previousPageNumber);
    },
    afterNextOnClick: function (event, nextPageNumber) {
        loadpage(nextPageNumber);
    },

})
function loadpage(pageNumber) {
    $.ajax({
        url: `./total_page_user?page=${pageNumber}`,
    })
        .then(function (data) {
            let html = '';
            data.data.forEach((user, index) => {
                html += `
            <tr id="${user.username}">
                <td>${user.username}</td>
                <td>${user.fullname}</td>
                <td>${user.email}</td>
                <td style="text-align:center">${user.ngaytao}</td>
                <td class="tools">
                    <i onclick="xoa('${user.username}')" class="fas fa-trash"
                        style="color: red;"></i>
                </td>
            </tr>
               `
            });
            $('#conten_tb').html('');
            $('#conten_tb').append(html);
        })
}
