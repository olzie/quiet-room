window.pano3=function(){
var vb=document.getElementById('scene').getAttribute('viewBox').split(/\s+/).map(Number),SE=-vb[1];
var seed=4242;
function f(n){return n.toFixed(1)}
function rnd(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646}
function j(a){return (rnd()-.5)*2*a}
function ln(x1,y1,x2,y2,r,p){r=r==null?1.1:r;p=p||2;var s='';for(var k=0;k<p;k++){var mx=(x1+x2)/2+j(r*1.4),my=(y1+y2)/2+j(r*1.4);s+='M'+f(x1+j(r))+' '+f(y1+j(r))+'Q'+f(mx)+' '+f(my)+' '+f(x2+j(r))+' '+f(y2+j(r))}return s}
function pl(pts,closed,r,p){var s='';for(var i=0;i<pts.length-1;i++)s+=ln(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],r,p);if(closed)s+=ln(pts[pts.length-1][0],pts[pts.length-1][1],pts[0][0],pts[0][1],r,p);return s}
function el(cx,cy,rx,ry,r,p,n){r=r==null?.8:r;p=p||2;n=n||28;var s='';for(var k=0;k<p;k++){var a0=rnd()*6.283,t=1.04+rnd()*.07;for(var i=0;i<=n;i++){var a=a0+t*6.283*i/n;s+=(i?'L':'M')+f(cx+Math.cos(a)*(rx+j(r)))+' '+f(cy+Math.sin(a)*(ry+j(r)))}}return s}
function eF(cx,cy,rx,ry){var s='';for(var i=0;i<30;i++){var a=6.283*i/30;s+=(i?'L':'M')+f(cx+Math.cos(a)*rx)+' '+f(cy+Math.sin(a)*ry)}return s+'Z'}
function arcF(cx,cy,rx,ry,a0,a1){var s='';for(var i=0;i<=20;i++){var a=a0+(a1-a0)*i/20;s+=(i?'L':'M')+f(cx+Math.cos(a)*rx)+' '+f(cy+Math.sin(a)*ry)}return s}
function K(d,w,cls,ex){return '<path class="'+(cls||'k')+'" d="'+d+'" stroke-width="'+(w||1.3)+'" '+(ex||'')+'/>'}
function SK(d,w,cls){w=w||1.3;return K(d,w,cls)+K(d,w*.6,cls,'transform="translate(.9 .7)" opacity=".45"')}
function F(d,fill,ex){return '<path d="'+d+'" fill="'+fill+'" stroke="none" '+(ex||'')+'/>'}
function R(x,y,w,h){return 'M'+x+' '+y+'h'+w+'v'+h+'h'+(-w)+'Z'}
function topL(x){var s=(83+SE)/738;return (14-SE)-(125-x)*s}
var VX=862.6,VY=97;/* точка схода игры */
function toVP(x0,y0,y){return VX+(x0-VX)*(y-VY)/(y0-VY)}
var night=document.documentElement.dataset.theme==='night';
var cs=getComputedStyle(document.documentElement);
function hex(c){c=c.trim();return [1,3,5].map(function(i){return parseInt(c.substr(i,2),16)})}
var Wc=hex(cs.getPropertyValue('--wall')),CEIL=night?'#16122a':'rgb('+hex('#16122a').map(function(v,i){return Math.round(v*.28+Wc[i]*.72)}).join(',')+')';
var TB=14-SE,s='',g='';

