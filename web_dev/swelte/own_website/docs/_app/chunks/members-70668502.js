import{S as Z,i as K,s as T,e as c,k as O,t as G,c as m,a as f,d,m as V,h as E,I as W,b as l,f as j,g as X,J as s,j as C,U as Y,V as $,W as ee}from"./index-9dc72382.js";import{f as te,a as se}from"./index-d570b644.js";function ie(r){let t,p,i,_,D,w,u,o,q=r[0].name+"",L,A,v,P=r[0].title+"",y,B,b,I=r[0].description+"",J,N,g,S=r[0].mail_adress+"",Q,k,F,M,n;return{c(){t=c("div"),p=c("figure"),i=c("img"),w=O(),u=c("div"),o=c("h2"),L=G(q),A=G(", "),v=c("span"),y=G(P),B=O(),b=c("p"),J=G(I),N=O(),g=c("a"),Q=G(S),this.h()},l(e){t=m(e,"DIV",{class:!0});var a=f(t);p=m(a,"FIGURE",{});var x=f(p);i=m(x,"IMG",{src:!0,style:!0,alt:!0}),x.forEach(d),w=V(a),u=m(a,"DIV",{class:!0});var h=f(u);o=m(h,"H2",{class:!0});var H=f(o);L=E(H,q),A=E(H,", "),v=m(H,"SPAN",{style:!0});var z=f(v);y=E(z,P),z.forEach(d),H.forEach(d),B=V(h),b=m(h,"P",{});var R=f(b);J=E(R,I),R.forEach(d),N=V(h),g=m(h,"A",{href:!0});var U=f(g);Q=E(U,S),U.forEach(d),h.forEach(d),a.forEach(d),this.h()},h(){W(i.src,_=r[0].pic_src)||l(i,"src",_),j(i,"width","(292/2)px"),j(i,"height","(341/2)px"),l(i,"alt",D=r[0].name),j(v,"color","rgb(82,71,71)"),l(o,"class","card-title"),l(g,"href",k="mailto:"+r[0].mail_adress),l(u,"class","card-body"),l(t,"class","card lg:card-side bg-base-100 shadow-x1 svelte-1icqvjr")},m(e,a){X(e,t,a),s(t,p),s(p,i),s(t,w),s(t,u),s(u,o),s(o,L),s(o,A),s(o,v),s(v,y),s(u,B),s(u,b),s(b,J),s(u,N),s(u,g),s(g,Q),n=!0},p(e,[a]){(!n||a&1&&!W(i.src,_=e[0].pic_src))&&l(i,"src",_),(!n||a&1&&D!==(D=e[0].name))&&l(i,"alt",D),(!n||a&1)&&q!==(q=e[0].name+"")&&C(L,q),(!n||a&1)&&P!==(P=e[0].title+"")&&C(y,P),(!n||a&1)&&I!==(I=e[0].description+"")&&C(J,I),(!n||a&1)&&S!==(S=e[0].mail_adress+"")&&C(Q,S),(!n||a&1&&k!==(k="mailto:"+e[0].mail_adress))&&l(g,"href",k)},i(e){n||(Y(()=>{M&&M.end(1),F=$(t,te,{y:75,duration:1e3}),F.start()}),n=!0)},o(e){F&&F.invalidate(),M=ee(t,se,{}),n=!1},d(e){e&&d(t),e&&M&&M.end()}}}function ae(r,t,p){let{args:i}=t;return r.$$set=_=>{"args"in _&&p(0,i=_.args)},[i]}class Pe extends Z{constructor(t){super(),K(this,t,ae,ie,T,{args:0})}}const ne={name:"Sofie Degerman",title:"Principal Investigator",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ex at sem feugiat consectetur. In eget diam in tortor tempus tempor. In pellentesque risus eget est egestas, nec suscipit magna tempor. Morbi fermentum turpis non consequat iaculis. Quisque dignissim eget elit at vestibulum. Suspendisse fringilla interdum risus a luctus.",pic_src:"./pic/Sofie_Degerman_croped.JPG",mail_adress:"sofie.degerman@umu.se",status:{active:!0}},re={name:"Pia Osterman",title:"Research engineer",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ex at sem feugiat consectetur. In eget diam in tortor tempus tempor. In pellentesque risus eget est egestas, nec suscipit magna tempor. Morbi fermentum turpis non consequat iaculis. Quisque dignissim eget elit at vestibulum. Suspendisse fringilla interdum risus a luctus.",pic_src:"./pic/Pia_Osterman_croped.JPG",mail_adress:"pia.osterman@umu.se",status:{active:!0}},ue={name:"Nina Guerini",title:"Student",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ex at sem feugiat consectetur. In eget diam in tortor tempus tempor. In pellentesque risus eget est egestas, nec suscipit magna tempor. Morbi fermentum turpis non consequat iaculis. Quisque dignissim eget elit at vestibulum. Suspendisse fringilla interdum risus a luctus.",pic_src:"./pic/Nina_Guerini_croped.JPG",mail_adress:"nina.guerini@umu.se",status:{active:!0}},le={name:"Mattias Landfors",title:"Bioinformatican",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ex at sem feugiat consectetur. In eget diam in tortor tempus tempor. In pellentesque risus eget est egestas, nec suscipit magna tempor. Morbi fermentum turpis non consequat iaculis. Quisque dignissim eget elit at vestibulum. Suspendisse fringilla interdum risus a luctus.",pic_src:"./pic/Mattias_Landfors_croped.JPG",mail_adress:"mattias.landfors@umu.se",status:{active:!0}},oe={name:"Magnus Hultdin",title:"Senior consultant physican",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ex at sem feugiat consectetur. In eget diam in tortor tempus tempor. In pellentesque risus eget est egestas, nec suscipit magna tempor. Morbi fermentum turpis non consequat iaculis. Quisque dignissim eget elit at vestibulum. Suspendisse fringilla interdum risus a luctus.",pic_src:"./pic/Magnus_Hultdin_croped.JPG",mail_adress:"magnus.hultdin@umu.se",status:{active:!0}},ce={name:"Fernanda Hackenhaar",title:"Post Doc",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ex at sem feugiat consectetur. In eget diam in tortor tempus tempor. In pellentesque risus eget est egestas, nec suscipit magna tempor. Morbi fermentum turpis non consequat iaculis. Quisque dignissim eget elit at vestibulum. Suspendisse fringilla interdum risus a luctus.",pic_src:"./pic/Fernanda_Hackenhaar_croped.JPG",mail_adress:null,status:{active:!0}},me={name:"Olivia Carlund",title:"PhD student",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et ex at sem feugiat consectetur. In eget diam in tortor tempus tempor. In pellentesque risus eget est egestas, nec suscipit magna tempor. Morbi fermentum turpis non consequat iaculis. Quisque dignissim eget elit at vestibulum. Suspendisse fringilla interdum risus a luctus.",pic_src:"./pic/Olivia_Carlund_croped.JPG",mail_adress:"olivia.carlund@umu.se",status:{active:!0}},de={name:"Zahra Hander",title:"Former PhD student",description:null,pic_src:null,mail_adress:null,status:{active:!1,period:null}},pe={name:"Magnus Borsen",title:"Former PhD student",description:null,pic_src:null,mail_adress:null,status:{active:!1,period:null}},_e={name:"Emma Andersson Everlynn",title:"Former PhD student",description:null,pic_src:null,mail_adress:null,status:{active:!1,period:null}},ge={name:"Signid Wennstedt",title:"Medreal prgran",description:null,pic_src:null,mail_adress:null,status:{active:!1,period:"2015-2021"}},fe={name:"Ida Andersson",title:"Bronderat",description:null,pic_src:null,mail_adress:null,status:{active:!1,period:"2015-2022"}},ve={name:"Nina Guenvi",title:"Bronderat",description:null,pic_src:null,mail_adress:null,status:{active:!1,period:"2015-2022"}};var be={sofie_degerman:ne,pia_osterman:re,nina_guerini:ue,mattias_landfors:le,magnus_hultdin:oe,fernanda_hackenhaar:ce,olivia_carlund:me,zahra_haider:de,mangnus_borsen:pe,emma_andersson_everlynn:_e,sigrid_wennstedth:ge,ida_andersson:fe,nina_guenvi:ve};export{Pe as C,be as m};
