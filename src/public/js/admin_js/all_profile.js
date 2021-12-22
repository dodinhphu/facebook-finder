$('#trang').pagination({
    dataSource: `./total_page_profile`,
    locator: 'data',

    totalNumberLocator: function (a) {
        return a.total;
    },
    pageSize: 10,
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
        url: `./total_page_profile?page=${pageNumber}`,
    })
        .then(function (data) {
            let html = '';
            data.data.forEach((profile, index) => {
                
                html += `
                <tr id="${profile._id}">
                   <td>${profile.profile_id}</td>
                   <td>${profile.name}</td>
                   <td>${profile.address}</td>
                   <td class="so">${profile.gioitinh}</td>
                   <td class="so">${profile.ngaysinh}</td>
                   <td class="so">${profile.imgs.length}</td>
                   <td class="so">${profile.avt_imgs.length}</td>
                   <td>
                       <div class="tools">
                           <i onclick="xoa('${profile.profile_id}','${profile._id}')" class="fas fa-trash" style="color: red;"></i>
                           <a href="../show/details/${profile.profile_id}"><i class="fas fa-user-circle"></i></a>
                       </div>
                   </td>
               </tr>`
            });
            $('#conten_tb').html('');
            $('#conten_tb').append(html);
        })
}


function xoa(profile_id, _id) {
    if (confirm(`Are You Sure to Delete Profile ${profile_id} ? `)) {
        $.ajax({
            url: './delete_profile',
            type: "DELETE",
            data: {
                profile_id: profile_id,
            },
        })
            .then(function (response) {
                $(`#${_id}`).hide(200);
            })
    }
}