// ==UserScript==
// @name         Github - Open with VSCode
// @namespace    V@no
// @description  Adds "Open with VSCode" button
// @match        https://github.com/*
// @version      24.5.9-085044
// @license      MIT
// @run-at       document-end
// @grant        none
// ==/UserScript==

(() =>
{
	"use strict";
	const fixLink = () =>
	{
		const elUL = document.querySelector(`#__primerPortalRoot__ > div > div > div > ul > div > ul`);
		if (!elUL)
			return true;

		const elLiVStudio = elUL.querySelector(`[id]:nth-child(2)`);
		if (elLiVStudio && !elLiVStudio.querySelector(".icon"))
		{
			const elImg_Vstudio = document.createElement("img");
			elImg_Vstudio.classList.add("mr-2", "icon");
			elImg_Vstudio.src = "https://raw.githubusercontent.com/vanowm/userscript_github-open_with_vscode/master/media/vstudio.svg";
			elLiVStudio.prepend(elImg_Vstudio);
		}
		const elLi_DownloadZip = elUL.querySelector(`li:last-child`);
		const elLi_VSCode = (elUL.querySelector(".vscode") || elLi_DownloadZip.cloneNode(true));
		if (!elLi_VSCode.parentNode)
		{
			elLi_VSCode.classList.add("vscode");
			const elA_VSCode = elLi_VSCode.querySelector("a");
			elA_VSCode.textContent = "Open with VSCode";
			const elImg_Vscode = document.createElement("img");
			elImg_Vscode.classList.add("mr-2", "icon");
			elImg_Vscode.src = "https://raw.githubusercontent.com/vanowm/userscript_github-open_with_vscode/master/media/vscode.svg";
			elA_VSCode.prepend(elImg_Vscode);

			const cloneURL = (elUL.parentNode.querySelector(`input`) || {}).value
							|| location.origin + location.pathname + ".git";
			elA_VSCode.href = "vscode://vscode.git/clone?url=" + encodeURI(cloneURL);

			elLi_DownloadZip.parentNode.insertBefore(elLi_VSCode, elLi_DownloadZip);
		}
	};

	const observer = new MutationObserver(fixLink);
	fixLink();
	observer.observe(document, {childList: true, subtree: true});
})();