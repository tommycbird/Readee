/* Echo3D SDK access */

// Echo3D model entry ID
var inputEntryID = "7c63494f-76ca-4bcd-a8bf-1f66a6710079";
var QRLink = constructQRLink();
console.log("Loading asset: " + inputEntryID);
console.log("QR Link: " + QRLink);

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
    qrCode.src = "https://api.qrserver.com/v1/create-qr-code/?data=" + QRLink + "&size=450x450";
}


// change model
function changeModel(entryID) {
    inputEntryID = entryID;
    viewModel()
}

// get api_key
function getApiKey() {
    return 'misty-resonance-6489';
}

// get sec_key
function getSecKey() {
    return 'Tbq3F8GdH41Q8KfvI0yxcZeT';
}

// log API response in console
function logResult(res) {
    console.log("Echo3D API response:");
    console.log(res);
}

// construct QR link
function constructQRLink(){
    return "https://api.echo3d.com/webar?key=" + getApiKey() + "&entry=" + inputEntryID;
}

// view 3D model
async function viewModel() {
    // initialize
    const echoApi = new Echo3DApi(getApiKey(), getSecKey());
    // query for specific Entry
    let result = await echoApi.queryEntry(inputEntryID);
    logResult(result);
    let glbHologramStorageID = JSON.parse(result).db[inputEntryID].additionalData.glbHologramStorageID;
    let newSrc = "https://storage.echo3d.com/0_model_samples/" + glbHologramStorageID;
    let newEnvironmentImage = "";
    let newPoster = "";
    $('#modelViewer').attr("src", newSrc);
    $('#modelViewer').attr("environment-image", newEnvironmentImage);
    $('#modelViewer').attr("poster", newPoster);
}


// driver function

function computeRender(){
    viewModel();
    fetchQR();
}
