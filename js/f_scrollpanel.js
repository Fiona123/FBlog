/*

	A scroll panel to show picture and texts 

	properties:
	
	events: 
		(1) selectPhoto;
 
*/
 

Vue.component('f-scrollpanel', {
	template: 
			"<div class='scrollbox'> 														" + 
			"	<div v-for='(cover, index) in covers' :key='cover.index'		 			" +
			"	v-on:mouseover='setFocus(index)'' v-on:click='setPage(2, cover)'> 			" +
			"		<p>0{{index}}</p> 														" +
			"		<div> 																	" +
			"			<transition name='transtitle'> 										" + 
			"				<p v-if='focusCover == index'>{{cover.title}}</p> 				" + 
			"			</transition>  														" + 
			"			<img v-bind:src='cover.img'> 										" + 
			"		</div> 																	" +  
			"	</div>  																	" + 
			" </div> 				 														",

	props:[items]
	data: function(){
		return { 
			covers:[
					{title: "Inutt", img:"pictures/covers/cover1.jpg"},
					{title: "Bonobo", img:"pictures/covers/cover2.jpg"},
					{title: "Asgeir", img:"pictures/covers/cover3.jpg"},
					{title: "Gamile", img:"pictures/covers/cover4.jpg"},
					{title: "Postal", img:"pictures/covers/cover5.jpg"},
					{title: "Aliocha", img:"pictures/covers/cover6.jpg"},
					{title: "Phoenix", img:"pictures/covers/cover7.jpg"},
					{title: "Lomboy", img:"pictures/covers/cover8.jpg"},
					{title: "Glass Candy", img:"pictures/covers/cover9.jpg"},
					{title: "Performance Genius", img:"pictures/covers/cover10.jpg"},
					{title: "Glass Candy", img:"pictures/covers/p1.jpg"},
					{title: "Glass Candy", img:"pictures/covers/p2.jpg"},
					{title: "Glass Candy", img:"pictures/covers/p3.jpg"},
					{title: "Glass Candy", img:"pictures/covers/p4.jpg"},
					{title: "Glass Candy", img:"pictures/covers/p5.jpg"}
				],
				scrollLeft: 500,
				focusCover: null,
				show: true,
				displayPage: 0,
				displayAlbum: "Inutt"
		}
	},

	methods: {
				setFocus: function(index){
					this.focusCover = index;
				},
			    randomIndex: function(){
					return Math.floor( Math.random() * this.items.length );
				}, 
				shuffleItems: function(){
					this.items.sort(function(a,b){ 
						return Math.random()>.5 ? -1 : 1;
					});
				}, 

				setPage: function(pageId, param){
					this.displayPage = pageId;
					if(pageId === 2){
						this.displayAlbum = param;
					}
				}
			}

});