window.addEventListener("hashchange", function () {
	loadMarkdown();
	loadShaders();
}, false);

function parseMarkdown(){
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
	parseMarkdown();

	loadShaders();
	renderShaders(); 
};

function viewShader (fragShaderURL) { 

    var demoCode = document.getElementById("demoCode");
    if(demoCode){
        demoCode.innerHTML = fetchHTTP(fragShaderURL);
        hljs.highlightBlock(demoCode);
    }

    var demoCanvas = document.getElementById("demoCanvas");
    if(demoCanvas){
    	demoCanvas.setAttribute("src", fragShaderURL);
    }

    document.getElementById("demo").style.display = 'block';
    
    smoothScroll('end');
    loadShaders();
};

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
    return false;
}