/* ---------- рамка: две с половиной ширины экрана; правая стена — зеркало левой стены игры ---------- */
var RC=890,W=990;
function ceilR(x){return topL(125-(x-RC))}
function floorR(x){return 392+50*(x-RC)/125}
function baseR(x){return 386+50*(x-RC)/125}
function wpR(x,fr){var yb=floorR(x),yt=ceilR(x);return [x,yb-fr*(yb-yt)]}
function Pp(pts){return 'M'+pts.map(function(q){return f(q[0])+' '+f(q[1])}).join('L')+'Z'}
s+=F('M398 '+(-SE-2)+'H'+W+'V561H398Z','var(--wall)');
s+=F('M398 '+(-SE-2)+'H'+W+'V'+f(ceilR(W))+'L'+RC+' '+TB+'H398Z',CEIL);
s+=F('M'+RC+' '+TB+'L'+W+' '+f(ceilR(W))+'L'+W+' '+f(floorR(W))+'L'+RC+' 392Z','var(--wall-l)');
s+=F('M398 392L'+RC+' 392L'+W+' '+f(floorR(W))+'L'+W+' 561L398 561Z','var(--floor)');
var D0=724,D1=804,DT=150;
if(night)s+='<path d="M'+(D0+2)+' 392 L'+(D1-2)+' 392 L'+(D1+70)+' 486 L'+(D0-70)+' 486 Z" fill="url(#pdoor)"/>';
var RT=600,RB=toVP(RT,410,516);
s+=F('M398 410L'+RT+' 410L'+f(RB)+' 516L398 516Z','var(--rug)');
s+=F(eF(790,480,112,30),'var(--rug)');
var planks=ln(397,528,W,531,1.2)+ln(520,528,toVP(520,528,560),560)+ln(700,528,toVP(700,528,560),560)+ln(880,528,toVP(880,528,560),560);
g+=SK(ln(397,TB,RC,TB)+ln(RC,TB,W,ceilR(W))+ln(RC,TB,RC,392,.8)+ln(397,392,RC,392)+ln(RC,392,W,floorR(W))+planks,1.3);
g+=K(ln(397,386,RC,386,.6,1)+ln(RC,386,W,baseR(W),.6,1),.8,'k','opacity=".6"');
g+=K(ln(397,410,RT,410,.6,1)+ln(RT,410,RB,516)+ln(397,516,RB,516),1.1);
g+=SK(el(790,480,112,30,.9),1.1)+K(el(790,480,96,23,.6,1),.7,'k','opacity=".5"');
/* ---------- кровать целиком: справа одеяло и плед мягко свисают через край, как слева ---------- */
var BX=472,bed='';
bed+=F('M255 268 L'+BX+' 268 L'+BX+' 345 L255 345 Z','var(--headboard)');
bed+=SK(pl([[255,345],[255,268],[BX,268],[BX,345]],false)+ln(255,300,BX,300,.7)+ln(330,268,330,300,.7)+ln(412,268,412,300,.7),1.2);
var P1='M268 290 Q300 282 340 286 Q348 300 344 322 Q306 328 270 326 Q262 306 268 290Z',P2='M352 284 Q400 279 446 284 Q452 302 447 321 Q400 326 352 322 Q346 302 352 284Z',P3='M300 318 Q318 300 330 296 Q360 306 396 312 Q380 330 370 342 Q332 336 300 318Z';
bed+=F(P1,'var(--pillow)')+F(P2,'var(--pillow)')+F(P3,'#6b6392');
bed+=SK(P1,1.1)+SK(P2,1.1)+SK(P3,1.2)+K('M310 316 Q340 312 368 330 M282 300 Q310 296 334 300 M372 300 Q400 296 432 302',.7,'k','opacity=".5"');
var DV='M252 344 Q320 338 400 336 Q440 334 '+(BX-4)+' 336 Q'+(BX+14)+' 372 '+(BX+26)+' 430 Q'+(BX+36)+' 470 '+(BX+24)+' 488 Q470 496 440 492 Q420 490 400 488 Q330 474 262 482 Q200 490 138 488 Q150 476 176 468 Q214 448 230 420 Q226 390 238 356 Q242 346 252 344 Z';
bed+=F(DV,'var(--blanket)')+SK(DV,1.4);
bed+=SK('M250 362 Q300 354 360 358 M262 400 Q270 440 250 470 M296 386 Q308 424 296 462 M190 472 Q220 462 242 476 M232 430 Q246 444 238 462 M'+(BX-2)+' 352 Q'+(BX+10)+' 392 '+(BX+18)+' 472 M'+(BX+16)+' 410 Q'+(BX+28)+' 450 '+(BX+30)+' 478',.9);
var TE=BX+18,TY=452;
var TH='M300 352 Q350 346 400 348 Q440 346 '+(BX-2)+' 348 Q'+(BX+10)+' 384 '+TE+' '+TY+' Q440 442 400 432 Q370 422 342 416 Q326 384 300 352Z';
bed+=F(TH,'var(--blanket2)')+SK(TH,1.2)+K('M'+(BX-2)+' 352 Q'+(BX+6)+' 392 '+(BX+10)+' 446',.8,'k','opacity=".55"');
var dd='';for(var x=342;x<=TE;x+=3.5){var y=x<400?416+(x-342)*16/58:432+(x-400)*(TY-432)/(TE-400);dd+=ln(x,y,x+1+j(1.5),y+14+j(4),.4,1)}bed+=K(dd,.8);

