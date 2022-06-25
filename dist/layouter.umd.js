(function(C,y){typeof exports=="object"&&typeof module!="undefined"?module.exports=y():typeof define=="function"&&define.amd?define(y):(C=typeof globalThis!="undefined"?globalThis:C||self,C.Layouter=y())})(this,function(){"use strict";const C=(e,t)=>{const r={};return t==="width"?Object.keys(e).map(s=>({alias:s,width:e[s].width})).sort((s,n)=>s.width>n.width?1:n.width>s.width?-1:0).forEach((s,n)=>{r[s.alias]=n?e[s.alias][t]:0}):Object.keys(e).forEach(s=>{r[s]=e[s][t]}),r},y=({bridge:e,bp:t,insertionType:r,node:s,context:n})=>{let o=n.document.getElementById("layouter-"+t);if(!o){o=n.document.createElement("style"),o.appendChild(n.document.createTextNode(""));const i=s.parentNode;switch(r){case"before":i.insertBefore(o,s);break;case"after":s.nextSibling?i.insertBefore(o,s.nextSibling):i.appendChild(o);break;case"append":s.appendChild(o);break}o.id="layouter-"+t}let l;return e?l={method:o.sheet,node:o}:l={method:{insertRule:i=>{o.appendChild(n.document.createTextNode(i))},rules:[]},node:o},l},ue=({breakpoints:e,bridge:t,scope:r,context:s})=>{const n=r||{};return Object.keys(e).forEach(o=>{n[o]||(n[o]=y({bridge:t,bp:o,insertionType:"append",node:s.document.body,context:s}))}),n},de=(e,t)=>{const r={};return Object.keys(t).forEach(s=>r[s]=e[s]),r},fe="1.3";let k={prefix:"",breakpoints:{xs:{width:360,cols:15},sm:{width:600,cols:25},md:{width:900,cols:31},lg:{width:1200,cols:41},xlg:{width:1536,cols:51}},bridge:!0,debug:!0},b;const B=({bps:e,bridge:t,scope:r,context:s})=>{const n=C(e,"width"),o=de(e,n);return{sizes:n,cols:C(e,"cols"),scope:ue({breakpoints:o,bridge:t,scope:r,context:s}),breakpoints:o}},pe=(e,t={})=>{const r=e.layouterConfig||{};return k={...k,...t,...r},b={context:e,...k,...B({bps:k.breakpoints,bridge:k.bridge,context:e}),styles:{},version:fe},b},m=()=>b,be=(e,t)=>{b.styles[e]=t},me=e=>(b={...b,...e},e.breakpoints&&(b={...b,...B({bps:b.breakpoints,bridge:b.bridge,scope:b.scope,context:b.context})}),b),O=e=>{let t,r=e,s=!1;const n=r.includes("@");if(n){const o=r.split("@");r=o[0],t=o[1]}else{const o=m();t=Object.keys(o.breakpoints)[0]}return e.includes("!")&&(s=!0,t=t.replace(/!/g,""),r=r.replace(/!/g,"")),{widthBp:n,numbers:r,breakPoints:t,important:s}},x=(e,t,r)=>{const s=new Error;return s.name=e,s.message=t,m().debug&&(console.error(s),r&&console.log(r)),s},L=(e,t)=>{const r=e*100/t;return(r-Math.floor(r)!==0?r.toFixed(3):r)+"%"},he=e=>{const t=e.replace(/!/g,""),r=t.indexOf("@"),s=m(),n=s.scope,o=s.bridge,l=s.context;if(r===-1){const c=Object.keys(s.breakpoints)[0];return n[c]}const i=t.substring(r+1);if(!i.includes("-"))return n[i];if(i.substring(0,1)==="-"){if(n[i])return n[i];const c=i.substring(1);return n[i]=y({bridge:o,bp:i,insertionType:"before",node:n[c].node,context:l}),n[i]}if(n[i])return n[i];const a=i.split("-")[0];return n[i]=y({bridge:o,bp:i,insertionType:"after",node:n[a].node,context:l}),n[i]},F=e=>{const t=m();for(const r in e)if(!t.styles[r]){const s=he(r),n=e[r],o=s.method.rules;s.method.insertRule(n,o?o.length:0),be(r,n)}},v={jc:"justify-content",ai:"align-items",ce:"center",fs:"flex-start",fe:"flex-end",sb:"space-between",sa:"space-around",fw:"flex-wrap",nw:"nowrap",w:"wrap",wr:"wrap-reverse",fd:"flex-direction",r:"row",rr:"row-reverse",co:"column",cor:"column-reverse",fg:"flex-grow",fh:"flex-shrink",as:"align-self",or:"order",au:"auto",st:"stretch",bl:"baseline",in:"initial",ih:"inherit"},D=["fg","fh","or"],ge=e=>"0\xAF"+e.replace("%",""),xe=(e,t)=>{const r=m(),s=r.sizes,n=r.prefix,o=P[e].ruleCss,l={};return Object.keys(t).forEach(i=>{const a=t[i].name;let c=a;a.includes("%")&&(c=a.replace(a,ge(a))),c=(n?n+"-":"")+e+"-"+c.replace(/\//g,"\\/").replace(/:/g,"\\:").replace("@","\\@").split(".").join("_");let h;if(e==="flex"){h=t[i].value;const w=a.includes("!")?";display:flex !important;":";display:flex;",j=["as"].concat(D).filter(T=>a.includes(T+":"));j.length?j.length+1!==a.split(":").length&&(h+=w):h+=w}else h=o+":"+t[i].value;let u="@media screen and ",g=!1;if(!i.includes("-"))s[i]?u+="(min-width: "+s[i]+"px)":(u="."+c.replace(/!/g,"\\!")+"{"+h+"}",g=!0);else{const w=i.split("-"),j=w[0];j&&(u+="(min-width: "+s[j]+"px) and ");const T=w[1];u+="(max-width: "+(s[T]-1)+"px)"}g||(u+="{."+c.replace(/!/g,"\\!")+"{"+h+"}}"),l[c]=u}),l},ye=[["/",""],["\\","/"],["/:",":"],["\\:",":"],["\\@","@"],["/@","@"]],we=e=>{const t={};for(const r in e){let s=r;ye.forEach(n=>{s=s.split(n[0]).join(n[1])}),t[s]=e[r]}return t},A=e=>{const t=xe(e.type,e.bps);return e.deep&&F(t),we(t)},M=(e,t=!1)=>{let r,s;const n={},o=m();let l,i,a;const c=Object.keys(o.breakpoints)[0];let p=!1;for(const h of e.split(" ")){let u=h;if(l=u,a=O(u),s=a.breakPoints,u=a.numbers,u.includes("/")){const g=u.split("/");r=[Number(g[0]),Number(g[1])]}else if(a.widthBp)if(s.includes("-")){p=x("SyntaxError","You can't determine a 'until breakpoint' when use the explicit columns max: "+e);break}else r=[Number(u),o.cols[s]];else r=[Number(u),o.cols[c]];i=L(r[0],r[1]),a.important&&(i+=" !important"),n[s]={name:l,value:i}}return p||A({type:"cols",bps:n,deep:t})},S=(e,t=!1)=>{const r={};let s=!1;const n=m(),o=Object.keys(n.breakpoints)[0];for(const l of e.split(" ")){let i,a=l;const c=O(l),p=c.breakPoints,h=c.numbers.split(":"),u=h[0],g=h[1];if(D.includes(u))i=v[u]+":"+g;else{if(!v[u]){s=x("Non-existent Alias","Don't exists the alias '"+u+"' in Flex vault.");break}if(!v[g]){s=x("Non-existent Alias","Don't exists the alias '"+g+"' in Flex vault.");break}i=v[u]+":"+v[g]}if(c.important&&(i+=" !important"),!r[p])r[p]={name:a,value:i};else{a.includes("@")&&(a=a.split("@")[0]);const w=p===o?"":"@"+p;r[p].name=r[p].name.split("@")[0]+"-"+a+w,r[p].value+=";"+i}}return s||A({type:"flex",bps:r,deep:t})},Ce=["%","rem","em","ex","vw","vh","pt","cm","pc"],Pe=e=>{let t;return e.includes("/")?(t=e.split("/"),t=L(parseFloat(t[0]),parseFloat(t[1]))):e==="auto"?t="auto":Ce.filter(s=>e.includes(s)).length?t=e:t=e==="0"?e:e+"px",t},d=(e,t,r=!1)=>{const s={};return e.split(" ").forEach(n=>{const o=O(n),l=o.breakPoints;let i=o.numbers.split("-").map(a=>Pe(a)).join(" ");o.important&&(i+=" !important"),s[l]={name:n,value:i}}),A({type:t,bps:s,deep:r})},R=(e,t=!1)=>d(e,"pad",t),N=(e,t=!1)=>d(e,"padt",t),H=(e,t=!1)=>d(e,"padr",t),V=(e,t=!1)=>d(e,"padb",t),W=(e,t=!1)=>d(e,"padl",t),I=(e,t=!1)=>d(e,"mar",t),z=(e,t=!1)=>d(e,"mart",t),U=(e,t=!1)=>d(e,"marr",t),q=(e,t=!1)=>d(e,"marb",t),Y=(e,t=!1)=>d(e,"marl",t),_=(e,t=!1)=>d(e,"mxw",t),$=(e,t=!1)=>d(e,"mxh",t),G=(e,t=!1)=>d(e,"miw",t),J=(e,t=!1)=>d(e,"mih",t),K=(e,t=!1)=>d(e,"hgt",t),Q=(e,t=!1)=>d(e,"wdh",t),X={st:"static",ab:"absolute",fi:"fixed",re:"relative",si:"sticky",in:"initial",ih:"inherit"},Z=(e,t=!1)=>{const r={};let s=!1;for(const n of e.split(" ")){let o;const l=n,i=O(n),a=i.breakPoints,c=i.numbers;if(!X[c]){s=x("Non-existent Alias","Don't exists the alias '"+c+"' in Position vault.");break}o=X[c],i.important&&(o+=" !important"),r[a]={name:l,value:o}}return s||A({type:"pos",bps:r,deep:t})},ee=(e,t=!1)=>d(e,"t",t),te=(e,t=!1)=>d(e,"r",t),se=(e,t=!1)=>d(e,"b",t),ne=(e,t=!1)=>d(e,"l",t),P={cols:{build:M,ruleCss:"width"},pad:{build:R,ruleCss:"padding"},padt:{build:N,ruleCss:"padding-top"},padr:{build:H,ruleCss:"padding-right"},padb:{build:V,ruleCss:"padding-bottom"},padl:{build:W,ruleCss:"padding-left"},mar:{build:I,ruleCss:"margin"},mart:{build:z,ruleCss:"margin-top"},marr:{build:U,ruleCss:"margin-right"},marb:{build:q,ruleCss:"margin-bottom"},marl:{build:Y,ruleCss:"margin-left"},flex:{build:S,ruleCss:"display: flex"},mxw:{build:_,ruleCss:"max-width"},mxh:{build:$,ruleCss:"max-height"},miw:{build:G,ruleCss:"min-width"},mih:{build:J,ruleCss:"min-height"},wdh:{build:Q,ruleCss:"width"},hgt:{build:K,ruleCss:"height"},pos:{build:Z,ruleCss:"position"},t:{build:ee,ruleCss:"top"},r:{build:te,ruleCss:"right"},b:{build:se,ruleCss:"bottom"},l:{build:ne,ruleCss:"left"}},re=e=>{const t={},r=e.attributes,s=Object.keys(P);return Array.prototype.forEach.call(r,n=>{s.includes(n.name)&&n.value!==""&&(t[n.name]=n.value.trim().split(" ").filter(o=>o).join(" "))}),t},oe=(e,t=!1)=>{const r={};let s=!1;for(const n in e){const l=P[n].build(e[n],t);if(l instanceof Error){s=l;break}else r[n]=l}return s||r},ie=(e,t,r)=>new Promise(s=>{const n=m(),o=t.split(" ");let l=o;if(!r&&(l=o.filter(a=>!e.classList.contains(a)),!l.length)){s();return}const i=new n.context.MutationObserver(a=>{const p=a[0].target.className.split(" ");o.every(u=>p.includes(u))&&(i.disconnect(),s())});if(i.observe(e,{childList:!1,subtree:!1,attributes:!0,attributeFilter:["class"],characterData:!1}),r)e.className=t;else{const a=e.hasAttribute("class")?" ":"";e.className+=a+l.join(" ")}}),le=(e,t,r)=>new Promise(s=>{if(!e.hasAttribute(t)){s();return}const n=new r.MutationObserver(()=>{n.disconnect(),s()});n.observe(e,{childList:!1,subtree:!1,attributes:!0,attributeFilter:[t],characterData:!1}),e.removeAttribute(t)}),ke=(e,t,r)=>new Promise(s=>{const n=t.map(o=>le(e,o,r));Promise.all(n).then(()=>s())}),ae=(e,t)=>new Promise(r=>{const s=m();Array.isArray(t)?ke(e,t,s.context).then(r):le(e,t,s.context).then(r)}),E=({node:e,directive:t,classes:r,resolve:s})=>{const n=m();ae(e,t).then(()=>ie(e,r)).then(()=>{s();const o=new n.context.CustomEvent("layout:ready");e.dispatchEvent(o)})},ve=(e,t)=>new Promise((r,s)=>{const n=t||re(e),o=Object.keys(n);if(!o.length){const p=x("Parameter Missing","don't exists any parameter to process",e);s(p);return}const l={};for(const p in n)l[p]=n[p];const i=oe(l,!0);if(i instanceof Error){s(i);return}const a=i,c=Object.keys(a).map(p=>Object.keys(a[p])).flat().join(" ");E({node:e,directive:o,classes:c,resolve:r})}),je=(e,t)=>new Promise((r,s)=>{const n=t||e.getAttribute("flex");if(!n){const i=x("Empty",'The value of the directive "flex" is empty',e);s(i);return}const o=S(n,!0);if(o instanceof Error){s(o);return}const l=Object.keys(o).join(" ");E({node:e,directive:"flex",classes:l,resolve:r})}),Oe=(e,t)=>new Promise((r,s)=>{const n=t||e.getAttribute("cols");if(!n){const i=x("Empty","The value of the directive 'cols' is empty",e);s(i);return}const o=M(n,!0);if(o instanceof Error){s(o);return}const l=Object.keys(o).join(" ");E({node:e,directive:"cols",classes:l,resolve:r})}),f=(e,t,r)=>new Promise((s,n)=>{const o=r||e.getAttribute(t);if(!o){const a=x("Empty",'The value of the directive "'+t+'" is empty',e);n(a);return}const l=d(o,t,!0),i=Object.keys(l).join(" ");E({node:e,directive:t,classes:i,resolve:s})}),Ae=(e,t)=>f(e,"hgt",t),Ee=(e,t)=>f(e,"marb",t),Me=(e,t)=>f(e,"marl",t),Se=(e,t)=>f(e,"marr",t),Te=(e,t)=>f(e,"mar",t),Be=(e,t)=>f(e,"mart",t),Le=(e,t)=>f(e,"mxw",t),Fe=(e,t)=>f(e,"mih",t),De=(e,t)=>f(e,"miw",t),Re=(e,t)=>f(e,"padb",t),Ne=(e,t)=>f(e,"padl",t),He=(e,t)=>f(e,"padr",t),Ve=(e,t)=>f(e,"pad",t),We=(e,t)=>f(e,"padt",t),Ie=(e,t)=>f(e,"wdh",t),ze=(e,t)=>f(e,"mxh",t),Ue=(e,t)=>f(e,"pos",t),qe=(e,t)=>f(e,"t",t),Ye=(e,t)=>f(e,"r",t),_e=(e,t)=>f(e,"b",t),$e=(e,t)=>f(e,"l",t),Ge=e=>new Promise(t=>{const r=Object.keys(P),s=[];if(e.className.split(" ").filter(n=>{if(n.length<4)return s.push(n),!1;const o=n.length>=5?5:4;let l=n.substring(0,o);const i=l.split("").indexOf("-");return i===-1?(s.push(n),!1):(l=l.substring(0,i),r.includes(l)?!0:(s.push(n),!1))}),s.length){const n=s.join(" ");ie(e,n,!0).then(()=>{t()})}else ae(e,"class").then(()=>{t()})}),Je=e=>new Promise(t=>{const r=m(),n=Object.keys(P).map(a=>`[${a}]`).join(", "),o=r.context.document.querySelectorAll(n);if(!o.length){t(e);return}const l=new Set;Array.prototype.forEach.call(o,a=>{l.add(a)});const i=[];l.forEach(a=>{i.push(e.set(a))}),Promise.all(i).then(t)}),Ke=e=>{const t=m(),r=Object.keys(P),s=new e.context.MutationObserver(o=>{for(const l of o)if(l.type==="childList"){if(!l.addedNodes.length)continue;l.addedNodes.forEach(i=>{if(i instanceof HTMLElement){const a=e.getParameters(i);Object.keys(a).length&&e.set(i,a)}})}else if(l.type==="attributes"){const i=l.target;if(i instanceof HTMLElement){const a=e.getParameters(i);Object.keys(a).length&&e.set(i,a)}}}),n={childList:!0,subtree:!0,attributes:!0,attributeFilter:r,characterData:!1};s.observe(t.context.document.body,n)},ce=(e,t={})=>{const s={...pe(e,t),getParameters:re,updateConfig:me,insertRules:F,build:oe,buildCols:M,buildFlex:S,buildPad:R,buildPadTop:N,buildPadRight:H,buildPadBottom:V,buildPadLeft:W,buildMar:I,buildMarTop:z,buildMarRight:U,buildMarBottom:q,buildMarLeft:Y,buildMaxWidth:_,buildMaxHeight:$,buildMinWidth:G,buildMinHeight:J,buildHeight:K,buildWidth:Q,set:ve,setCols:Oe,setFlex:je,setMar:Te,setMarTop:Be,setMarRight:Se,setMarBottom:Ee,setMarLeft:Me,setPad:Ve,setPadTop:We,setPadRight:He,setPadBottom:Re,setPadLeft:Ne,setWidth:Ie,setMinWidth:De,setMaxWidth:Le,setHeight:Ae,setMinHeight:Fe,setMaxHeight:ze,reset:Ge,buildPosition:Z,buildTop:ee,buildRight:te,buildBottom:se,buildLeft:ne,setPosition:Ue,setTop:qe,setRight:Ye,setBottom:_e,setLeft:$e};return Je(s).then(()=>{s.ready&&s.ready(s),Ke(s)}),s};return typeof window!="undefined"&&typeof exports=="undefined"&&(window.layouter=ce(window)),ce});
//# sourceMappingURL=layouter.umd.js.map
