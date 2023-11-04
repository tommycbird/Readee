/* Echo3D SDK access */

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

async function viewModel(inputEntryID) {
    if (inputEntryID == "test") {
        inputEntryID = "7c63494f-76ca-4bcd-a8bf-1f66a6710079";
    }

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

