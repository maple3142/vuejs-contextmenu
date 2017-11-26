# vuejs-contextmenu
> vue.js contextmenu wrapper

## Usage
### &lt;script>
```html
<script src="https://unpkg.com/vue"></script>
<!--path to vuejsContextmenu(.min).js-->
<script src="./dist/vuejsContextmenu.min.js"></script>
<div id="app">
  <ctxmenu>
    <ul class="list" slot="ctxmenu">
      <li class="listitem">
        <a href="https://www.google.com/">Google</a>
      </li>
      <li class="listitem">
        <a href="https://www.facebook.com/">Facebook</a>
      </li>
    </ul>
    <div class="box">box1</div>
    This text doesn't have custom contextmenu
    <br>
    <span>But this text have custom contextmenu</span>
  </ctxmenu>
</div>
```
```javascript
//global
Vue.component('ctxmenu', window.vuejsContextmenu)
const app = new Vue({
  el: '#app'
})
```
### &lt;script type="module">
```html
<script type="module">
  //vuejsContextmenu.es.js is build for es6
  import vuejsContextmenu from './dist/vuejsContextmenu.es.js'
  Vue.component('ctxmenu', vuejsContextmenu)
  const app = new Vue({
    el: '#app'
  })
</script>
```