function catBed(cx,cy,sc){var o='',rx=48*sc,ry=17*sc;
  o+=F(eF(cx,cy+5*sc,rx+3,ry+4),'#000','opacity=".18"');
  o+=F(eF(cx,cy,rx,ry),'var(--pet-rim)');
  o+=F(eF(cx,cy-2*sc,rx*.7,ry*.55),'var(--pet-cush)');
  o+=F(arcF(cx,cy,rx,ry,0,3.1416)+'L'+f(cx-rx)+' '+f(cy+7*sc)+arcF(cx,cy+7*sc,rx,ry,3.1416,0).replace('M','L')+'Z','var(--pet-rim)','opacity=".85"');
  o+=SK(el(cx,cy,rx,ry,.6,1)+arcF(cx,cy+7*sc,rx,ry,0,3.1416),1.2)+K(el(cx,cy-2*sc,rx*.7,ry*.55,.5,1),.9,'k','opacity=".7"');
  o+=K(arcF(cx,cy-1,rx*.86,ry*.78,3.5,5.9),.8,'k','opacity=".45"');
  /* стёжки и лапка на бортике */
  var px=cx+rx*.55,py=cy+ry*.62;o+='<g opacity=".9"><ellipse cx="'+f(px)+'" cy="'+f(py+1.5)+'" rx="'+f(3.2*sc)+'" ry="'+f(2.4*sc)+'" fill="var(--pet-cush)"/>'+[[-3.6,-2.2],[-1.2,-3.6],[1.4,-3.6],[3.6,-2.2]].map(function(q){return '<circle cx="'+f(px+q[0]*sc)+'" cy="'+f(py+q[1]*sc)+'" r="'+f(1.15*sc)+'" fill="var(--pet-cush)"/>'}).join('')+'</g>';
  return o}
function bowls(cx,cy){return '<g transform="translate('+cx+' '+cy+') scale(1.3) translate('+(-cx)+' '+(-cy)+')">'+bowls0(cx,cy)+'</g>'}
function bowls0(cx,cy){var o='';
  o+=F('M'+(cx-38)+' '+(cy+2)+' Q'+(cx-40)+' '+(cy-8)+' '+(cx-30)+' '+(cy-9)+' L'+(cx+30)+' '+(cy-9)+' Q'+(cx+40)+' '+(cy-8)+' '+(cx+38)+' '+(cy+2)+'Z','var(--pet-cush)','opacity=".75"');
  o+=SK('M'+(cx-38)+' '+(cy+2)+' Q'+(cx-40)+' '+(cy-8)+' '+(cx-30)+' '+(cy-9)+' L'+(cx+30)+' '+(cy-9)+' Q'+(cx+40)+' '+(cy-8)+' '+(cx+38)+' '+(cy+2)+'Z',1);
  [[cx-17,'var(--bowl1)',1],[cx+17,'var(--bowl2)',0]].forEach(function(b){var x=b[0],y=cy-4;
    o+=F('M'+(x-13)+' '+(y-9)+' L'+(x+13)+' '+(y-9)+' L'+(x+10)+' '+(y+2)+' Q'+x+' '+(y+5)+' '+(x-10)+' '+(y+2)+'Z',b[1]);
    o+=F(eF(x,y-9,13,3.6),b[2]?'var(--kib)':'var(--water)');
    if(b[2])o+=[[-6,-10],[-2,-11],[3,-10],[7,-9],[0,-8.5],[-4,-8.4],[5,-11.2]].map(function(q){return '<circle cx="'+f(x+q[0])+'" cy="'+f(y+q[1])+'" r="1.6" fill="var(--kib2)"/>'}).join('');
    else o+='<path d="M'+(x-6)+' '+(y-10)+' q4 -1.6 9 0" stroke="#fff" stroke-width="1.1" fill="none" opacity=".75" stroke-linecap="round"/>';
    o+=SK('M'+(x-13)+' '+(y-9)+' L'+(x-10)+' '+(y+2)+' Q'+x+' '+(y+5)+' '+(x+10)+' '+(y+2)+' L'+(x+13)+' '+(y-9),1.1)+K(el(x,y-9,13,3.6,.3,1),1);
    /* рыбка на миске с едой, капля на миске с водой */
    if(b[2])o+='<path d="M'+(x-5)+' '+(y-3)+' q4 -3.5 8 0 q-4 3.5 -8 0 M'+(x+3)+' '+(y-3)+' l3 -2.4 v4.8z" fill="#fff" opacity=".85"/>';
    else o+='<path d="M'+x+' '+(y-6.5)+' q3 4 0 6 q-3 -2 0 -6z" fill="#fff" opacity=".85"/>'});
  return o}
