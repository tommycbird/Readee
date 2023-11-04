function injectCSS() {
    console.log("Injecting CSS");
    var css = document.createElement("style");
    css.href = chrome.runtime.getURL("javascript/style.css");
    css.type = 'text/css';
    css.rel = 'stylesheet';
    document.body.appendChild(css);
}

function injectButton() {
    // injectCSS();
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

            const nounParentElement = nounElement.parentElement;
            const nounParentContent = nounParentElement.textContent;
            // console.log("parent: " + nounParentContent);
            // console.log("content len:" + nounParentContent.length);
            
            const nounIndex = nounParentContent.indexOf(nounElement.textContent);

            // check for last occurence of period, exclamation point, or question mark
            const lastPeriod = (nounParentContent.lastIndexOf(". ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf(". ", nounIndex) + 2;
            const lastExclamation = (nounParentContent.lastIndexOf("! ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf("! ", nounIndex) + 2;
            const lastQuestion = (nounParentContent.lastIndexOf("? ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf("? ", nounIndex) + 2;
            // getting the index of the start of the sentence
            const sentenceStart = Math.max(lastPeriod, lastExclamation, lastQuestion);
            // console.log("last period: " + sentenceStart);

            // check for the next occurence of period, exclamation point, or question mark
            let nextPeriod = nounParentContent.length, nextExclamation = nounParentContent.length, nextQuestion = nounParentContent.length;
            nextPeriod = (nounParentContent.indexOf(". ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf(". ", nounIndex);
            nextExclamation = (nounParentContent.indexOf("! ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf("! ", nounIndex);
            nextQuestion = (nounParentContent.indexOf("? ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf("? ", nounIndex);
            // getting the index of the end of the sentence
            const sentenceEnd = Math.min(nextPeriod, nextExclamation, nextQuestion) + 1;
            // console.log("next period: " + sentenceEnd);

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
        });
    }

    // injecting noun buttons for nationalgeographic
    if (window.location.hostname === 'www.nationalgeographic.com') {
        // adding fonts awesome to the page
        const headElement = document.querySelector("head");
        const fontAwesomeLink = document.createElement("link");
        fontAwesomeLink.rel = "stylesheet";
        fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
        fontAwesomeLink.integrity = "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==";
        fontAwesomeLink.crossOrigin = "anonymous";
        fontAwesomeLink.referrerPolicy = "no-referrer";
        headElement.appendChild(fontAwesomeLink);

        const nounElements = document.querySelectorAll("section.Article__Content > p");

        nounElements.forEach(nounElement => {
            const nounButtonTitle = nounElement.textContent;
        });
    }

    // injecting noun buttons for wikipedia
    if (window.location.hostname === 'en.wikipedia.org') {
        console.log("wikipedia");

        // adding fonts awesome to the page
        const headElement = document.querySelector("head");
        const fontAwesomeLink = document.createElement("link");
        fontAwesomeLink.rel = "stylesheet";
        fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
        fontAwesomeLink.integrity = "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==";
        fontAwesomeLink.crossOrigin = "anonymous";
        fontAwesomeLink.referrerPolicy = "no-referrer";
        headElement.appendChild(fontAwesomeLink);

        const nounElements = document.querySelectorAll("div.mw-body-content > div.mw-parser-output > p > a");

        nounElements.forEach(nounElement => {
            const nounButtonTitle = nounElement.textContent;
            console.log("element: " + nounButtonTitle);

            const nounParentElement = nounElement.parentElement;
            const nounParentContent = nounParentElement.textContent;
            // console.log("parent: " + nounParentContent);
            // console.log("content len:" + nounParentContent.length);
            
            const nounIndex = nounParentContent.indexOf(nounElement.textContent);

            // check for last occurence of period, exclamation point, or question mark
            const lastPeriod = (nounParentContent.lastIndexOf(". ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf(". ", nounIndex) + 2;
            const lastExclamation = (nounParentContent.lastIndexOf("! ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf("! ", nounIndex) + 2;
            const lastQuestion = (nounParentContent.lastIndexOf("? ", nounIndex) === -1) ? 0 : nounParentContent.lastIndexOf("? ", nounIndex) + 2;
            // getting the index of the start of the sentence
            const sentenceStart = Math.max(lastPeriod, lastExclamation, lastQuestion);
            // console.log("last period: " + sentenceStart);

            // check for the next occurence of period, exclamation point, or question mark
            let nextPeriod = nounParentContent.length, nextExclamation = nounParentContent.length, nextQuestion = nounParentContent.length;
            nextPeriod = (nounParentContent.indexOf(". ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf(". ", nounIndex);
            nextExclamation = (nounParentContent.indexOf("! ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf("! ", nounIndex);
            nextQuestion = (nounParentContent.indexOf("? ", nounIndex) === -1) ? nounParentContent.length : nounParentContent.indexOf("? ", nounIndex);
            // getting the index of the end of the sentence
            const sentenceEnd = Math.min(nextPeriod, nextExclamation, nextQuestion) + 1;
            // console.log("next period: " + sentenceEnd);

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
        });
    }
}

injectButton();