const imageUpload = document.getElementById('imageUpload')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/js/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/js/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/js/models')
]).then(start)
function start() {
  const container = document.createElement('div')
  container.style.position = 'relative'
  document.body.append(container)
  let image
  let canvas
  imageUpload.addEventListener('change', async () => {
    if (image) {
      image.remove();
      let ulist = document.getElementById("ulist");
      while (ulist.hasChildNodes()) {
        ulist.removeChild(ulist.firstChild);
      }
    }
    if (canvas) canvas.remove()
    image = await faceapi.bufferToImage(imageUpload.files[0])
    const detections = await faceapi.detectAllFaces(image, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
    for (let i = 0; i < detections.length; i++) {
      await tach_face(image, detections[i].box)
    }
    let test = document.querySelectorAll('.img')
    for (let i = 0; i < test.length; i++) {
      test[i].onclick = async () => {
        const model = document.getElementById('myModal');
        const model1 = document.getElementsByClassName('modal-backdrop show')[0];
        model1.remove()
        model.style.display = 'none'
        /*model.classList.remove('show') */
        await nhan_dien(test[i]);
      }
    }
  })

}
// tách face
async function tach_face(inputImage, box) {
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
          <button >
            <img class="img" src="${cnv.toDataURL()}">
          </button>
       `
      ulist.appendChild(list);
    })
  }
}
//nhận diện
async function nhan_dien(img) {
  const anh_chon = document.getElementById('anh_chon');
  if (anh_chon) {
    anh_chon.remove();
  }
  const container = document.createElement('div')
  container.id = 'anh_chon'
  container.style.position = 'relative'
  const a = document.getElementsByClassName('body')[0];
  a.append(container)
  const labeledFaceDescriptors = await DB_dauvao()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  let image;
  let canvas;
  if (image) image.remove()
  if (canvas) canvas.remove()
  image = img;
  const a_img = document.createElement("img");
  a_img.src = image.src;
  await container.append(a_img);
  canvas = await faceapi.createCanvasFromMedia(a_img)
  await container.append(canvas)
  const displaySize = { width: a_img.width, height: a_img.height }
  await faceapi.matchDimensions(canvas, displaySize)
  const detections = await faceapi.detectSingleFace(image, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.001 }))
    .withFaceLandmarks()
    .withFaceDescriptor()
  if (detections !== undefined) {
    const resizedDetections = await faceapi.resizeResults(detections, displaySize)
    const results = await faceMatcher.findBestMatch(resizedDetections.descriptor)
    const box = await resizedDetections.detection.box
    const drawBox = await new faceapi.draw.DrawBox(box, { label: results.toString() })
    console.log('tên', results.toString())
    await drawBox.draw(canvas);
    const link_img = document.createElement("a");
    link_img.href = `/show/${results.label.toString()}`;
    console.log(results)
    link_img.innerHTML = `
    <button >
    chi tiết
    </button>
 `
    container.append(link_img);
  }


}

async function DB_dauvao() {
  let a = [];
  await fetch('http://localhost:3000/data_traning')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      a = data.data
    })
  let data = a.map(x => faceapi.LabeledFaceDescriptors.fromJSON(x))
  return data
}