function yarn(cx,cy,r){var o=F(eF(cx,cy+r*.85,r*1.1,r*.28),'#000','opacity=".16"')+F(eF(cx,cy,r,r),'var(--yarn)');
  o+=SK(el(cx,cy,r,r,.4,1),1.1)+K('M'+(cx-r*.9)+' '+(cy-r*.3)+' Q'+cx+' '+(cy-r*1.1)+' '+(cx+r*.8)+' '+(cy+r*.5)+' M'+(cx-r*.6)+' '+(cy+r*.75)+' Q'+(cx-r*.1)+' '+(cy-r*.3)+' '+(cx+r*.55)+' '+(cy-r*.8)+' M'+(cx-r*.95)+' '+(cy+r*.2)+' Q'+(cx+r*.1)+' '+(cy+r*.05)+' '+(cx+r*.9)+' '+(cy-r*.15),.8,'k','opacity=".7"');
  o+=K('M'+(cx+r*.9)+' '+(cy+r*.3)+' q'+r*1.2+' '+r*.9+' '+r*2.1+' '+r*.2+' t'+r*1.6+' '+r*.4,1,'k','style="stroke:var(--yarn)"');return o}
function mouse(cx,cy){var o=F(eF(cx,cy+4,10,2.4),'#000','opacity=".15"')+F('M'+(cx-9)+' '+(cy+3)+' Q'+(cx-8)+' '+(cy-7)+' '+(cx+2)+' '+(cy-6)+' Q'+(cx+9)+' '+(cy-4)+' '+(cx+11)+' '+(cy+2)+' Z','var(--mouse)');
  o+=SK('M'+(cx-9)+' '+(cy+3)+' Q'+(cx-8)+' '+(cy-7)+' '+(cx+2)+' '+(cy-6)+' Q'+(cx+9)+' '+(cy-4)+' '+(cx+11)+' '+(cy+2)+' Z',1);
  o+='<circle cx="'+(cx+4)+'" cy="'+(cy-6)+'" r="3" fill="var(--blossom)"/><circle cx="'+(cx+7)+'" cy="'+(cy-1)+'" r=".9" fill="var(--ink)"/>';
  o+=K('M'+(cx-9)+' '+(cy+2)+' q-8 -2 -10 -8 q-1 -4 3 -5',1);return o}
function frame(x,y,w,h,inner){return F(R(x,y,w,h),'#7d6249')+F(R(x+2.5,y+2.5,w-5,h-5),night?'#4c4565':'#efe7da')+(inner||'')+SK(pl([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],true,.4,1),1)}
function garland(x0,x1,y,sag){var GP=[];for(var i=0;i<=11;i++){var t=i/11;GP.push([x0+(x1-x0)*t,y+Math.sin(t*3.1416)*sag])}
  var o=K('M'+GP.map(function(q){return f(q[0])+' '+f(q[1])}).join('L'),.9,'k','opacity=".7"');
  GP.slice(1,-1).forEach(function(q){if(night)o+='<circle cx="'+f(q[0])+'" cy="'+f(q[1]+5)+'" r="9" fill="url(#pbulb)"/>';o+=F(eF(q[0],q[1]+5,2.6,3.2),night?'#f6e3a1':'var(--pillow)')+K(el(q[0],q[1]+5,2.6,3.2,.2,1),.7)});return o}
