
function injectButton( allKeys ) {
    console.log("Injecting Buttons");

    // injecting noun buttons for britannica
    if (window.location.hostname === 'www.britannica.com') {
        // adding fonts awesome to the page
        const headElement = document.querySelector("head");
        const fontAwesomeLink = document.createElement("link");
        fontAwesomeLink.rel = "stylesheet";
        fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
        fontAwesomeLink.integrity = "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==";
        fontAwesomeLink.crossOrigin = "anonymous";
        fontAwesomeLink.referrerPolicy = "no-referrer";
        headElement.appendChild(fontAwesomeLink);

        const nounElements = document.querySelectorAll("p.topic-paragraph > a");

        nounElements.forEach(nounElement => {
            const nounButtonTitle = nounElement.textContent;
            console.log("element: " + nounButtonTitle);

            if (!allKeys.includes(nounButtonTitle.toLowerCase())) {
                return;
            }

            const nounParentElement = nounElement.parentElement;
            const nounParentContent = nounParentElement.textContent;
            //console.log("parent: " + nounParentContent);
            //console.log("content len:" + nounParentContent.length);
            
            const nounIndex = nounParentContent.indexOf(nounElement.textContent);

            // check for last occurence of period, exclamation point, or question mark
            const lastPeriod = (nounParentContent.lastIndexOf(". ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf(". ", nounIndex) + 2;
            const lastExclamation = (nounParentContent.lastIndexOf("! ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf("! ", nounIndex) + 2;
            const lastQuestion = (nounParentContent.lastIndexOf("? ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf("? ", nounIndex) + 2;
            // getting the index of the start of the sentence
            const sentenceStart = Math.max(lastPeriod, lastExclamation, lastQuestion);
            //console.log("last period: " + sentenceStart);

            // check for the next occurence of period, exclamation point, or question mark
            let nextPeriod = nounParentContent.length, nextExclamation = nounParentContent.length, nextQuestion = nounParentContent.length;
            nextPeriod = (nounParentContent.indexOf(". ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf(". ", nounIndex);
            nextExclamation = (nounParentContent.indexOf("! ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf("! ", nounIndex);
            nextQuestion = (nounParentContent.indexOf("? ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf("? ", nounIndex);
            // getting the index of the end of the sentence
            const sentenceEnd = Math.min(nextPeriod, nextExclamation, nextQuestion) + 1;
            //console.log("next period: " + sentenceEnd);

            // getting the sentence the current noun is in
            const nounSentence = nounParentContent.substring(sentenceStart, sentenceEnd);
            console.log("sentence: " + nounSentence);

            // creating the popup element
            const popupDiv = document.createElement("div");
            popupDiv.className = "noun-popup";
            const popupButton = document.createElement("button");
            popupButton.className = "noun-popup-button";
            popupButton.textContent = nounButtonTitle;
            popupButton.appendChild(document.createTextNode(" "));
            popupDiv.appendChild(popupButton);
            
            // adding the font awesome icon
            const searchIcon = document.createElement("i");
            searchIcon.className = "fa-solid fa-magnifying-glass";
            popupButton.appendChild(searchIcon);

            // creating a popup wrapper and adding the popup and the noun element
            const popupWrapper = document.createElement("div");
            popupWrapper.className = "noun-popup-wrapper";
            popupWrapper.appendChild(popupDiv);
            popupWrapper.appendChild(nounElement.cloneNode(true));
            nounParentElement.replaceChild(popupWrapper, nounElement);

            console.log("success");

            // call popup window
            renderPopup(nounButtonTitle, nounSentence);
        });
    }




    // // injecting noun buttons for nationalgeographic
    // if (window.location.hostname === 'www.nationalgeographic.com') {
    //     // adding fonts awesome to the page
    //     const headElement = document.querySelector("head");
    //     const fontAwesomeLink = document.createElement("link");
    //     fontAwesomeLink.rel = "stylesheet";
    //     fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
    //     fontAwesomeLink.integrity = "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==";
    //     fontAwesomeLink.crossOrigin = "anonymous";
    //     fontAwesomeLink.referrerPolicy = "no-referrer";
    //     headElement.appendChild(fontAwesomeLink);

    //     const nounElements = document.querySelectorAll("section.Article__Content > p");

    //     nounElements.forEach(nounElement => {
    //         const nounButtonTitle = nounElement.textContent;
    //     });
    // }

    // // injecting noun buttons for wikipedia
    // if (window.location.hostname === 'en.wikipedia.org') {
    //     console.log("wikipedia");

    //     // adding fonts awesome to the page
    //     const headElement = document.querySelector("head");
    //     const fontAwesomeLink = document.createElement("link");
    //     fontAwesomeLink.rel = "stylesheet";
    //     fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
    //     fontAwesomeLink.integrity = "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==";
    //     fontAwesomeLink.crossOrigin = "anonymous";
    //     fontAwesomeLink.referrerPolicy = "no-referrer";
    //     headElement.appendChild(fontAwesomeLink);

    //     const nounElements = document.querySelectorAll("div.mw-body-content > div.mw-parser-output > p > a");

    //     nounElements.forEach(nounElement => {
    //         const nounButtonTitle = nounElement.textContent;
    //         console.log("element: " + nounButtonTitle);

    //         const nounParentElement = nounElement.parentElement;
    //         const nounParentContent = nounParentElement.textContent;
    //         // console.log("parent: " + nounParentContent);
    //         // console.log("content len:" + nounParentContent.length);
            
    //         const nounIndex = nounParentContent.indexOf(nounElement.textContent);

    //         // check for last occurence of period, exclamation point, or question mark
    //         const lastPeriod = (nounParentContent.lastIndexOf(". ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf(". ", nounIndex) + 2;
    //         const lastExclamation = (nounParentContent.lastIndexOf("! ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf("! ", nounIndex) + 2;
    //         const lastQuestion = (nounParentContent.lastIndexOf("? ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf("? ", nounIndex) + 2;
    //         // getting the index of the start of the sentence
    //         const sentenceStart = Math.max(lastPeriod, lastExclamation, lastQuestion);
    //         // console.log("last period: " + sentenceStart);

    //         // check for the next occurence of period, exclamation point, or question mark
    //         let nextPeriod = nounParentContent.length, nextExclamation = nounParentContent.length, nextQuestion = nounParentContent.length;
    //         nextPeriod = (nounParentContent.indexOf(". ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf(". ", nounIndex);
    //         nextExclamation = (nounParentContent.indexOf("! ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf("! ", nounIndex);
    //         nextQuestion = (nounParentContent.indexOf("? ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf("? ", nounIndex);
    //         // getting the index of the end of the sentence
    //         const sentenceEnd = Math.min(nextPeriod, nextExclamation, nextQuestion) + 1;
    //         // console.log("next period: " + sentenceEnd);

    //         // getting the sentence the current noun is in
    //         const nounSentence = nounParentContent.substring(sentenceStart, sentenceEnd);
    //         console.log("sentence: " + nounSentence);

    //         // creating the popup element
    //         const popupDiv = document.createElement("div");
    //         popupDiv.className = "noun-popup";
    //         const popupButton = document.createElement("button");
    //         popupButton.className = "noun-popup-button";
    //         popupButton.textContent = nounButtonTitle;
    //         popupButton.appendChild(document.createTextNode(" "));
    //         popupDiv.appendChild(popupButton);
            
    //         // adding the font awesome icon
    //         const searchIcon = document.createElement("i");
    //         //searchIcon.className = "fa-solid fa-magnifying-glass";
    //         popupButton.appendChild(searchIcon);

    //         // creating a popup wrapper and adding the popup and the noun element
    //         const popupWrapper = document.createElement("div");
    //         popupWrapper.className = "noun-popup-wrapper";
    //         popupWrapper.appendChild(popupDiv);
    //         popupWrapper.appendChild(nounElement.cloneNode(true));
    //         nounParentElement.replaceChild(popupWrapper, nounElement);

    //         console.log("success");
    //     });
    // }
}

function killPopup() {
    console.log("Killing Popup...");
    // Find the popup element
    const popup = document.querySelector('.popup');
    // Remove the popup element
    popup.remove();
}

function renderPopup(key, sentence) {
    console.log("Rendering Popup...");
    // Fetch the content of popup.html
    fetch(chrome.runtime.getURL('../popup.html'))
        .then(response => response.text())
        .then(data => {
        // Create a new div element
        const popup = document.createElement('div');
        // Set the innerHTML of the div to the fetched data
        popup.innerHTML = data;

        // Find elements and update them
        // let title = popup.querySelector('.title-selector');
        // let content = popup.querySelector('.content-selector');
        // title.textContent = key;
        // content.textContent = sentence;

        // Append the popup to the body
        document.body.appendChild(popup);


        // Make sure your popup is visible and on the forefront
        popup.style.zIndex = 10000; // Example z-index, it should be higher than other elements
        popup.style.width = '100vw';
        popup.style.height = '100vh';
        popup.style.position = 'fixed'; // So that it stays in the viewport
        // popup.style.top = '50%'; // Center it
        // popup.style.left = '50%'; // Center it
        // popup.style.transform = 'translate(-50%, -50%)'; // Adjust for exact center
    })
        .catch(error => {
        // Handle any errors that occurred during fetch
        console.error('Error loading the popup:', error);
    });
}
  


// fetching the list of echo3D models
async function getJSON() {
    // making the array to store all the keys
    let allKeys = [];

    // Use the fetch API to load the JSON file
    const jsonURL = chrome.runtime.getURL("3DData.json");
    fetch(jsonURL)
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the JSON in the response
            return response.json();
        })
        .then(data => {
            // Loop through each property in the object
            for (let id in data) {
                if (data.hasOwnProperty(id)) {
                // Concatenate the keys from this entry into the allKeys array
                allKeys = allKeys.concat(data[id].keys);
                }
            }

            // allKeys now contains all the words in "keys"
            console.log(allKeys); // Output the array to the console
        }).then(() => {
            // inject the buttons
            injectButton(allKeys);
        })
        .catch(error => {
            // If there is any error you will catch them here
            console.error('There was a problem with the fetch operation:', error);
        });

    return allKeys;
}

getJSON();