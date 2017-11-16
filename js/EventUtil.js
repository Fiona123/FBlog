//Cross-Browser Event Handler 

var EventUtil = { 

	addHandler: function(element, type, handler){
		if(typeof element.addEventListener == "function"){
			//DOM2 Level Event
			//Event Capturing -> Event Object -> Event Bubbling 
			element.addEventListener(type, handler, false); //false-event bubbling
		}else if(typeof element.attachEvent == "function"){
			//IE Event - <= IE8
			//Event Bubbling 
			element.attachEvent("on"+type, handler); //IE should add "on" before event name;
		}else{
			//DOM0 Level Event
			//Event Bubbling 
			element["on"+type] = handler;
		}
	},

	removeHandler:function(element, type, handler){
		if(typeof element.removeEventListener == "function"){
			element.removeEventListener(type, handler, false);
		}else if(typeof element.detachEvent == "function"){
			element.detachEvent("on"+type, handler);
		}else{
			element["on"+type] = null;
		}
	},

	getEvent: function(event){
		//DOM -> event
		//IE -> DOM0 Level -> event is a parameter of window
		return event? event: window.event;
	},

	getTarget: function(event){
		return event.target || event.srcElement;  //IE - event.srcElement.
	},

	preventDefault: function(event){
		if(typeof event.preventDefault == "function"){
			event.preventDefault();
		}else{
			//IE
			event.returnValue = false;
		}
	},

	stopPropagation: function(event){
		if(typeof event.stopPropagation == "function"){
			event.stopPropagation();
		}else{
			//IE
			event.cancelBubble = true;
		}
	},


	//Event Monitors

	fireMouseEvent: function(element, type){
		var event = document.createEvent("MouseEvents");
		event.initMouseEvent(type, true, true, document.defaultView, 0,0,0,0,0,false, false, false, false, 0, null);
		element.dispatchEvent(event);
	},


	getMouseWheelDelta: function(event) {
	    if(event.wheelDelta) {
	        return -event.wheelDelta;
	    } else {
	        return -event.detail * 40;
	    }
	    return 0;
	},

    setTranslateX: function(element, deltaX, leftMX, rightMX){
		//get current transform.translateX
		var transform = element.style.transform;
		var index = transform.indexOf("translateX(");
		var end = transform.indexOf(")", 11+index);

		var oldX = 0;
		if(index !== -1){
			var subS = transform.substring(11+index, end);
			oldX = parseFloat(subS);
		}

		//calculate new translateX and compare with left-right range
		var newX = -deltaX + oldX;

		if(newX < leftMX){
			newX = leftMX;
		}
		if(newX > rightMX){
			newX = rightMX;
		}
		//element.style.transform = "translateX("+newX+"px)";
		if(index != -1){
			element.style.transform = element.style.transform.replace(transform.substring(index, end+1), "translateX("+newX+"px)");
		}else{
			element.style.transform += "translateX("+newX+"px)";
		}
		
	},



	//Keyboar & Text Event
	getKeyBoardCharCode: function(event){
		if(typeof event.chartCode == "number"){
			return event.chartCode;
		}else{
			return event.keyCode;
		}
	},

	getKeyBoardChar: function(event){
		var charCode = this.getKeyBoardCharCode(event);
		return String.fromCharCode(charCode);
	},

	getSelectedChars:function(event){
		var event = this.getEvent(event);
		var target = this.getTarget(event);
		var result = "";
		if(typeof target.selectionStart == "number"){
			result = target.value.substring(target.selectionStart, target.selectionEnd); 
		}
		return result;
	},


    selectTextRange: function(textbox, startIndex, endIndex){
		if(textbox.setSelectionRange){
			//DOM
			textbox.setSelectionRange(startIndex, endIndex);
		}else{
			//IE8 
			//IE8 - Text Range 
			var textrange = textbox.createTextRange();
			textrange.collapse(true);
			textrange.moveStart("character", startIndex);
			textrange.moveEnd("character",startEnd-startIndex);
			textrange.select();
		}
		textbox.focus();
	},

	selectAll:function(textbox){
		textbox.select();
	},


	getClipBoardText:function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},

	setClipBoardText: function(event, value){
		if(event.clipboardData){
			return event.clipboardData.setData("text/plain", value);
		}else if(window.clipboardData){
			return window.clipboardData.setData("text", value);
		}
	}
}