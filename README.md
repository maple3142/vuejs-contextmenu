# vuejs-contextmenu

[![Greenkeeper badge](https://badges.greenkeeper.io/maple3142/vuejs-contextmenu.svg)](https://greenkeeper.io/)
> vue.js contextmenu wrapper (currently unstable)

[![Build Status](https://travis-ci.org/maple3142/vuejs-contextmenu.svg?branch=master)](https://travis-ci.org/maple3142/vuejs-contextmenu)

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

## [Example](https://rawgit.com/maple3142/vuejs-contextmenu/master/example.html)
Example use all the features this component can provide.

## API (May change)
### Slots
#### `default`
Contents in `default` slot will displayed normally

Right click/long press(mobile) will trigger contextmenu
#### `ctxmenu`
`ctxmenu` slot will be wrapped in a invisible `div.ctxmenu`

It will appear when being triggered, and disappeared when next click.
### Events
#### `open`
Triggerd after context menu opened.
#### `close`
Triggerd after context menu closed.
