/* Echo3D SDK access */

// Echo3D model entry ID
var inputEntryID = "7c63494f-76ca-4bcd-a8bf-1f66a6710079";
var QRLink = "";
console.log("Loading asset: " + inputEntryID);
console.log("QR Link: " + QRLink);

var response = {};

// toggle view between 3D and QR Code
function toggleView() {
    var qrView = $('#qr-view');
    var modelViewer = $('#modelViewer');

    if (qrView.hasClass('hidden')) {
        qrView.removeClass('hidden');
        modelViewer.addClass('hidden');
    } else {
        qrView.addClass('hidden');
        modelViewer.removeClass('hidden');
    }

    //change button element text to 3d or AR
    var button = $('#toggle-button');
    if (button.text() == "AR") {
        button.text("3D");
    } else {
        button.text("AR");
    }
}

// recomputes QR code
function fetchQR() {
    // get class qr-code
    const qrCode = document.getElementById('qr-code');
    // set src attribute
    qrCode.src = QRLink;
}


// change model
function changeModel(entryID) {
    inputEntryID = entryID;
}

// get api_key
function getApiKey() {
    return 'ancient-rain-5372';
}

// get sec_key
function getSecKey() {
    return '';
}



// "additionalData": {
// "grWebXRStorageID": "b888814-01c3-44be-b005-4a183266c479. pg"
// "screenshotStorageID": "6af76ce2-2f57-4ed0-82d8-42652f0eddbe. png",
// "grWebARStorageFilename": "qr _webar _misty-resonance-6489. png"

// get image from api response
function getImage() {
    const picRef = response.db.inputEntryID.additionalData.screenshotStorageID;
    console.log("Image: " + picRef);
    return picRef;
}

// log API response in console
function logResult(res) {
    console.log("Echo3D API response:");
    console.log(res);
}

// view 3D model
async function viewModel() {
    // initialize
    const echoApi = new Echo3DApi(getApiKey(), getSecKey());
    // query for specific Entry
    let result = await echoApi.queryEntry(inputEntryID);
    response=result;
    logResult(result);
    let glbHologramStorageID = JSON.parse(result).db[inputEntryID].additionalData.glbHologramStorageID;
    let imageStorageID = JSON.parse(result).db[inputEntryID].additionalData.screenshotStorageID;
    let QRCodeStorageID = JSON.parse(result).db[inputEntryID].additionalData.qrWebARStorageID;
    QRLink = "https://api.echo3d.co/query?key="+getApiKey()+"&secKey="+getSecKey()+"&file="+QRCodeStorageID;
    fetchQR();
    let newSrc = "https://storage.echo3d.com/0_model_samples/" + glbHologramStorageID;
    let newEnvironmentImage = "";
    let newPoster = "https://api.echo3d.co/query?key="+getApiKey()+"&secKey="+getSecKey()+"&file="+imageStorageID;
    $('#modelViewer').attr("src", newSrc);
    $('#modelViewer').attr("environment-image", newEnvironmentImage);
    $('#modelViewer').attr("poster", newPoster);
}


// driver function

function computeRender(){
    console.log("Computing render...");
    viewModel();
    fetchQR();
}
