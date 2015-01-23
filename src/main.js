window.addEventListener("hashchange", function () {
	loadMarkdown();
	loadShaders();
}, false);

function loadMarkdown(){
	var mdFileURL = window.location.hash.substr(1);
	var mdText = "No **text**";
	if(mdFileURL){
		mdText = fetchHTTP(mdFileURL);
	} else {
		mdText = fetchHTTP("README.md");
	}
	content.innerHTML = marked(mdText);

	// Load codes tags that have "src" attributes
	var list = document.getElementsByTagName("code");
	for(var i = 0; i < list.length; i++){
		if( list[i].hasAttribute("src") && list[i].className == "glsl" ){
			list[i].innerHTML = fetchHTTP(list[i].getAttribute("src"));
			hljs.highlightBlock(list[i]);
		}
	}
}

window.onload = function(){
	loadMarkdown();
	loadShaders();
	renderShaders(); 
};