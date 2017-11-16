var DOMOperator = {
	
	addTextElement: function(parent_node, str){
		var newElement = document.createElement("p");
		newElement.appendChild(document.createTextNode(str));
		parent_node.appendChild(newElement);
	},

	loadJSFile: function(src){
		var script = document.createElement("script");
		script.src = src;
		document.body.appendChild(script);

		EventUtil.addHandler(script, "load", function(){
			DOMOperator.addTextElement(document.body, "JS loaded" + script.src);
		});
	},

	loadCSSFile: function(src){
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet"; 
		link.href = src;
		document.body.appendChild(link);

		EventUtil.addHandler(link, "load", function(){
			DOMOperator.addTextElement(document.body, "CSS loaded" + link.href);
		});
	}
}