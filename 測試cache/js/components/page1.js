let page1 = {
	props: ["data"],
	setup(props) {
		// Destructure props reactively
		const { data } = Vue.toRefs(props);

		// Computed properties for safe access
		const string = Vue.computed(() => data.value?.string);
		// "backgroundImage": "./images/share-logo-lineage-free.png"
		// background-image: var(--background-image);
		const backgroundImage = Vue.computed(() => `url(${data.value?.backgroundImage})`);
		const img = Vue.computed(() => data.value?.img);
		const object = Vue.computed(() => data.value?.object);
		const array = Vue.computed(() => data.value?.array);
		const HTML = Vue.computed(() => data.value?.HTML);

		return {
			string,
			backgroundImage,
			img,
			object,
			array,
			HTML
		};
	},
	template: `
		<div>
		  {{ string }} <br>
		   <hr />
		   <img :src="img" alt="" />
		   <hr />
		   <div 
		     class="logo" 
		     :style="{ '--background-image': backgroundImage }"
		   ></div>
		   <hr />
		   <ul v-for="o in object"><span>{{o.name}}</span></ul>
		   <hr />
		   <ul v-for="a in array"><span>{{a}}</span></ul>
		   <hr />
		   <div v-html="HTML"></div>
		</div>
	  `
};

export default page1;
