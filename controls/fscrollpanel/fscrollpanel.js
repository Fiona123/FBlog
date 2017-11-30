/*

	A scroll panel to show picture and texts 

	properties:
	
	events: 
		(1) selectPhoto;
 
*/


Vue.component('fscrollpanel', { 

	props: [ 
		/**
			key of the control
			type: string
		**/
		'elId',    			 
		/**
			array of cover items
			type: array
			example of cover item: {title: "Inutt", img:"pictures/covers/cover1.jpg"}
		**/
		'coverArr'			 
	],

	template:  
		"<div v-bind:id='elementId' class='scrollbox' v-on:mousewheel='handleMouseScroll'> 	" + 
		"	<div v-for='(cover, index) in covers' :key='cover.index'		 			" +
		"	v-on:mouseover='setFocus(index)'' v-on:mouseout='setFocus(-1)''  v-on:click='selectCover(cover)'> " +
		"		<p>0{{index}}</p> 														" +
		"		<div> 																	" +
		"			<transition name='transtitle'> 										" + 
		"				<p v-if='focusCover == index'>{{cover.title}}</p> 				" + 
		"			</transition>  														" + 
		"			<img v-bind:src='cover.img'> 										" + 
		"		</div> 																	" +  
		"	</div>  																	" + 
		" </div> 				 														",

 
	data: function(){
		return { 
			elementId: "fscrollpanel" + this.elId,
			covers: this.coverArr, 
			focusCover: null, 
			displayAlbum: "Inutt"
		}
	},

	methods: {
		setFocus: function(index){
			this.focusCover = index;
		},
			   
		selectCover: function(cover){
			//return cover 
		},

		handleMouseScroll: function(event){
			//var currentLeft = document.getElementById("scrollbox").
			var scrollBox = document.getElementById(this.elementId);
			var childs = scrollBox.childNodes;
			var offWidth = 0;
			var childsWidth = 0;
			var range = 250;
			for(var i=0; i< childs.length;i++){
				childsWidth += childs[i].offsetWidth; 
			}

			//Left Side Scroll Max;
			offWidth = scrollBox.offsetWidth - childsWidth - range;

			for(var i=0; i< childs.length;i++){
				 
				this.setTranslateX(childs[i], this.getMouseWheelDelta(event), offWidth, 0);
			}
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
		
		}

	}

});