function plant(x,base,sc){var o=F('M'+(x-13*sc)+' '+(base-30*sc)+' L'+(x+13*sc)+' '+(base-30*sc)+' L'+(x+9*sc)+' '+base+' L'+(x-9*sc)+' '+base+'Z','var(--table)')+SK(pl([[x-13*sc,base-30*sc],[x+13*sc,base-30*sc],[x+9*sc,base],[x-9*sc,base]],true,.4,1),1.1);
  [[-16,-58],[10,-70],[-4,-84],[18,-46],[-22,-38],[4,-54]].forEach(function(l){var x0=x,y0=base-30*sc,x1=x0+l[0]*sc,y1=y0+l[1]*sc,q='M'+f(x0)+' '+f(y0)+' Q'+f((x0+x1)/2-7*sc)+' '+f((y0+y1)/2)+' '+f(x1)+' '+f(y1)+' Q'+f((x0+x1)/2+7*sc)+' '+f((y0+y1)/2)+' '+f(x0)+' '+f(y0);o+=F(q+'Z','var(--leaf)','opacity=".88"')+K(q,.8)});return o}
var wall='',front='';
wall+=garland(512,RC-16,TB+46,26);
/* ---------- столик: лампа на столе слева, книги справа, стул задвинут ---------- */
var DX=526;
wall+='<g transform="translate('+DX+' 0)">';
wall+=F(eF(70,204,26,26),'var(--wall-l)')+F(eF(70,204,21,21),night?'#0c1530':'var(--sky1)');
if(night)wall+='<circle cx="77" cy="196" r="5" fill="var(--moon)" opacity=".85"/>';
wall+=SK(el(70,204,26,26,.5),1.3)+K(el(70,204,21,21,.4,1),.8,'k','opacity=".6"')+K('M56 200 L67 190 M60 213 L74 198',.8,'k','opacity=".4"');
wall+=F('M0 300H128V308H0Z','var(--table)')+SK(pl([[0,300],[128,300],[128,308],[0,308]],true,.4,1),1.2);
wall+=SK(ln(6,308,6,392,.4)+ln(122,308,122,392,.4),1.1);
/* настольная лампа: основание, стойка, локоть, абажур колпаком вниз */
wall+=F(eF(18,299,9,2.4),'var(--ink-soft)','opacity=".6"')+SK('M18 298 L18 268 L32 254',1.2)+'<circle cx="18" cy="268" r="1.6" fill="var(--ink)"/>';
wall+=F('M27 252 L39 250 L46 264 L24 268 Z','var(--lamp)','opacity=".6"')+SK('M27 252 L39 250 L46 264 L24 268 Z',1.1);
[['#8fa8d6',96,294,26],['#c9a3c8',98,288,22],['#a6c7b0',95,282,24]].forEach(function(b){wall+=F('M'+b[1]+' '+b[2]+'h'+b[3]+'v6h-'+b[3]+'Z',b[0],'opacity=".85"')+K(pl([[b[1],b[2]],[b[1]+b[3],b[2]],[b[1]+b[3],b[2]+6],[b[1],b[2]+6]],true,.3,1),.9)});
wall+=F('M48 284 Q48 278 54 278 L84 278 Q90 278 90 284 L90 326 L48 326Z','var(--table)')+SK('M48 326 L48 284 Q48 278 54 278 L84 278 Q90 278 90 284 L90 326',1.2);
wall+=K(ln(54,294,84,294,.3,1)+ln(54,308,84,308,.3,1),.8,'k','opacity=".6"');
wall+=F('M44 326H94V334H44Z','var(--table)')+SK(pl([[44,326],[94,326],[94,334],[44,334]],true,.3,1),1.1)+SK(ln(48,334,46,400,.4)+ln(90,334,92,400,.4),1.1);
wall+='</g>';
/* ---------- полка-вешалка у двери ---------- */
wall+='<g transform="translate(592 4)">'+K(ln(78,168,108,168,.4),1.3)+'<circle cx="84" cy="170" r="1.8" fill="var(--ink)"/><circle cx="102" cy="170" r="1.8" fill="var(--ink)"/>';
wall+=F('M80 170 Q76 208 82 248 L90 248 Q86 210 88 170Z','var(--blossom)','opacity=".85"')+K('M80 170 Q76 208 82 248 L90 248 Q86 210 88 170',1)+K('M82 248 l-1 6 M85 248 l0 6 M88 248 l1 6',.8);
wall+=F('M94 194 L112 194 L115 224 L91 224Z','var(--table)')+SK(pl([[94,194],[112,194],[115,224],[91,224]],true,.4,1),1)+K('M97 194 Q102 176 109 194',1)+'</g>';
/* ---------- дверь ---------- */
wall+=F(Pp([[D0,DT],[D1,DT],[D1,392],[D0,392]]),'var(--headboard)');
wall+=SK(pl([[D0-4,392],[D0-4,DT-4],[D1+4,DT-4],[D1+4,392]],false,.6)+pl([[D0,392],[D0,DT],[D1,DT],[D1,392]],false,.5),1.3);
wall+=K(pl([[D0+10,DT+14],[D1-10,DT+14],[D1-10,DT+104],[D0+10,DT+104]],true,.4,1)+pl([[D0+10,DT+120],[D1-10,DT+120],[D1-10,382],[D0+10,382]],true,.4,1),.9,'k','opacity=".7"');
wall+='<circle cx="'+(D1-9)+'" cy="276" r="3.4" fill="var(--lamp)"/>'+K(el(D1-9,276,3.4,3.4,.3,1),.9);
if(night)wall+=K(ln(D0+2,391,D1-2,391,.2,1),1.8,'k','style="stroke:#f6d9a8"');
wall+=plant(850,392,1.0);
/* ---------- шкаф на правой стене; вещи сверху стоят ровно по его крышке ---------- */
var x1=RC+10,x2=RC+96,FR=.86,A=wpR(x1,0),B=wpR(x1,FR),C=wpR(x2,FR),Dd=wpR(x2,0),xm=(x1+x2)/2,M1=wpR(xm,0),M2=wpR(xm,FR);
wall+=F(Pp([A,B,C,Dd]),'var(--headboard)')+SK(pl([A,B,C,Dd],true,.5),1.4)+SK(ln(M1[0],M1[1],M2[0],M2[1],.4),1.1);

