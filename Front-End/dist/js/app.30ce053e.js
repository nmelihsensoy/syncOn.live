(function(t){function e(e){for(var n,s,o=e[0],l=e[1],c=e[2],u=0,d=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);v&&v(e);while(d.length)d.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,s=1;s<a.length;s++){var o=a[s];0!==i[o]&&(n=!1)}n&&(r.splice(e--,1),t=l(l.s=a[0]))}return t}var n={},s={app:0},i={app:0},r=[];function o(t){return l.p+"js/"+({about:"about"}[t]||t)+"."+{about:"460f018e","chunk-70e4c926":"c7e09b13"}[t]+".js"}function l(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(t){var e=[],a={"chunk-70e4c926":1};s[t]?e.push(s[t]):0!==s[t]&&a[t]&&e.push(s[t]=new Promise((function(e,a){for(var n="css/"+({about:"about"}[t]||t)+"."+{about:"31d6cfe0","chunk-70e4c926":"9f014cd1"}[t]+".css",i=l.p+n,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var c=r[o],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===n||u===i))return e()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){c=d[o],u=c.getAttribute("data-href");if(u===n||u===i)return e()}var v=document.createElement("link");v.rel="stylesheet",v.type="text/css",v.onload=e,v.onerror=function(e){var n=e&&e.target&&e.target.src||i,r=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=n,delete s[t],v.parentNode.removeChild(v),a(r)},v.href=i;var m=document.getElementsByTagName("head")[0];m.appendChild(v)})).then((function(){s[t]=0})));var n=i[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,a){n=i[t]=[e,a]}));e.push(n[2]=r);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=o(t);var d=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(v);var a=i[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+n+": "+s+")",d.name="ChunkLoadError",d.type=n,d.request=s,a[1](d)}i[t]=void 0}};var v=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},l.m=t,l.c=n,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)l.d(a,n,function(e){return t[e]}.bind(null,n));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var v=u;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";a("64a9")},"34ba":function(t,e,a){"use strict";a("7dbb")},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("link",{attrs:{rel:"stylesheet",href:"https://cdn.linearicons.com/free/1.0.0/icon-font.min.css"}}),a("link",{attrs:{rel:"stylesheet",href:"https://cdn.plyr.io/3.6.12/plyr.css"}}),a("div",{attrs:{id:"wrapper"}},[a("router-view")],1),a("Footer")],1)},i=[],r=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"footer"},[a("div",{staticClass:"container"},[a("div",{staticClass:"content has-text-centered"},[a("p",[a("strong",[t._v("SyncOn")]),t._v(" by "),a("a",{attrs:{href:"#"}},[t._v("Nuri Melih Sensoy")])])])])])}],l={},c=l,u=a("2877"),d=Object(u["a"])(c,r,o,!1,null,null,null),v=d.exports,m=a("788d");a("92c6");n["a"].use(m["a"]);var p={name:"app",components:{Footer:v},data:function(){return{form_data:!1}}},h=p,f=(a("034f"),Object(u["a"])(h,s,i,!1,null,null,null)),b=f.exports,C=a("8c4f"),g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("Modal",{attrs:{active:t.isModalActive},on:{close:function(e){t.isModalActive=!1}}},[[a("div",{staticClass:"modal-card modalMargin"},[a("div",{staticClass:"box"},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[t._v("Room Code")]),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.roomId,expression:"roomId"}],staticClass:"input",attrs:{type:"text",placeholder:""},domProps:{value:t.roomId},on:{input:function(e){e.target.composing||(t.roomId=e.target.value)}}})])]),a("div",{staticClass:"field is-grouped is-grouped-right"},[a("p",{staticClass:"control"},[a("a",{staticClass:"button is-primary",on:{click:this.joinRoom}},[t._v("\n                            Join\n                            ")])]),a("p",{staticClass:"control"},[a("a",{staticClass:"button is-light",on:{click:function(e){t.isModalActive=!1}}},[t._v("\n                            Cancel\n                            ")])])])])])]],2),a("NavBar",{attrs:{isPageLoading:!1},on:{menuSended:t.menuSended}}),t._m(0),a("section",{staticClass:"main-buttons"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.join,expression:"!join"}],staticClass:"container"},[a("div",{staticClass:"columns is-centered"},[a("div",{staticClass:"column is-one-quarter"},[a("a",{staticClass:"box has-text-centered",on:{click:t.createRoom}},[a("span",{staticClass:"icon lnr lnr-magic-wand"}),t._v("\n                        Create Room\n                    ")])]),a("div",{staticClass:"column is-one-quarter"},[a("a",{staticClass:"box has-text-centered",on:{click:t.join_room}},[a("span",{staticClass:"icon lnr lnr-enter"}),t._v("\n                        Join Room\n                    ")])])])]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.join,expression:"join"}],staticClass:"container"},[a("div",{staticClass:"columns is-centered"},[a("div",{staticClass:"column is-half"},[a("div",{staticClass:"box"},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[t._v("Room Code")]),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.roomId,expression:"roomId"}],staticClass:"input",attrs:{type:"text",placeholder:""},domProps:{value:t.roomId},on:{input:function(e){e.target.composing||(t.roomId=e.target.value)}}})])]),a("div",{staticClass:"field is-grouped is-grouped-right"},[a("p",{staticClass:"control"},[a("a",{staticClass:"button is-primary",on:{click:this.joinRoom}},[t._v("\n                                Join\n                                ")])]),a("p",{staticClass:"control"},[a("a",{staticClass:"button is-light",on:{click:function(e){t.join=!1}}},[t._v("\n                                Cancel\n                                ")])])])])])])])])],1)},_=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"hero is-primary is-bold"},[a("div",{staticClass:"hero-body"},[a("div",{staticClass:"container"},[a("h1",{staticClass:"title"},[t._v("\n            Watch Youtube with your friends together!\n        ")]),a("h2",{staticClass:"subtitle"},[t._v("\n            SyncOn\n        ")])])])])}],w=(a("6b54"),a("d000")),y=a("714b"),x={name:"home",components:{NavBar:w["a"],Modal:y["a"]},data:function(){return{join:!1,roomId:null,guid:null,isModalActive:!1}},methods:{join_room:function(){this.join=!0},S4:function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},guidCalc:function(){this.guid=(this.S4()+this.S4()+"-"+this.S4()+"-4"+this.S4().substr(0,3)+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4()).toLowerCase()},createRoom:function(){this.guidCalc(),this.$router.push({name:"room",params:{id:this.guid,create:!0}})},joinRoom:function(){this.$router.push({name:"room",params:{id:this.roomId,create:!1}})},menuSended:function(t){"create"===t?this.createRoom():"join"===t&&(this.isModalActive=!0)}}},k=x,j=(a("cccb"),Object(u["a"])(k,g,_,!1,null,null,null)),S=j.exports;n["a"].use(C["a"]);var E=new C["a"]({linkActiveClass:"is-active",linkExactActiveClass:"is-active",routes:[{path:"/",name:"home",component:S},{path:"/about",name:"about",component:function(){return a.e("about").then(a.bind(null,"f820"))}},{path:"/room/:id",name:"room",component:function(){return a.e("chunk-70e4c926").then(a.bind(null,"3ab1"))}}]});n["a"].config.productionTip=!1;var L=new n["a"]({router:E,render:function(t){return t(b)}}).$mount("#app");window.vm=L},"64a9":function(t,e,a){},"714b":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal",class:{"is-active":this.active}},[a("div",{staticClass:"modal-background",on:{click:function(e){return t.$emit("close")}}}),t._t("default")],2)},s=[],i={name:"Modal",props:["active"],data:function(){return{}}},r=i,o=a("2877"),l=Object(o["a"])(r,n,s,!1,null,null,null);e["a"]=l.exports},"7dbb":function(t,e,a){},cccb:function(t,e,a){"use strict";a("d563")},d000:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar is-light",attrs:{role:"navigation","aria-label":"main navigation"}},[t._m(0),a("div",{staticClass:"navbar-menu",attrs:{id:"navbarBasicExample"}},[a("div",{staticClass:"navbar-start"},[a("router-link",{staticClass:"navbar-item",attrs:{to:{name:"home"},exact:""}},[a("span",{staticClass:"icon lnr lnr-home"}),a("span",[t._v("Home")])]),a("router-link",{staticClass:"navbar-item is-hidden",attrs:{to:{name:"about"}}},[t._v("\n            About\n        ")])],1),"room"===this.$route.name?a("div",{directives:[{name:"show",rawName:"v-show",value:this.userPermLevel<=1,expression:"this.userPermLevel <= 1"}],staticClass:"navbar-start queue-input"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!0===this.pageLoading,expression:"this.pageLoading === true"}],staticClass:"navbar-item"},[t._m(1)]),a("div",{directives:[{name:"show",rawName:"v-show",value:!0!==this.pageLoading,expression:"this.pageLoading !== true"}],staticClass:"field has-addons navbar-item"},[a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.video_url,expression:"video_url"}],staticClass:"input",class:{"is-danger":!t.urlValid},attrs:{type:"text",placeholder:"add video to queue"},domProps:{value:t.video_url},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sendUrl.apply(null,arguments)},input:function(e){e.target.composing||(t.video_url=e.target.value)}}})]),a("div",{staticClass:"control"},[a("a",{staticClass:"button is-dark",on:{click:t.sendUrl}},[a("span",[t._v("+")])])])])]):t._e(),"room"!==this.$route.name?a("div",{staticClass:"navbar-end"},[a("div",{staticClass:"navbar-item"},[a("div",{staticClass:"buttons"},[a("a",{staticClass:"button is-primary",on:{click:function(e){return t.sendMenu("create")}}},[a("span",{staticClass:"icon lnr lnr-magic-wand"}),a("strong",[t._v(" Create Room")])]),a("a",{staticClass:"button is-link",on:{click:function(e){return t.sendMenu("join")}}},[a("span",{staticClass:"icon lnr lnr-enter"}),a("strong",[t._v("Join Room")])])])])]):t._e(),"room"===this.$route.name?a("div",{staticClass:"navbar-end"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!0===this.pageLoading,expression:"this.pageLoading === true"}],staticClass:"navbar-item"},[t._m(2)]),a("div",{directives:[{name:"show",rawName:"v-show",value:!0===this.pageLoading,expression:"this.pageLoading === true"}],staticClass:"navbar-item"},[t._m(3)]),a("div",{directives:[{name:"show",rawName:"v-show",value:!0!==this.pageLoading,expression:"this.pageLoading !== true"}],staticClass:"navbar-item"},[a("div",{staticClass:"buttons"},[a("a",{staticClass:"button is-info",on:{click:function(e){return t.copyToClipboard(t.roomId)}}},[a("span",{staticClass:"icon lnr lnr-link"}),t._m(4)]),a("a",{staticClass:"button is-danger",on:{click:function(e){return t.sendMenu("exit")}}},[a("strong",{directives:[{name:"show",rawName:"v-show",value:0===this.userPermLevel,expression:"this.userPermLevel === 0"}]},[a("span",{staticClass:"icon lnr lnr-exit"}),a("span",[t._v("Close Room")])]),a("strong",{directives:[{name:"show",rawName:"v-show",value:0!==this.userPermLevel,expression:"this.userPermLevel !== 0"}]},[a("span",{staticClass:"icon lnr lnr-exit"}),a("span",[t._v("Exit Room")])])])])])]):t._e()])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navbar-brand"},[a("a",{staticClass:"navbar-item"},[a("h3",{staticClass:"title is-3"},[t._v("SyncOn")])]),a("a",{staticClass:"navbar-burger burger",attrs:{role:"button","aria-label":"menu","aria-expanded":"false","data-target":"navbarBasicExample"}},[a("span",{attrs:{"aria-hidden":"true"}}),a("span",{attrs:{"aria-hidden":"true"}}),a("span",{attrs:{"aria-hidden":"true"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"skaleton-parent"},[a("div",{staticClass:"skaleton-child"}),a("span",{staticClass:"url-bar-skeleton"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"skaleton-parent"},[a("div",{staticClass:"skaleton-child"}),a("span",{staticClass:"bar-button"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"skaleton-parent"},[a("div",{staticClass:"skaleton-child"}),a("span",{staticClass:"bar-button"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("strong",[a("span",[t._v("Invite Friend")])])}],i=a("0b16"),r={name:"NavBar",props:["videoUrl","userPermLevel","pageLoading"],data:function(){return{video_url:null,urlValid:!0,copied:!1,roomId:this.$route.params.id}},methods:{isActive:function(){return"is-active"},sendUrl:function(){var t=i.parse(this.video_url,!0);null!=t.host&&("www.youtube.com"===t.host&&"/watch"===t.pathname||"youtube.com"===t.host&&"/watch"===t.pathname||"youtu.be"===t.host)?(this.urlValid=!0,this.$emit("urlSended",this.video_url),this.video_url=null):(this.urlValid=!1,this.video_url=null)},sendMenu:function(t){this.$emit("menuSended",t)},copyToClipboard:function(t){this.$emit("invite_f");var e=document.createElement("input");e.style="position: absolute; left: -1000px; top: -1000px",e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)}}},o=r,l=(a("34ba"),a("2877")),c=Object(l["a"])(o,n,s,!1,null,null,null);e["a"]=c.exports},d563:function(t,e,a){}});
//# sourceMappingURL=app.30ce053e.js.map