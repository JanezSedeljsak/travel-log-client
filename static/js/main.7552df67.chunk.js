(this.webpackJsonpTravelLog=this.webpackJsonpTravelLog||[]).push([[0],{233:function(e,t,n){},234:function(e,t,n){"use strict";n.r(t);var r=n(0),s=n(29),a=n.n(s),i=n(125),o=n(116),c=n.n(o),l=n(49),u=n(55),j=n(25),d=n(60),b=n.n(d),h=n(90),p=n(19),O=n(84),m=n.n(O),f="redux/users/SET_USER",g="redux/users/LOG_OUT",x="redux/users/SIGN_IN",v="redux/users/SIGN_UP",y="redux/users/SIGN_UP_COMPLETE",w="redux/users/SET_LOGIN_ERROR",E="redux/users/SET_REGISTER_ERROR",I={profileName:null,isLoggedIn:!1,isFetching:!1,jwt:null,loginError:null,registerError:null},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f:return Object(p.a)(Object(p.a)({},e),{},{profileName:t.payload.username,isLoggedIn:!0,isFetching:!1,jwt:t.payload.jwt,loginError:null});case g:return I;case x:return Object(p.a)(Object(p.a)({},e),{},{isFetching:!0,loginError:null});case v:return Object(p.a)(Object(p.a)({},e),{},{isFetching:!0,registerError:null});case y:return Object(p.a)(Object(p.a)({},e),{},{isFetching:!1,registerError:null});case w:return Object(p.a)(Object(p.a)({},e),{},{isFetching:!1,loginError:t.payload.error});case E:return Object(p.a)(Object(p.a)({},e),{},{isFetching:!1,registerError:t.payload.error});default:return e}},T=function(e){return{type:f,payload:e}},k=function(e){return function(){var t=Object(h.a)(b.a.mark((function t(n){var r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:x}),t.next=3,m()({method:"post",headers:{"Access-Control-Allow-Origin":"*"},url:"http://localhost:5071/api/v1/auth/login ",data:{email:e.username,password:e.password}});case 3:(r=t.sent)&&n(T({username:e.email,jwt:r.data.token}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},_=function(){return{type:g}},L=k,P=Object(u.b)({user:N}),F=n(130),S=n(21),C=n(237),R=n(238),A=n(126),q=n(6),G=function(){var e=Object(j.c)((function(e){return e.user.isLoggedIn&&null!==e.user.jwt})),t=(Object(j.c)((function(e){return e.user.loginError})),Object(j.b)());return Object(r.useEffect)((function(){t(_())}),[t]),e?Object(q.jsx)(S.a,{to:"/Home"}):Object(q.jsx)("div",{class:"basic-form-container",children:Object(q.jsxs)(C.a,{name:"basic",labelCol:{span:8},wrapperCol:{span:16},onFinish:function(e){t(L(e))},onFinishFailed:function(){return console.log("errr")},autoComplete:"off",children:[Object(q.jsx)(C.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}],children:Object(q.jsx)(R.a,{})}),Object(q.jsx)(C.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(q.jsx)(R.a.Password,{})}),Object(q.jsx)(C.a.Item,{wrapperCol:{offset:8,span:16},children:Object(q.jsx)(A.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})})},U=function(){var e=Object(j.c)((function(e){return e.user.isLoggedIn&&null!==e.user.jwt})),t=(Object(j.c)((function(e){return e.user.registerError})),Object(j.b)());return Object(r.useEffect)((function(){t(_())}),[t]),e?Object(q.jsx)(S.a,{to:"/Home"}):Object(q.jsx)("div",{class:"basic-form-container",children:Object(q.jsxs)(C.a,{name:"basic",labelCol:{span:8},wrapperCol:{span:16},onFinish:function(e){},onFinishFailed:function(){return console.log("errr")},autoComplete:"off",children:[Object(q.jsx)(C.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}],children:Object(q.jsx)(R.a,{})}),Object(q.jsx)(C.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(q.jsx)(R.a.Password,{})}),Object(q.jsx)(C.a.Item,{wrapperCol:{offset:8,span:16},children:Object(q.jsx)(A.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})})},B=function(){return Object(q.jsx)("div",{children:"trip form"})},H=function(){return Object(q.jsx)("div",{children:"profile"})},z=function(){return Object(q.jsx)("div",{children:"my trips"})},M=function(){return Object(q.jsx)("div",{children:"destinations"})},W=function(){return Object(q.jsx)("div",{className:"paperplane",children:Object(q.jsxs)("div",{className:"plane",children:[Object(q.jsx)("div",{className:"wingRight"}),Object(q.jsx)("div",{className:"wingLeft"}),Object(q.jsx)("div",{className:"bottom"}),Object(q.jsx)("div",{className:"top"}),Object(q.jsx)("div",{className:"middle"})]})})},D=n.p+"static/media/banner.facae160.jpg",J=function(){return Object(q.jsx)(q.Fragment,{children:Object(q.jsxs)("div",{id:"landing",children:[Object(q.jsx)("img",{id:"banner-img",src:D}),Object(q.jsx)("h1",{children:"Welcome to Travel Log"}),Object(q.jsx)("p",{children:"~ Pass on the beautiful memories you've made around the world ~"}),Object(q.jsx)(W,{}),Object(q.jsxs)("div",{id:"about-us",children:[Object(q.jsx)("div",{id:"about-us-title",children:Object(q.jsx)("h1",{children:"About us"})}),Object(q.jsxs)("div",{id:"about-us-content",children:[Object(q.jsx)("p",{className:"quote",children:"Ask this question to 50 different people, and you\u2019ll likely get 50 different answers. The dictionary can\u2019t even make up its mind; definitions include: \u201cto go,\u201d \u201cto journey,\u201d \u201cto move in a given direction.\u201d All of these certainly seem vaguely like travel. But, I\u2019d hazard to say that travel is much more than just movement."}),Object(q.jsx)("p",{className:"quote",children:"\u201cTo journey\u201d would perhaps hone in on my definition of travel. It implies moving or going away from one place and ending in another, with some kind of meaningful experience in between. This is definitely the essence of travel. But travel is not that clear-cut."}),Object(q.jsx)("p",{className:"quote",children:"There is not just one kind of journey. There are the sorts of journeys that have set itineraries and destinations \u2014 like a cruise, or guided tour, where the traveler is simply along for the ride. And then there are the sorts of journeys that lack a roadmap, or perhaps consist only loosely of destinations and plans. These sorts of journeys can change at any point along the road; they can adapt, and often force the traveler to adapt along with them."})]})]})]})})},X=n(54),K=n(127),V=n(236),$=n(239),Q=function(e){var t=e.isAuth,n=Object(S.g)(),s=Object(j.b)(),a=Object(r.useState)("/"),i=Object(K.a)(a,2),o=i[0],c=i[1],l=t&&!1;var u={left:{"":"Home","popular-destinations":"Popular destinations"}},d={left:{"my-trips":"My trips","create/trip":"Add trip","get-suggestion":"Get suggestion"},right:{profile:"Profile",logout:"Logout"}},b={right:{login:"Login",register:"Register"}},h={left:{}};return Object(q.jsx)(V.a.Header,{children:function(){var e,r=Object(p.a)(Object(p.a)(Object(p.a)({},u.left),t?d.left:b.left),l?h.left:[]),a=Object(p.a)(Object(p.a)(Object(p.a)({},u.right),t?d.right:b.right),l?h.right:[]);return Object(q.jsxs)($.a,(e={mode:"horizontal",selectedKeys:o},Object(X.a)(e,"mode","horizontal"),Object(X.a)(e,"onClick",(function(e){return function(e){switch(e){case"logout":return void s(_());case"get-suggestion":return void alert("<<location suggestion popup>>");default:return c(e),void n.push("/".concat(e))}}(e.key)})),Object(X.a)(e,"children",[Object.keys(r).map((function(e){return Object(q.jsx)($.a.Item,{children:r[e]},e)})),Object.keys(a).map((function(e,t){return 0===t?Object(q.jsx)($.a.Item,{style:{marginLeft:"auto"},children:a[e]},e):Object(q.jsx)($.a.Item,{children:a[e]},e)}))]),e))}()})},Y=(n(233),["component"]);function Z(){var e=Object(j.c)((function(e){return e.user.isLoggedIn&&null!==e.user.jwt})),t=function(t){var n=t.component,r=Object(F.a)(t,Y);return Object(q.jsx)(S.b,Object(p.a)(Object(p.a)({},r),{},{render:function(t){return!0===e?Object(q.jsx)(n,Object(p.a)({},t)):Object(q.jsx)(S.a,{to:"/login"})}}))};return Object(q.jsxs)(V.a,{children:[Object(q.jsx)(Q,{isAuth:e}),Object(q.jsx)(V.a.Content,{children:Object(q.jsxs)(S.d,{children:[Object(q.jsx)(S.b,{path:"/",component:J,exact:!0}),Object(q.jsx)(S.b,{path:"/login",component:G}),Object(q.jsx)(S.b,{path:"/register",component:U}),Object(q.jsx)(S.b,{path:"/popular-destinations",component:M}),Object(q.jsx)(t,{path:"/create/trip",component:B}),Object(q.jsx)(t,{path:"/edit/trip/:id",component:B}),Object(q.jsx)(t,{path:"/profile",component:H}),Object(q.jsx)(t,{path:"/my-trips",component:z})]})})]})}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ee=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||u.c,te=Object(u.d)(P,ee(Object(u.a)(i.a),c()())),ne=document.getElementById("root");a.a.render(Object(q.jsx)(j.a,{store:te,children:Object(q.jsx)(l.a,{children:Object(q.jsx)(Z,{})})}),ne),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[234,1,2]]]);
//# sourceMappingURL=main.7552df67.chunk.js.map