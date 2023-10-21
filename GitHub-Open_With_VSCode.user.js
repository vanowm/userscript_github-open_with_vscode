// ==UserScript==
// @name         Github - Open with VSCode
// @namespace    V@no
// @description  Fixes "Open with Visual Studio" button to open with VSCode instead
// @match        https://github.com/*
// @version      23.10.21-011323
// @license      MIT
// @run-at       document-end
// @grant        none
// ==/UserScript==

(() =>
{
	"use strict";
	/**
	 * This function fixes the link to open a GitHub repository in Visual Studio Code.
	 * It replaces the data-open-app attribute value from "visual-studio" to "vscode",
	 * adds " Code" to the link text, and updates the href attribute to launch VS Code
	 * with the clone URL of the repository.
	 * @returns {boolean} Returns true if the link element is not found.
	 */
	const fixLink = () =>
	{
		const elLink = document.querySelector('[data-open-app="visual-studio"]');
		if (!elLink)
			return true;

		// display "Launching Visual Studio Code..." message
		elLink.dataset.openApp = "vscode";
		elLink.innerHTML += " Code";
		const cloneURL = (document.querySelector(".input-group > .form-control") || {}).value;
		if (cloneURL)
			elLink.href = "vscode://vscode.git/clone?url=" + encodeURI(cloneURL);
		else
			elLink.href = elLink.href.replace("git-client://", "vscode://vscode.git/");

		//we don't need keep observing DOM changes anymore
		observer.disconnect();
	};

	const observer = new MutationObserver(fixLink);
	if (fixLink())
		observer.observe(document, {childList: true, subtree: true});
})();