/* встроенный шкаф: доходит почти до потолка, сверху ниша-карниз, снизу цоколь, ничего не стоит сверху */
var T1=wpR(x1,1),T2=wpR(x2,1);wall+=F(Pp([B,T1,T2,C]),'var(--wall-l)')+K(pl([B,C],false,.3,1),1)+K(pl([wpR(x1,.92),wpR(x2,.92)],false,.3,1),.8,'k','opacity=".5"');
var Z1=wpR(x1,.035),Z2=wpR(x2,.035);wall+=K(pl([Z1,Z2],false,.3,1),.9,'k','opacity=".7"');
var h1=wpR(xm-4,.62),h2=wpR(xm-4,.30),h3=wpR(xm+4,.62),h4=wpR(xm+4,.30);
wall+=SK(ln(h1[0],h1[1],h2[0],h2[1],.3,1)+ln(h3[0],h3[1],h4[0],h4[1],.3,1),1.6);
/* ---------- вещи Пирожка ---------- */
front+=bowls(668,420)+catBed(830,492,1.05)+yarn(752,496,9)+mouse(690,508);
s+='<defs><radialGradient id="pbulb"><stop offset="0" stop-color="#f6e3a1" stop-opacity=".9"/><stop offset="1" stop-color="#f6e3a1" stop-opacity="0"/></radialGradient><radialGradient id="pdoor" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#f6d9a8" stop-opacity=".5"/><stop offset="1" stop-color="#f6d9a8" stop-opacity="0"/></radialGradient></defs>';
return s+'<g filter="url(#pencil)">'+g+wall+'</g><g filter="url(#pencil)">'+bed+'</g><g id="catAgain"></g><g filter="url(#pencil)">'+front+'</g>';
};
