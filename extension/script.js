

// inject buttons onto key words
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

            // Attach event listener to the button
            popupButton.addEventListener('click', function() {
                renderPopup(nounButtonTitle, nounSentence);
            });
        });
    }

}

function killPopup() {
    console.log("Killing Popup...");
    var popup = document.getElementById('popup');
    // Check if the element actually exists
    if (popup!=null) {
        popup.remove();
        console.log('Popup removed.');
    } else {
        // If the element is null, log an error message
        console.log('Error: Tried to remove a popup that does not exist.');
    }
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

        // Append the popup to the body
        document.body.appendChild(popup);

        popup.id = 'popup';

        // Make sure your popup is visible and on the forefront
        popup.style.zIndex = 2147483647; // Example z-index, it should be higher than other elements
        popup.style.width = '100vw';
        popup.style.height = '100vh';
        popup.style.position = 'fixed'; // So that it stays in the viewport

        // Add event listeners to the close button and toggle button
        popup.querySelector('.close-button').addEventListener('click', killPopup);
        popup.querySelector('#toggle-button').addEventListener('click', toggleView);
        
        // Set render parameters and compute  --> MAKE THIS DYNAMIC <--
        changeModel("7c63494f-76ca-4bcd-a8bf-1f66a6710079");
        computeRender();
        
        // Set definition parameters and overwrite
        const headerElement = popup.querySelector('.modal-header .head');
        const textElement = popup.querySelector('.modal-body .modal-text');

        // Change the text content
        headerElement.textContent = key;
        const definition = fetchDefGPT(key, sentence);
        if (definition != null && definition != "") {
            textElement.textContent = definition;
        } else {
            textElement.textContent = "Definition not found...";
        }
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