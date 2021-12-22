const imageUpload = document.getElementById('imageUpload')
$(document).ready(function () {

})
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/js/home_js/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/js/home_js/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/js/home_js/models')
]).then(start)
function start() {
  let image;
  let loader_nho = $(`<div id="loader_nho" class='loader'></div>`)
  imageUpload.addEventListener('change', async () => {
    $('#btn_search').hide();
    /*   $('#search').append(loader_nho); */
    $('#tong_load').show();
    await hienthianh(imageUpload);
    /* xóa face cũ */
    removeFace();
    /* tạo ảnh */
    image = await faceapi.bufferToImage(imageUpload.files[0])
    /* nhận diện ảnh */
    const detections = await faceapi.detectAllFaces(image, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
    /* tách các khuôn mặt từ ảnh */
    for (let i = 0; i < detections.length; i++) {
      await faceSeparation(image, detections[i].box, i)
    }

    /* $('#loader').remove(); */
    let test = document.querySelectorAll('.img_nho')
    for (let i = 0; i < test.length; i++) {
      test[i].onclick = async () => {
        const model = document.getElementById('myModal');
        const model1 = document.getElementsByClassName('modal-backdrop show')[0];
        model1.remove()
        model.style.display = 'none';
        let loader = $(`<div id="loader">
        <h1 h1 class= "h1" >
            <span>F</span>
            <span>a</span>
            <span>c</span>
            <span>e</span>
            <span>b</span>
            <span>o</span>
            <span>o</span>
            <span>k</span>
            <span>F</span>
            <span>i</span>
            <span>n</span>
            <span>d</span>
            <span>e</span>
            <span>r</span>
        </h1>

        <div class="google-loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div >
`)
        $('.app').append(loader);
        await nhan_dien(test[i]);
      }
    }
    $('#btn_search').show();
    /* $('#loader_nho').remove() */
    $('#tong_load').hide();
  })

}
async function faceSeparation(inputImage, box, i) {
  const regionsToExtract = [
    new faceapi.Rect(box.x - 50, box.y - 70, box.width + 80, box.height + 90)
  ]
  let faceImages = await faceapi.extractFaces(inputImage, regionsToExtract)
  if (faceImages.length == 0) {
    console.log('Face not found');
  }
  else {
    faceImages.forEach(cnv => {
      let ulist = document.getElementById('ulist')
      let list = document.createElement('li')
      list.innerHTML =
        `
          <button type="submit">
            <img id=${i} class="img_nho" src="${cnv.toDataURL()}">
          </button>
       `
      ulist.appendChild(list);
    })
  }
}


function hienthianh(img) {
  if (img && img.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('img').src = e.target.result;
    }
    reader.readAsDataURL(img.files[0]);
  }
}
/* xóa face cũ */
function removeFace() {
  let ulist = document.getElementById("ulist");
  while (ulist.hasChildNodes()) {
    ulist.removeChild(ulist.firstChild);
  }
}

// tách face




//nhận diện
async function nhan_dien(img) {

  let image;
  let canvas;
  if (image) image.remove()
  if (canvas) canvas.remove()
  image = img;
  const a_img = document.createElement("img");
  a_img.src = image.src;
  const displaySize = { width: a_img.width, height: a_img.height }
  const detections = await faceapi.detectSingleFace(image, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.001 }))
    .withFaceLandmarks()
    .withFaceDescriptor()
  if (detections !== undefined) {
    const resizedDetections = await faceapi.resizeResults(detections, displaySize);
    /*  db đầu vào */
    let labeledFaceDescriptors = await DB_dauvao();
    let faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    let results = await faceMatcher.findBestMatch(resizedDetections.descriptor)
    let list_profile = [];
    while (results.distance <= 0.6) {
      console.log(results.label, results.distance)
      list_profile.push(results.label)
      labeledFaceDescriptors = labeledFaceDescriptors.filter(function (data) {
        return data.label != results.label
      })
      faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
      results = await faceMatcher.findBestMatch(resizedDetections.descriptor)
    }
    let myform = document.createElement('form');
    myform.id = 'myform';
    myform.setAttribute('method', 'POST');
    myform.setAttribute('action', '/show/list');
    myform.innerHTML = `<input id="my_input" name="data" type="text">`
    document.body.appendChild(myform);
    myform.style.display = 'none';
    let my_input = document.getElementById('my_input');
    my_input.value = JSON.stringify(list_profile);
    myform.submit();
  }


}

async function DB_dauvao() {
  let a = [];
  await fetch('./api/face')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      a = data
    })
  let data = a.map(x => faceapi.LabeledFaceDescriptors.fromJSON(x))
  return data
}





