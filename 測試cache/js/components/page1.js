let page1 = {
	props: ["data"],
	setup(props) {
		// Destructure props reactively
		const { data } = Vue.toRefs(props);
		let money = Vue.ref(100000);
		let isJSReady = Vue.ref(false);
		// Computed properties for safe access
		const string = Vue.computed(() => data.value?.string);
		// "backgroundImage": "./images/share-logo-lineage-free.png"
		// background-image: var(--background-image);
		const backgroundImage = Vue.computed(() => `url(${data.value?.backgroundImage})`);
		const img = Vue.computed(() => data.value?.img);
		const object = Vue.computed(() => data.value?.object);
		const array = Vue.computed(() => data.value?.array);
		const HTML = Vue.computed(() => data.value?.HTML);
		let handleClick = () => {
			Hello();
		};
		let toThousand = Vue.computed(() => {
			return toThousands(money.value);
		});

		return {
			string,
			backgroundImage,
			img,
			object,
			array,
			HTML,
			handleClick,
			money,
			toThousand
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
		   <hr />
			<a href="javascript:;" @click="handleClick">按鈕</a>
			<br />
			<div>{{toThousand}}</div>
		</div>
	  `
};

export default page1;
