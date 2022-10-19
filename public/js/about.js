function readMore() {
    var node = document.createElement("p");
    var main = document.getElementById("deans_message");
    main.appendChild(node);
    var text = document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.");
    node.appendChild(text);
};

function readLess() {
	var element = document.getElementsByTagName("p")[3];
	var parent = element.parentNode;
	parent.removeChild(element);
};