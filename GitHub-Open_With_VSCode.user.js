// ==UserScript==
// @name         Github - Open with VSCode
// @namespace    V@no
// @description  Adds "Open with VSCode" button
// @match        https://github.com/*
// @version      23.10.21-135539
// @license      MIT
// @run-at       document-end
// @grant        none
// ==/UserScript==

((icon_vscode, icon_vstudio) =>
{
	"use strict";
	const fixLink = () =>
	{
		const elADownloadZip = document.querySelector(`[data-open-app="link"]`);
		if (!elADownloadZip)
			return true;

		const elLiDownloadZip = elADownloadZip.parentNode;
		const elAVStudio = document.querySelector('[data-open-app="visual-studio"]');
		let elLiVSCode;
		let elAVSCode;
		if (elAVStudio)
		{
			const elLiVStudio = elAVStudio.parentNode;
			elLiVSCode = elLiVStudio.cloneNode(true);
			elAVSCode = elLiVSCode.querySelector("a");
			elAVStudio.innerHTML = icon_vstudio + elAVStudio.innerHTML;
		}
		else
		{
			elLiVSCode = elLiDownloadZip.cloneNode(true);
			elAVSCode = elLiVSCode.querySelector("a");
			elAVSCode.dataset.action = "click:get-repo#showDownloadMessage";
		}
		try
		{
			const hydroClick = JSON.parse(elAVSCode.dataset.hydroClick);
			hydroClick.payload.feature_clicked = "OPEN_WITH_VSCODE";
			elAVSCode.dataset.hydroClick = JSON.stringify(hydroClick);
		}
		catch{}
		elAVSCode.innerHTML = icon_vscode + "Open with VSCode";
		// display "Launching Visual Studio Code..." message
		elAVSCode.dataset.openApp = "vscode";
		const cloneURL = (document.querySelector(".input-group > .form-control") || {}).value;

		if (cloneURL)
			elAVSCode.href = "vscode://vscode.git/clone?url=" + encodeURI(cloneURL);
		else
			elAVSCode.href = elAVSCode.href.replace("git-client://", "vscode://vscode.git/");

		elLiDownloadZip.parentNode.insertBefore(elLiVSCode, elLiDownloadZip);
		//we don't need keep observing DOM changes anymore
		observer.disconnect();
	};

	const observer = new MutationObserver(fixLink);
	if (fixLink())
		observer.observe(document, {childList: true, subtree: true});
})(
	`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="octicon octicon-desktop-download mr-2" data-view-component="true" fill="none" viewBox="0 0 100 100"><mask id="a" width="100" height="100" x="0" y="0" mask-type="alpha" maskUnits="userSpaceOnUse"><path fill="#fff" fill-rule="evenodd" d="M70.912 99.317a6.223 6.223 0 0 0 4.96-.19l20.589-9.907A6.25 6.25 0 0 0 100 83.587V16.413a6.25 6.25 0 0 0-3.54-5.632L75.874.874a6.226 6.226 0 0 0-7.104 1.21L29.355 38.04 12.187 25.01a4.162 4.162 0 0 0-5.318.236l-5.506 5.009a4.168 4.168 0 0 0-.004 6.162L16.247 50 1.36 63.583a4.168 4.168 0 0 0 .004 6.162l5.506 5.01a4.162 4.162 0 0 0 5.318.236l17.168-13.032L68.77 97.917a6.217 6.217 0 0 0 2.143 1.4ZM75.015 27.3 45.11 50l29.906 22.701V27.3Z" clip-rule="evenodd"/></mask><g mask="url(#a)"><path fill="#0065A9" d="M96.461 10.796 75.857.876a6.23 6.23 0 0 0-7.107 1.207l-67.451 61.5a4.167 4.167 0 0 0 .004 6.162l5.51 5.009a4.167 4.167 0 0 0 5.32.236l81.228-61.62c2.725-2.067 6.639-.124 6.639 3.297v-.24a6.25 6.25 0 0 0-3.539-5.63Z"/><g filter="url(#b)"><path fill="#007ACC" d="m96.461 89.204-20.604 9.92a6.229 6.229 0 0 1-7.107-1.207l-67.451-61.5a4.167 4.167 0 0 1 .004-6.162l5.51-5.009a4.167 4.167 0 0 1 5.32-.236l81.228 61.62c2.725 2.067 6.639.124 6.639-3.297v.24a6.25 6.25 0 0 1-3.539 5.63Z"/></g><g filter="url(#c)"><path fill="#1F9CF0" d="M75.858 99.126a6.232 6.232 0 0 1-7.108-1.21c2.306 2.307 6.25.674 6.25-2.588V4.672c0-3.262-3.944-4.895-6.25-2.589a6.232 6.232 0 0 1 7.108-1.21l20.6 9.908A6.25 6.25 0 0 1 100 16.413v67.174a6.25 6.25 0 0 1-3.541 5.633l-20.601 9.906Z"/></g><path fill="url(#d)" fill-rule="evenodd" d="M70.851 99.317a6.224 6.224 0 0 0 4.96-.19L96.4 89.22a6.25 6.25 0 0 0 3.54-5.633V16.413a6.25 6.25 0 0 0-3.54-5.632L75.812.874a6.226 6.226 0 0 0-7.104 1.21L29.294 38.04 12.126 25.01a4.162 4.162 0 0 0-5.317.236l-5.507 5.009a4.168 4.168 0 0 0-.004 6.162L16.186 50 1.298 63.583a4.168 4.168 0 0 0 .004 6.162l5.507 5.009a4.162 4.162 0 0 0 5.317.236l17.168-13.03 39.414 35.958a6.218 6.218 0 0 0 2.143 1.4ZM74.954 27.3 45.048 50l29.906 22.701V27.3Z" clip-rule="evenodd" opacity=".25" style="mix-blend-mode:overlay"/></g><defs><filter id="b" width="116.727" height="92.246" x="-8.394" y="15.829" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="4.167"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter><filter id="c" width="47.917" height="116.151" x="60.417" y="-8.076" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="4.167"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter><linearGradient id="d" x1="49.939" x2="49.939" y1=".258" y2="99.742" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs></svg>`,
	`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="octicon octicon-desktop-download mr-2" data-view-component="true" fill="none" viewBox="0 0 193 193"><defs><path id="j" fill="#fff" d="M8.271 8.271h176.457v176.457H8.271z"/></defs><g clip-path="url(#a)"><g clip-path="url(#b)"><mask id="c" width="177" height="177" x="8" y="8" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#fff" d="m40.621 157.524-29.408-22.057a7.284 7.284 0 0 1-2.941-5.881V63.414a7.287 7.287 0 0 1 2.941-5.88l29.408-22.058a6.658 6.658 0 0 0-2.02 5.881v110.286a6.66 6.66 0 0 0 2.02 5.881Z"/><path fill="#fff" d="M181.456 38.895a7.39 7.39 0 0 0-4.081-1.213 7.139 7.139 0 0 0-5.073 2.057l-.513.515L113.117 96.5l-32.462 31.137-30.034 28.784-.515.516a7.137 7.137 0 0 1-5.073 2.059 7.386 7.386 0 0 1-4.412-1.472l-29.408-22.057a7.346 7.346 0 0 0 9.998-1.103l32.644-37.9 26.8-31.1 46.946-54.52a7.238 7.238 0 0 1 5.55-2.572 7.385 7.385 0 0 1 4.08 1.213l44.225 29.41Z"/><path fill="#fff" d="m181.456 154.105-44.114 29.41a7.447 7.447 0 0 1-9.667-1.323l-47.02-54.555-26.8-31.173-32.644-37.867a7.386 7.386 0 0 0-9.998-1.064l29.408-22.057a7.39 7.39 0 0 1 4.411-1.472 7.132 7.132 0 0 1 5.074 2.06l.515.515 30.034 28.785L113.117 96.5l58.672 56.246.513.515a7.136 7.136 0 0 0 5.073 2.057 7.387 7.387 0 0 0 4.081-1.213Z"/><path fill="#fff" d="M184.729 45.032v102.936a7.375 7.375 0 0 1-3.273 6.137l-44.114 29.41a7.38 7.38 0 0 0 3.272-6.14V15.625a7.44 7.44 0 0 0-3.383-6.14l44.225 29.41a7.419 7.419 0 0 1 3.273 6.137Z"/></mask><g mask="url(#c)"><path fill="#5E438F" d="m40.621 157.524-29.408-22.057a7.292 7.292 0 0 1-2.941-5.881V63.414a7.287 7.287 0 0 1 2.941-5.88l29.408-22.058a6.658 6.658 0 0 0-2.02 5.881v110.286a6.66 6.66 0 0 0 2.02 5.881Z"/><g filter="url(#d)"><path fill="url(#e)" d="M181.455 38.895a7.385 7.385 0 0 0-4.08-1.213 7.147 7.147 0 0 0-5.073 2.057l-.513.515-31.25 29.962L113.117 96.5l-32.463 31.137-30.033 28.784-.516.516a7.137 7.137 0 0 1-5.073 2.059 7.386 7.386 0 0 1-4.411-1.472l-29.408-22.057a7.346 7.346 0 0 0 9.997-1.103l16.471-19.115 16.174-18.785 26.8-31.1 46.945-54.52a7.251 7.251 0 0 1 5.55-2.572 7.39 7.39 0 0 1 4.081 1.213l44.224 29.41Z"/></g><g filter="url(#f)"><path fill="url(#g)" d="m181.455 154.105-44.114 29.411a7.443 7.443 0 0 1-9.666-1.324l-47.02-54.555-26.8-31.173-16.173-18.748L21.21 58.598a7.387 7.387 0 0 0-9.997-1.065L40.62 35.477a7.389 7.389 0 0 1 4.411-1.472 7.128 7.128 0 0 1 5.073 2.06l.516.515 30.033 28.785L113.117 96.5l27.461 26.323 31.211 29.923.513.516a7.155 7.155 0 0 0 5.073 2.056 7.382 7.382 0 0 0 4.08-1.213Z"/></g><g filter="url(#h)"><path fill="url(#i)" d="M184.729 45.032v102.935a7.38 7.38 0 0 1-3.273 6.138l-44.115 29.41a7.383 7.383 0 0 0 3.273-6.14V15.625a7.44 7.44 0 0 0-3.383-6.14l44.225 29.41a7.428 7.428 0 0 1 3.273 6.137Z"/></g></g></g></g><defs><linearGradient id="e" x1="151.642" x2="20.614" y1="8.271" y2="140.148" gradientUnits="userSpaceOnUse"><stop stop-color="#7252AA"/><stop offset="1" stop-color="#7252AA"/></linearGradient><linearGradient id="g" x1="24.814" x2="147.966" y1="40.437" y2="178.293" gradientUnits="userSpaceOnUse"><stop stop-color="#AE7FE2"/><stop offset="1" stop-color="#9A70D4"/></linearGradient><linearGradient id="i" x1="160.457" x2="160.457" y1="5.936" y2="183.367" gradientUnits="userSpaceOnUse"><stop stop-color="#D59DFF"/><stop offset="1" stop-color="#C18EF1"/></linearGradient><filter id="d" width="180.604" height="161.087" x="6.032" y="4.386" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy=".246"/><feGaussianBlur stdDeviation=".246"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1.295"/><feGaussianBlur stdDeviation="2.59"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0"/><feBlend in2="effect1_dropShadow" result="effect2_dropShadow"/><feBlend in="SourceGraphic" in2="effect2_dropShadow" result="shape"/></filter><filter id="f" width="180.604" height="161.085" x="6.032" y="30.118" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy=".246"/><feGaussianBlur stdDeviation=".246"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1.295"/><feGaussianBlur stdDeviation="2.59"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0"/><feBlend in2="effect1_dropShadow" result="effect2_dropShadow"/><feBlend in="SourceGraphic" in2="effect2_dropShadow" result="shape"/></filter><filter id="h" width="78.583" height="205.117" x="121.688" y="-6.059" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation=".13"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="7.771"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/><feBlend in2="effect1_dropShadow" result="effect2_dropShadow"/><feBlend in="SourceGraphic" in2="effect2_dropShadow" result="shape"/></filter><clipPath id="a"><use xlink:href="#j"/></clipPath><clipPath id="b"><use xlink:href="#j"/></clipPath></defs></svg>`
);