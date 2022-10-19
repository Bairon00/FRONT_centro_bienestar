const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			usuario:
				{
					
				}
			,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			verificacion:(email,password)=>{
				var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                  "email": email,
                  "password": password
                });

                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };

                fetch("https://3000-bairon00-repobackproyec-qiwmm3i7rx0.ws-us71.gitpod.io/login", requestOptions)
                  .then(response => response.json())
                  .then(result => {localStorage.setItem("Token", result.token)})
                  .catch(error => console.log('error', error));
			},
			usuario:()=>{var myHeaders = new Headers();
				myHeaders.append("Authorization", "Bearer "+localStorage.getItem("Token"));
				
				var requestOptions = {
				  method: 'GET',
				  headers: myHeaders,
				  redirect: 'follow'
				};
			
				fetch("https://3000-bairon00-repobackproyec-qiwmm3i7rx0.ws-us71.gitpod.io/perfil", requestOptions)
				  .then(response => response.json())
				  .then(result => console.log(result))
				  .catch(error => console.log('error', error));
				},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			cerrar:()=>{
				const store = getStore();
				setStore({usuario:{...store.usuario,is_active:false}})
				console.log(store.usuarios[index].active)
				localStorage.deleteItem("Token")

				
				
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
