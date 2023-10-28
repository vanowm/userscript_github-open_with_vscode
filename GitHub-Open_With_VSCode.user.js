// ==UserScript==
// @name         Github - Open with VSCode
// @namespace    V@no
// @description  Adds "Open with VSCode" button
// @match        https://github.com/*
// @version      23.10.28-125044
// @license      MIT
// @run-at       document-end
// @grant        none
// ==/UserScript==

(() =>
{
	"use strict";
	const fixLink = () =>
	{
		const elA_DownloadZip = document.querySelector(`[data-open-app="link"]`);
		if (!elA_DownloadZip)
			return true;

		const elLi_DownloadZip = elA_DownloadZip.parentNode;
		const elA_VStudio = document.querySelector('[data-open-app="visual-studio"]');
		let elLi_VSCode;
		let elA_VSCode;
		if (elA_VStudio)
		{
			const elLiVStudio = elA_VStudio.parentNode;
			elLi_VSCode = elLiVStudio.cloneNode(true);
			elA_VSCode = elLi_VSCode.querySelector("a");
			const elImg_Vstudio = document.createElement("img");
			elImg_Vstudio.classList.add("mr-2");
			elImg_Vstudio.src = "https://raw.githubusercontent.com/vanowm/userscript_github-open_with_vscode/master/media/vstudio.svg";
			elA_VStudio.prepend(elImg_Vstudio);
		}
		else
		{
			elLi_VSCode = elLi_DownloadZip.cloneNode(true);
			elA_VSCode = elLi_VSCode.querySelector("a");
			elA_VSCode.dataset.action = "click:get-repo#showDownloadMessage";
		}
		try
		{
			const hydroClick = JSON.parse(elA_VSCode.dataset.hydroClick);
			hydroClick.payload.feature_clicked = "OPEN_WITH_VSCODE";
			elA_VSCode.dataset.hydroClick = JSON.stringify(hydroClick);
		}
		catch{}
		elA_VSCode.textContent = "Open with VSCode";
		const elImg_Vscode = document.createElement("img");
		elImg_Vscode.classList.add("mr-2");
		elImg_Vscode.src = "https://raw.githubusercontent.com/vanowm/userscript_github-open_with_vscode/master/media/vscode.svg";
		elA_VSCode.prepend(elImg_Vscode);
		// display "Launching Visual Studio Code..." message
		elA_VSCode.dataset.openApp = "vscode";
		const cloneURL = (document.querySelector(".input-group > .form-control") || {}).value;

		if (cloneURL)
			elA_VSCode.href = "vscode://vscode.git/clone?url=" + encodeURI(cloneURL);
		else
			elA_VSCode.href = elA_VSCode.href.replace("git-client://", "vscode://vscode.git/");

		elLi_DownloadZip.parentNode.insertBefore(elLi_VSCode, elLi_DownloadZip);
		//we don't need keep observing DOM changes anymore
		observer.disconnect();
	};

	const observer = new MutationObserver(fixLink);
	if (fixLink())
		observer.observe(document, {childList: true, subtree: true});
})();