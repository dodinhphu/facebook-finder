
$.ajax({
    url: './admin/api/home',
    type: "POST",
}).then(function (data) {
    /* tính phần trăm */
    let pt_crawling_true = (data.tong_profile_true * 100) / data.tong_profile;
    let pt_crawling_false = ((data.tong_profile - data.tong_profile_true) * 100) / data.tong_profile;
    let pt_tranning = (data.tong_tranning * 100) / data.tong_profile;
    var barData = {

        labels: ['Total Profile', 'Crawling', 'Tranning', 'Not Crawling'],

        datasets: [

            {
                label: 'cot1',

                fillColor: "#68B3C8",

                strokeColor: "#48A4D1",

                data: [100, pt_crawling_true, pt_tranning, pt_crawling_false]

            },
        ],


    }
    // get bar chart canvas
    var income = document.getElementById("income").getContext("2d");
    // draw bar chart
    new Chart(income).Bar(barData);
    var pieData = [
        {
            value: pt_crawling_true,
            color: "#F3BB45"
        },
        {
            value: pt_crawling_false,
            color: "#EB5E28"
        },
        {
            value: pt_tranning,
            color: "#20c997"
        },

    ];

    // pie chart options
    var pieOptions = {
        segmentShowStroke: false,
        animateScale: true
    }

    // get pie chart canvas
    var countries = document.getElementById("countries").getContext("2d");

    // draw pie chart
    new Chart(countries).Pie(pieData, pieOptions);
})