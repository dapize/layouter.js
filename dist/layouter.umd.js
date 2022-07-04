(function(B,j){typeof exports=="object"&&typeof module!="undefined"?module.exports=j():typeof define=="function"&&define.amd?define(j):(B=typeof globalThis!="undefined"?globalThis:B||self,B.Layouter=j())})(this,function(){"use strict";const B=(e,s)=>{const r={};return s==="width"?Object.keys(e).map(t=>({alias:t,width:e[t].width})).sort((t,i)=>t.width>i.width?1:i.width>t.width?-1:0).forEach((t,i)=>{r[t.alias]=i?e[t.alias][s]:0}):Object.keys(e).forEach(t=>{r[t]=e[t][s]}),r},j=({bridge:e,bp:s,insertionType:r,node:t,context:i})=>{let n=i.document.getElementById("layouter-"+s);if(!n){n=i.document.createElement("style"),n.appendChild(i.document.createTextNode(""));const l=t.parentNode;switch(r){case"before":l.insertBefore(n,t);break;case"after":t.nextSibling?l.insertBefore(n,t.nextSibling):l.appendChild(n);break;case"append":t.appendChild(n);break}n.id="layouter-"+s}let o;return e?o={method:n.sheet,node:n}:o={method:{insertRule:l=>{n.appendChild(i.document.createTextNode(l))},rules:[]},node:n},o},Ae=({breakpoints:e,bridge:s,scope:r,context:t})=>{const i=r||{};return Object.keys(e).forEach(n=>{i[n]||(i[n]=j({bridge:s,bp:n,insertionType:"append",node:t.document.body,context:t}))}),i},Oe=(e,s)=>{const r={};return Object.keys(s).forEach(t=>r[t]=e[t]),r},Me="1.9.0";let S={prefix:"",breakpoints:{xs:{width:360,cols:15},sm:{width:600,cols:25},md:{width:900,cols:31},lg:{width:1200,cols:41},xlg:{width:1536,cols:51}},bridge:!0,debug:!0,searchOnInit:!0,observer:!0},x;const ee=({bps:e,bridge:s,scope:r,context:t})=>{const i=B(e,"width"),n=Oe(e,i);return{sizes:i,cols:B(e,"cols"),scope:Ae({breakpoints:n,bridge:s,scope:r,context:t}),breakpoints:n}},Be=(e,s={})=>{const r=e.layouterConfig||{};return S={...S,...s,...r},x={context:e,...S,...ee({bps:S.breakpoints,bridge:S.bridge,context:e}),styles:{},version:Me},x},g=()=>x,Se=(e,s)=>{x.styles[e]=s},Ee=e=>(x={...x,...e},e.breakpoints&&(x={...x,...ee({bps:x.breakpoints,bridge:x.bridge,scope:x.scope,context:x.context})}),x),E=e=>{let s,r=e,t=!1;const i=r.includes("@");if(i){const n=r.split("@");r=n[0],s=n[1]}else{const n=g();s=Object.keys(n.breakpoints)[0]}return e.includes("!")&&(t=!0,s=s.replace(/!/g,""),r=r.replace(/!/g,"")),{widthBp:i,numbers:r,breakPoints:s,important:t}},A=(e,s,r)=>{const t=new Error;return t.name=e,t.message=s,g().debug&&(console.error(t),r&&console.log(r)),t},se=(e,s)=>{const r=e*100/s;return(r-Math.floor(r)!==0?r.toFixed(3):r)+"%"},Te=e=>{const s=e.replace(/!/g,""),r=s.indexOf("@"),t=g(),i=t.scope,n=t.bridge,o=t.context;if(r===-1){const u=Object.keys(t.breakpoints)[0];return i[u]}const l=s.substring(r+1);if(!l.includes("-"))return i[l];if(l.substring(0,1)==="-"){if(i[l])return i[l];const u=l.substring(1);return i[l]=j({bridge:n,bp:l,insertionType:"before",node:i[u].node,context:o}),i[l]}if(i[l])return i[l];const a=l.split("-")[0];return i[l]=j({bridge:n,bp:l,insertionType:"after",node:i[a].node,context:o}),i[l]},te=e=>{const s=g();for(const r in e)if(!s.styles[r]){const t=Te(r),i=e[r],n=t.method.rules;t.method.insertRule(i,n?n.length:0),Se(r,i)}},p={jc:{ruleCss:"justify-content",classPrefix:"jc"},ai:{ruleCss:"align-items",classPrefix:"ai"},ce:{ruleCss:"center",classPrefix:"ce"},fs:{ruleCss:"flex-start",classPrefix:"fs"},fe:{ruleCss:"flex-end",classPrefix:"fe"},sb:{ruleCss:"space-between",classPrefix:"sb"},sa:{ruleCss:"space-around",classPrefix:"sa"},fw:{ruleCss:"flex-wrap",classPrefix:"fw"},nw:{ruleCss:"nowrap",classPrefix:"nw"},w:{ruleCss:"wrap",classPrefix:"w"},wr:{ruleCss:"wrap-reverse",classPrefix:"wr"},fd:{ruleCss:"flex-direction",classPrefix:"fd"},r:{ruleCss:"row",classPrefix:"r"},rr:{ruleCss:"row-reverse",classPrefix:"rr"},co:{ruleCss:"column",classPrefix:"co"},cor:{ruleCss:"column-reverse",classPrefix:"co"},au:{ruleCss:"auto",classPrefix:"au"},st:{ruleCss:"stretch",classPrefix:"st"},bl:{ruleCss:"baseline",classPrefix:"bl"},in:{ruleCss:"initial",classPrefix:"in"},ih:{ruleCss:"inherit",classPrefix:"ih"}},T={fg:{ruleCss:"flex-grow",classPrefix:"fg"},fh:{ruleCss:"flex-shrink",classPrefix:"fh"},as:{ruleCss:"align-self",classPrefix:"as"},or:{ruleCss:"order",classPrefix:"or"}},re={...T,"flex-grow":T.fg,"flex-shrink":T.fh,"align-self":T.as,order:T.or},O={...p,...re,"justify-content":p.jc,"align-items":p.ai,center:p.ce,"flex-start":p.fs,"flex-end":p.fe,"space-between":p.sb,"space-around":p.fs,"flex-wrap":p.fw,nowrap:p.nw,w:p.w,"wrap-reverse":p.wr,"flex-direction":p.fd,row:p.r,"row-reverse":p.rr,column:p.co,"column-reverse":p.cor,auto:p.au,stretch:p.st,baseline:p.bl,initial:p.in,inherit:p.ih},ie=Object.keys(re),Le=e=>"0\xAF"+e.replace("%",""),Ne=(e,s)=>{const r=g(),t=r.sizes,i=r.prefix,n=C[e].ruleCss,o={};return Object.keys(s).forEach(l=>{const a=s[l].name;let u=a;if(a.includes("%")&&(u=a.replace(a,Le(a))),u=(i?i+"-":"")+C[e].classPrefix+"-"+u.replace(/\//g,"\\/").replace(/:/g,"\\:").replace("@","\\@").split(".").join("_"),r.styles[u])o[u]=r.styles[u];else{let h;if(e==="flex"){h=s[l].value;const v=a.includes("!")?";display:flex !important;":";display:flex;",P=ie.filter(M=>a.includes(M+":"));P.length?P.length+1!==a.split(":").length&&(h+=v):h+=v}else h=n+":"+s[l].value;let f="@media screen and ",w=!1;if(!l.includes("-"))t[l]?f+="(min-width: "+t[l]+"px)":(f="."+u.replace(/!/g,"\\!")+"{"+h+"}",w=!0);else{const v=l.split("-"),P=v[0];P&&(f+="(min-width: "+t[P]+"px) and ");const M=v[1];f+="(max-width: "+(t[M]-1)+"px)"}w||(f+="{."+u.replace(/!/g,"\\!")+"{"+h+"}}"),o[u]=f}}),o},Fe=[["/",""],["\\","/"],["/:",":"],["\\:",":"],["\\@","@"],["/@","@"]],De=e=>{const s={};for(const r in e){let t=r;Fe.forEach(i=>{t=t.split(i[0]).join(i[1])}),s[t]=e[r]}return s},L=e=>{const s=Ne(e.type,e.bps);return e.deep&&te(s),De(s)},R=(e,s=!1)=>{let r,t;const i={},n=g();let o,l,a;const u=Object.keys(n.breakpoints)[0];let d=!1;for(const h of e.split(" ")){let f=h;if(o=f,a=E(f),t=a.breakPoints,f=a.numbers,f.includes("/")){const w=f.split("/");r=[Number(w[0]),Number(w[1])]}else if(a.widthBp)if(t.includes("-")){d=A("SyntaxError","You can't determine a 'until breakpoint' when use the explicit columns max: "+e);break}else r=[Number(f),n.cols[t]];else r=[Number(f),n.cols[u]];l=se(r[0],r[1]),a.important&&(l+=" !important"),i[t]={name:o,value:l}}return d||L({type:"cols",bps:i,deep:s})},H=(e,s=!1)=>{const r={};let t=!1;const i=g(),n=Object.keys(i.breakpoints)[0];for(const o of e.split(" ")){let l;const a=E(o),u=a.breakPoints,d=a.numbers.split(":"),h=d[0],f=d[1];let w;if(ie.includes(h))l=O[h].ruleCss+":"+f,w=f;else{if(!O[h]){t=A("Non-existent Alias","Don't exists the alias '"+h+"' in Flex vault.");break}if(!O[f]){t=A("Non-existent Alias","Don't exists the alias '"+f+"' in Flex vault.");break}l=O[h].ruleCss+":"+O[f].ruleCss,w=O[f].classPrefix}let v=u===n?"":"@"+u;a.important&&(l+=" !important",v+="!");let P=O[h].classPrefix+":"+w+v;if(!r[u])r[u]={name:P,value:l};else{P.includes("@")&&(P=P.split("@")[0]);let M=r[u].name.split("@")[0];r[u].name.includes("!")&&!M.includes("!")&&(M+="!"),r[u].name=M+"-"+P+v,r[u].value+=";"+l}}return t||L({type:"flex",bps:r,deep:s})},Ve=["%","rem","em","ex","vw","vh","pt","cm","pc"],Re=e=>{let s;return e.includes("/")?(s=e.split("/"),s=se(parseFloat(s[0]),parseFloat(s[1]))):e==="auto"?s="auto":Ve.filter(t=>e.includes(t)).length?s=e:s=e==="0"?e:e+"px",s},m=(e,s,r=!1)=>{const t={};return e.split(" ").forEach(i=>{const n=E(i),o=n.breakPoints;let l=n.numbers.split("-").map(a=>Re(a)).join(" ");n.important&&(l+=" !important"),t[o]={name:i,value:l}}),L({type:s,bps:t,deep:r})},ne=(e,s=!1)=>m(e,"pad",s),I=(e,s=!1)=>m(e,"padt",s),Y=(e,s=!1)=>m(e,"padr",s),W=(e,s=!1)=>m(e,"padb",s),X=(e,s=!1)=>m(e,"padl",s),le=(e,s=!1)=>m(e,"mar",s),z=(e,s=!1)=>m(e,"mart",s),G=(e,s=!1)=>m(e,"marr",s),U=(e,s=!1)=>m(e,"marb",s),q=(e,s=!1)=>m(e,"marl",s),ae=(e,s=!1)=>m(e,"mxw",s),oe=(e,s=!1)=>m(e,"mxh",s),ce=(e,s=!1)=>m(e,"miw",s),ue=(e,s=!1)=>m(e,"mih",s),fe=(e,s=!1)=>m(e,"hgt",s),de=(e,s=!1)=>m(e,"wdh",s),k={st:{ruleCss:"static",classPrefix:"st"},ab:{ruleCss:"absolute",classPrefix:"ab"},fi:{ruleCss:"fixed",classPrefix:"fi"},re:{ruleCss:"relative",classPrefix:"re"},si:{ruleCss:"sticky",classPrefix:"si"},in:{ruleCss:"initial",classPrefix:"in"},ih:{ruleCss:"inherit",classPrefix:"ih"}},_={...k,static:k.st,absolute:k.ab,fixed:k.fi,relative:k.re,sticky:k.si,initial:k.in,inherit:k.ih},pe=(e,s=!1)=>{const r={};let t=!1;const i=g(),n=Object.keys(i.breakpoints)[0];for(const o of e.split(" ")){let l;const a=E(o),u=a.breakPoints,d=a.numbers;if(!_[d]){t=A("Non-existent Alias","Don't exists the alias '"+d+"' in Position vault.");break}l=_[d].ruleCss;const h=_[d].classPrefix;let f=u===n?"":"@"+u;a.important&&(l+=" !important",f+="!"),r[u]={name:h+f,value:l}}return t||L({type:"pos",bps:r,deep:s})},me=(e,s=!1)=>m(e,"t",s),be=(e,s=!1)=>m(e,"r",s),he=(e,s=!1)=>m(e,"b",s),xe=(e,s=!1)=>m(e,"l",s),y={bl:{ruleCss:"block",classPrefix:"bl"},il:{ruleCss:"inline",classPrefix:"il"},ib:{ruleCss:"inline-block",classPrefix:"ib"},fx:{ruleCss:"flex",classPrefix:"fx"},if:{ruleCss:"inline-flex",classPrefix:"if"},no:{ruleCss:"none",classPrefix:"no"},in:{ruleCss:"initial",classPrefix:"in"},ih:{ruleCss:"inherit",classPrefix:"ih"}},$={...y,block:y.bl,inline:y.il,"inline-block":y.ib,flex:y.fx,"inline-flex":y.if,none:y.no,initial:y.in,inherit:y.ih},He=(e,s=!1)=>{const r={};let t=!1;const i=g(),n=Object.keys(i.breakpoints)[0];for(const o of e.split(" ")){let l;const a=E(o),u=a.breakPoints,d=a.numbers;if(!$[d]){t=A("Non-existent Alias","Don't exists the alias '"+d+"' in display vault.");break}l=$[d].ruleCss;const h=$[d].classPrefix;let f=u===n?"":"@"+u;a.important&&(l+=" !important",f+="!"),r[u]={name:h+f,value:l}}return t||L({type:"d",bps:r,deep:s})},F=e=>{const s=e.builderA(e.values,e.insertStyles),r=e.builderB(e.values,e.insertStyles),t={};for(const i in s)t[i]=s[i];for(const i in r)t[i]=r[i];return t},J=(e,s=!1)=>F({values:e,builderA:Y,builderB:X,insertStyles:s}),K=(e,s=!1)=>F({values:e,builderA:I,builderB:W,insertStyles:s}),Q=(e,s=!1)=>F({values:e,builderA:G,builderB:q,insertStyles:s}),Z=(e,s=!1)=>F({values:e,builderA:z,builderB:U,insertStyles:s}),c={cols:{build:R,ruleCss:"width",classPrefix:"c"},pad:{build:ne,ruleCss:"padding",classPrefix:"p"},padt:{build:I,ruleCss:"padding-top",classPrefix:"pt"},padr:{build:Y,ruleCss:"padding-right",classPrefix:"pr"},padb:{build:W,ruleCss:"padding-bottom",classPrefix:"pb"},padl:{build:X,ruleCss:"padding-left",classPrefix:"pl"},padx:{build:J,ruleCss:["padding-left","padding-right"],classPrefix:"px"},pady:{build:K,ruleCss:["padding-top","padding-bottom"],classPrefix:"py"},mar:{build:le,ruleCss:"margin",classPrefix:"m"},mart:{build:z,ruleCss:"margin-top",classPrefix:"mt"},marr:{build:G,ruleCss:"margin-right",classPrefix:"mr"},marb:{build:U,ruleCss:"margin-bottom",classPrefix:"mb"},marl:{build:q,ruleCss:"margin-left",classPrefix:"ml"},marx:{build:Q,ruleCss:["margin-left","margin-right"],classPrefix:"px"},mary:{build:Z,ruleCss:["margin-top","margin-bottom"],classPrefix:"py"},flex:{build:H,ruleCss:"display: flex",classPrefix:"fx"},mxw:{build:ae,ruleCss:"max-width",classPrefix:"mxw"},mxh:{build:oe,ruleCss:"max-height",classPrefix:"mxh"},miw:{build:ce,ruleCss:"min-width",classPrefix:"miw"},mih:{build:ue,ruleCss:"min-height",classPrefix:"mih"},wdh:{build:de,ruleCss:"width",classPrefix:"w"},hgt:{build:fe,ruleCss:"height",classPrefix:"h"},pos:{build:pe,ruleCss:"position",classPrefix:"pos"},t:{build:me,ruleCss:"top",classPrefix:"t"},r:{build:be,ruleCss:"right",classPrefix:"r"},b:{build:he,ruleCss:"bottom",classPrefix:"b"},l:{build:xe,ruleCss:"left",classPrefix:"l"},d:{build:He,ruleCss:"display",classPrefix:"d"}},C={...c,c:c.cols,fx:c.flex,p:c.pad,padding:c.pad,pt:c.padt,"padding-top":c.padt,pr:c.padr,"padding-right":c.padr,pb:c.padb,"padding-bottom":c.padb,pl:c.padl,"padding-left":c.padl,py:c.pady,"padding-y":c.pady,px:c.padx,"padding-x":c.padx,m:c.mar,margin:c.mar,mt:c.mart,"margin-top":c.mart,mr:c.marr,"margin-right":c.marr,mb:c.marb,"margin-bottom":c.marb,ml:c.marl,"margin-left":c.marl,my:c.mary,"margin-y":c.mary,mx:c.marx,"margin-x":c.marx,w:c.wdh,width:c.wdh,h:c.hgt,height:c.hgt,"max-width":c.mxw,"max-height":c.mxh,"min-width":c.miw,"min-height":c.mih,position:c.pos,top:c.t,right:c.r,bottom:c.b,left:c.l,display:c.d},ge=e=>{const s={},r=e.attributes,t=Object.keys(C);return Array.prototype.forEach.call(r,i=>{t.includes(i.name)&&i.value!==""&&(s[i.name]=i.value.trim().split(" ").filter(n=>n).join(" "))}),s},Pe=(e,s=!1)=>{const r={};let t=!1;for(const i in e){const o=C[i].build(e[i],s);if(o instanceof Error){t=o;break}else r[i]=o}return t||r},ye=(e,s,r)=>new Promise(t=>{const i=g(),n=s.split(" ");let o=n;if(!r&&(o=n.filter(a=>!e.classList.contains(a)),!o.length)){t();return}const l=new i.context.MutationObserver(a=>{const d=a[0].target.className.split(" ");n.every(f=>d.includes(f))&&(l.disconnect(),t())});if(l.observe(e,{childList:!1,subtree:!1,attributes:!0,attributeFilter:["class"],characterData:!1}),r)e.className=s;else{const a=e.hasAttribute("class")?" ":"";e.className+=a+o.join(" ")}}),Ce=(e,s,r)=>new Promise(t=>{if(!e.hasAttribute(s)){t();return}const i=new r.MutationObserver(()=>{i.disconnect(),t()});i.observe(e,{childList:!1,subtree:!1,attributes:!0,attributeFilter:[s],characterData:!1}),e.removeAttribute(s)}),Ie=(e,s,r)=>new Promise(t=>{const i=s.map(n=>Ce(e,n,r));Promise.all(i).then(()=>t())}),we=(e,s)=>new Promise(r=>{const t=g();Array.isArray(s)?Ie(e,s,t.context).then(r):Ce(e,s,t.context).then(r)}),N=({node:e,directive:s,classes:r,resolve:t})=>{const i=g();we(e,s).then(()=>ye(e,r)).then(()=>{t();const n=new i.context.CustomEvent("layout:ready");e.dispatchEvent(n)})},Ye=(e,s)=>new Promise((r,t)=>{const i=s||ge(e),n=Object.keys(i);if(!n.length){const d=A("Parameter Missing","don't exists any parameter to process",e);t(d);return}const o={};for(const d in i)o[d]=i[d];const l=Pe(o,!0);if(l instanceof Error){t(l);return}const a=l,u=Object.keys(a).map(d=>Object.keys(a[d])).flat().join(" ");N({node:e,directive:n,classes:u,resolve:r})}),D=(e,s)=>{const r=s.map(t=>e.getAttribute(t)).filter(t=>t).join(" ");return r||A("Empty",'The value of the directives "'+s.join(", ")+'" are empty',e)},We=(e,s)=>new Promise((r,t)=>{const i=s||D(e,["flex","fx"]);if(!i)return t(i);const n=H(i,!0);if(n instanceof Error){t(n);return}N({node:e,directive:"flex",classes:Object.keys(n).join(" "),resolve:r})}),Xe=(e,s)=>new Promise((r,t)=>{const i=s||D(e,["c","cols"]);if(!i)return t(i);const n=R(i,!0);if(n instanceof Error){t(n);return}const o=Object.keys(n).join(" ");N({node:e,directive:"cols",classes:o,resolve:r})}),b=(e,s,r)=>new Promise((t,i)=>{const n=r||D(e,s);if(!n)return i(n);const o=s[0],l=m(n,o,!0),a=Object.keys(l).join(" ");N({node:e,directive:o,classes:a,resolve:t})}),ze=(e,s)=>b(e,["hgt","h"],s),Ge=(e,s)=>b(e,["marb","mb","margin-bottom"],s),Ue=(e,s)=>b(e,["marl","ml","margin-left"],s),qe=(e,s)=>b(e,["marr","mr","margin-right"],s),_e=(e,s)=>b(e,["mar","m","margin"],s),$e=(e,s)=>b(e,["mart","mt","margin-top"],s),Je=(e,s)=>b(e,["mxw","max-width"],s),Ke=(e,s)=>b(e,["mih","min-height"],s),Qe=(e,s)=>b(e,["miw","min-width"],s),Ze=(e,s)=>b(e,["padb","pb","padding-bottom"],s),es=(e,s)=>b(e,["padl","pl","padding-left"],s),ss=(e,s)=>b(e,["padr","pr","padding-right"],s),ts=(e,s)=>b(e,["pad","p","padding"],s),rs=(e,s)=>b(e,["padt","pt","padding-top"],s),is=(e,s)=>b(e,["wdh","width"],s),ns=(e,s)=>b(e,["mxh","max-height"],s),ls=(e,s)=>b(e,["pos","position"],s),as=(e,s)=>b(e,["t","top"],s),os=(e,s)=>b(e,["r","right"],s),cs=(e,s)=>b(e,["b","bottom"],s),us=(e,s)=>b(e,["l","left"],s),V=e=>new Promise((s,r)=>{const t=e.vals||D(e.Node,e.directives);if(!t)return r(t);const i=e.builder(t,!0),n=Object.keys(i).join(" ");N({node:e.Node,directive:e.directives,classes:n,resolve:s})}),fs=(e,s)=>V({Node:e,directives:["padx","px","padding-x"],builder:J,vals:s}),ds=(e,s)=>V({Node:e,directives:["pady","py","padding-y"],builder:K,vals:s}),ps=(e,s)=>V({Node:e,directives:["marx","px","margin-x"],builder:Q,vals:s}),ms=(e,s)=>V({Node:e,directives:["mary","py","margin-y"],builder:Z,vals:s}),bs=e=>new Promise(s=>{const t=[...new Set(Object.keys(C).map(n=>C[n].classPrefix))],i=e.className.split(" ").filter(n=>n.includes("-")?!t.find(l=>{const a=l.length;return n.substring(0,a+1)===l+"-"}):!0);if(i.length){const n=i.join(" ");ye(e,n,!0).then(()=>{s()})}else we(e,"class").then(()=>{s()})}),hs=["animate","animateMotion","animateTransform","circle","clipPath","defs","desc","discard","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","hatch","hatchpath","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","style","svg","switch","symbol","text","textPath","title","tspan","use","view"],ve=(e,s)=>new Promise(r=>{const i=Object.keys(C).map(a=>`[${a}]`).join(", "),n=s.querySelectorAll(i);if(!n.length){r(e);return}const o=new Set;Array.prototype.filter.call(n,a=>!hs.includes(a.nodeName.toLowerCase())).forEach(a=>o.add(a));const l=[];o.forEach(a=>{l.push(e.set(a))}),Promise.all(l).then(r)}),ke=e=>{const s=g(),r=Object.keys(C),t=new e.context.MutationObserver(n=>{for(const o of n)if(o.type==="childList"){if(!o.addedNodes.length)continue;o.addedNodes.forEach(l=>{if(l instanceof HTMLElement){const a=e.getParameters(l);Object.keys(a).length&&e.set(l,a),ve(e,l)}})}else if(o.type==="attributes"){const l=o.target;if(l instanceof HTMLElement){const a=e.getParameters(l);Object.keys(a).length&&e.set(l,a)}}}),i={childList:!0,subtree:!0,attributes:!0,attributeFilter:r,characterData:!1};t.observe(s.context.document.body,i)},je=(e,s={})=>{const r=Be(e,s),t={...r,getParameters:ge,updateConfig:Ee,insertRules:te,build:Pe,buildCols:R,buildFlex:H,buildPad:ne,buildPadTop:I,buildPadRight:Y,buildPadBottom:W,buildPadLeft:X,buildPadX:J,buildPadY:K,buildMar:le,buildMarTop:z,buildMarRight:G,buildMarBottom:U,buildMarLeft:q,buildMarX:Q,buildMarY:Z,buildMaxWidth:ae,buildMaxHeight:oe,buildMinWidth:ce,buildMinHeight:ue,buildHeight:fe,buildWidth:de,set:Ye,setCols:Xe,setFlex:We,setMar:_e,setMarTop:$e,setMarRight:qe,setMarBottom:Ge,setMarLeft:Ue,setMarX:ps,setMarY:ms,setPad:ts,setPadTop:rs,setPadRight:ss,setPadBottom:Ze,setPadLeft:es,setPadX:fs,setPadY:ds,setWidth:is,setMinWidth:Qe,setMaxWidth:Je,setHeight:ze,setMinHeight:Ke,setMaxHeight:ns,buildPosition:pe,buildTop:me,buildRight:be,buildBottom:he,buildLeft:xe,setPosition:ls,setTop:as,setRight:os,setBottom:cs,setLeft:us,reset:bs,processors:C};return r.searchOnInit?ve(t,e.document).then(()=>{t.ready&&t.ready(t),r.observer&&ke(t)}):(r.observer&&ke(t),t.ready&&t.ready(t)),t};return typeof window!="undefined"&&typeof exports=="undefined"&&(window.layouter=je(window)),je});
//# sourceMappingURL=layouter.umd.js.map
