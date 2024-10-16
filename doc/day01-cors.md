# CORS

The frontend send get request 

```js
import { defineComponent } from 'vue';
import axios from 'axios'; 

export default defineComponent({
  name: 'App',

  data() {
    return {
      greeting: 'Hello World!', 
    }
  }, 

  mounted(){
    axios.get('http://localhost:3000/posts').then(res=>{
      this.greeting = res.data[0].title;
      
		}); 
  }
});
```
Since the frontend runs in `http://localhost:8000/` while backend runs in `http://localhost:3000/`, 

frontend fails to connect the backend, 

> Access to XMLHttpRequest at 'http://localhost:3000/posts' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.


