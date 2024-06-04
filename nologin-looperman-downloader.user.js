// ==UserScript==
// @name         NoLogin Looperman Downloader
// @license      MIT
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Simple script that allows you to download loops without logging in on looperman
// @author       realcoloride
// @match        https://www.looperman.com/loops*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=looperman.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    try {
        const similarElements = document.querySelectorAll('div[class^="player-wrapper"]');

        similarElements.forEach((container) => {
            // Get the link from a data attribute or similar
            const link = container.getAttribute("rel");
            
            // Find the play button
            const playButton = container.querySelector("div.player-buttons div.jp-play");
            
            // Create a new anchor (link) element for the download button
            const downloadButton = document.createElement("a");
            const downloadText = document.createElement("span");
            downloadText.innerText = "Download";  // Set the text for the button
            
            // Append the text span to the download button
            downloadButton.appendChild(downloadText);
            
            // Clone the class list from the play button to the download button
            downloadButton.className = playButton.className;

            // Optionally add or modify classes specific to the download button
            downloadButton.classList.add("jp-download"); // Add a specific class for download button if needed
            downloadButton.classList.remove("jp-play");  // Remove play-specific classes if not applicable

            // Set properties of the download button
            downloadButton.href = link;  // Set the link for download
            downloadButton.setAttribute("title", "Download loop");
            downloadButton.setAttribute("download", "");  // Ensure it acts as a download link

            // Insert the download button just after the play button in the DOM
            playButton.parentNode.insertBefore(downloadButton, playButton.nextSibling);
        });
    } catch (error) {
        console.error("Failed to create download buttons:", error);
    }
})();

