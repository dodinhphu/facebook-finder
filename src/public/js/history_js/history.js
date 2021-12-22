$('#trang').pagination({
    dataSource: `./history/total`,
    locator: 'data',

    totalNumberLocator: function (a) {
        return a.total;
    },
    pageSize: 4,
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
        url: `./history/total?page=${pageNumber}`,
    })
        .then(function (data) {
            let html = '';
            data.data.forEach((profile, index) => {
                html += `
                <div class="col-lg-6">
                <div class="tong_card__ card shadow ">
                    <div class="card____ row g-0">
                        <div class="col-md-6">
                            <div class="anh__" style="background-image: url(${profile.avt_imgs[0]})"></div>
                        </div>
                        <div class="col-md-6">
                            <div class="conten__ card-body">
                                <h5 class="ten__ card-title">${profile.name}</h5>
                                <div class="item__ ngaysinh__">
                                    <span class="indam">Ngày Sinh: </span>
                                    <span>${profile.ngaysinh}</span>
                                </div>
                                <div class="item__ gioitinh__">
                                    <span class="indam">Giới Tính: </span>
                                    <span>${profile.gioitinh}</span>
                                </div>
                                <div class="item__ diachi__">
                                    <span class="indam">Địa Chỉ: </span>
                                    <span>${profile.address}</span>
                                </div>
                                <div class="item__ like__">
                                    <div class="txt_text"><span class="indam">Thích:</span>
                                        ${profile.page}
                                    </div>
                                </div>
                                <div class="chi_tiet__">
                                    <a href="./show/details/${profile.profile_id}">
                                        <button class="btn btn-primary">
                                            Chi Tiết
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
               `
            });
            $('#tong__tong').html('');
            $('#tong__tong').append(html);
        })
}
