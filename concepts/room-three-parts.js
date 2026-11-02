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

var W=1201,RC=1080;/* правый угол комнаты: правее точки схода, поэтому стена честно уходит в перспективу */
function ceilR(x){return VY+(TB-VY)*(x-VX)/(RC-VX)}
function floorR(x){return VY+(392-VY)*(x-VX)/(RC-VX)}
function lineR(y0,x){return VY+(y0-VY)*(x-VX)/(RC-VX)}
function wpR(x,fr){var yb=floorR(x),yt=ceilR(x);return [x,yb-fr*(yb-yt)]}
function Pp(pts){return 'M'+pts.map(function(q){return f(q[0])+' '+f(q[1])}).join('L')+'Z'}
/* ---------- стены, потолок, пол ---------- */
s+=F('M398 '+(-SE-2)+'H'+W+'V561H398Z','var(--wall)');
s+=F('M398 '+(-SE-2)+'H'+W+'V'+f(ceilR(W))+'L'+RC+' '+TB+'H398Z',CEIL);
s+=F('M'+RC+' '+TB+'L'+W+' '+f(ceilR(W))+'L'+W+' '+f(floorR(W))+'L'+RC+' 392Z','var(--wall-l)');
s+=F('M398 392L'+RC+' 392L'+W+' '+f(floorR(W))+'L'+W+' 561L398 561Z','var(--floor)');
/* свет из-под двери */
var D0=846,D1=914,DT=150;
if(night)s+='<path d="M'+(D0+2)+' 392 L'+(D1-2)+' 392 L'+(D1+74)+' 488 L'+(D0-74)+' 488 Z" fill="url(#pdoor)"/>';
/* ковёр из первой части и круглый коврик у двери */
var RT=600,RB=toVP(RT,410,516);
s+=F('M398 410L'+RT+' 410L'+f(RB)+' 516L398 516Z','var(--rug)');
s+=F(eF(900,478,124,31),'var(--rug)');
/* каркас */
var xP=toVP(1000,528,560),planks=ln(397,528,1181,531,1.2)+ln(520,528,toVP(520,528,560),560)+ln(700,528,toVP(700,528,560),560)+ln(1000,528,xP,560)+ln(1120,528,toVP(1120,528,560),560);
g+=SK(ln(397,TB,RC,TB)+ln(RC,TB,W,ceilR(W))+ln(RC,TB,RC,392,.8)+ln(397,392,RC,392)+ln(RC,392,W,floorR(W))+planks,1.3);
g+=K(ln(397,386,RC,386,.6,1)+ln(RC,386,W,lineR(386,W),.6,1),.8,'k','opacity=".6"');
g+=K(ln(397,410,RT,410,.6,1)+ln(RT,410,RB,516)+ln(397,516,RB,516),1.1);
g+=SK(el(900,478,124,31,.9),1.1)+K(el(900,478,108,24,.6,1),.7,'k','opacity=".5"');
/* ---------- кровать целиком (поверх старой), чтобы на стыке не было шва ---------- */
var BX=472,bed='';
bed+=F('M255 268 L'+BX+' 268 L'+BX+' 345 L255 345 Z','var(--headboard)');
bed+=SK(pl([[255,345],[255,268],[BX,268],[BX,345]],false)+ln(255,300,BX,300,.7)+ln(330,268,330,300,.7)+ln(412,268,412,300,.7),1.2);
var P1='M268 290 Q300 282 340 286 Q348 300 344 322 Q306 328 270 326 Q262 306 268 290Z',P2='M352 284 Q400 279 446 284 Q452 302 447 321 Q400 326 352 322 Q346 302 352 284Z',P3='M300 318 Q318 300 330 296 Q360 306 396 312 Q380 330 370 342 Q332 336 300 318Z';
bed+=F(P1,'var(--pillow)')+F(P2,'var(--pillow)')+F(P3,'#6b6392');
bed+=SK(P1,1.1)+SK(P2,1.1)+SK(P3,1.2)+K('M310 316 Q340 312 368 330 M282 300 Q310 296 334 300',.7,'k','opacity=".5"');
var DV='M252 344 Q320 338 400 336 Q440 334 '+(BX-2)+' 336 Q'+(BX+6)+' 400 '+(BX+3)+' 486 Q440 494 400 488 Q330 474 262 482 Q200 490 138 488 Q150 476 176 468 Q214 448 230 420 Q226 390 238 356 Q242 346 252 344 Z';
bed+=F(DV,'var(--blanket)')+SK(DV,1.4);
bed+=SK('M250 362 Q300 354 360 358 M262 400 Q270 440 250 470 M296 386 Q308 424 296 462 M190 472 Q220 462 242 476 M232 430 Q246 444 238 462 M418 360 Q440 356 460 360 M452 400 Q458 440 450 474',.9);
var TH='M300 352 Q350 346 400 348 Q440 346 '+BX+' 348 Q'+(BX+3)+' 400 '+(BX+1)+' 452 Q436 440 400 432 Q370 422 342 416 Q326 384 300 352Z';
bed+=F(TH,'var(--blanket2)')+SK(TH,1.2);
var dd='';for(var x=342;x<=BX-2;x+=3.5){var y=x<400?416+(x-342)*16/58:432+(x-400)*20/(BX-400);dd+=ln(x,y,x+1+j(1.5),y+14+j(4),.4,1)}bed+=K(dd,.8);
/* ---------- кошачьи вещи: понятные с первого взгляда ---------- */
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
/* ---------- гирлянда над всей второй стеной ---------- */
wall+=garland(500,1060,TB+46,30);
/* ---------- столик с зеркалом (как во второй половине), чуть правее кровати ---------- */
var DX=516;
wall+='<g transform="translate('+DX+' 0)">';
wall+=F(eF(46,206,28,28),'var(--wall-l)')+F(eF(46,206,23,23),night?'#0c1530':'var(--sky1)');
if(night)wall+='<circle cx="54" cy="197" r="5.5" fill="var(--moon)" opacity=".85"/>';
wall+=SK(el(46,206,28,28,.5),1.3)+K(el(46,206,23,23,.4,1),.8,'k','opacity=".6"')+K('M31 202 L43 191 M35 215 L50 199',.8,'k','opacity=".4"');
wall+=F('M4 300H98V308H4Z','var(--table)')+SK(pl([[4,300],[98,300],[98,308],[4,308]],true,.4,1),1.2);
wall+=SK(ln(10,308,10,392,.4)+ln(92,308,92,392,.4)+ln(14,308,14,384,.3,1),1.1);
wall+=SK('M18 300 L30 300 M24 300 L24 272 L36 258',1.2)+F('M30 248 L48 254 L42 268 L26 260Z','var(--lamp)','opacity=".4"')+SK(pl([[30,248],[48,254],[42,268],[26,260]],true,.3,1),1.1);
[['#8fa8d6',62,294,24],['#c9a3c8',64,288,20],['#a6c7b0',61,282,22]].forEach(function(b){wall+=F('M'+b[1]+' '+b[2]+'h'+b[3]+'v6h-'+b[3]+'Z',b[0],'opacity=".85"')+K(pl([[b[1],b[2]],[b[1]+b[3],b[2]],[b[1]+b[3],b[2]+6],[b[1],b[2]+6]],true,.3,1),.9)});
wall+=F('M42 286h10v14h-10Z','var(--pillow)')+K(pl([[42,286],[52,286],[52,300],[42,300]],true,.3,1),1)+K('M52 290 q5 0 5 4 q0 4 -5 4',1);
wall+=F('M38 284 Q38 278 44 278 L78 278 Q84 278 84 284 L84 326 L38 326Z','var(--table)')+SK('M38 326 L38 284 Q38 278 44 278 L78 278 Q84 278 84 284 L84 326',1.2);
wall+=K(ln(44,294,78,294,.3,1)+ln(44,308,78,308,.3,1),.8,'k','opacity=".6"');
wall+=F('M34 326H88V334H34Z','var(--table)')+SK(pl([[34,326],[88,326],[88,334],[34,334]],true,.3,1),1.1)+SK(ln(38,334,36,400,.4)+ln(84,334,86,400,.4),1.1);
wall+='</g>';
/* ---------- крючки с шарфом и сумкой ---------- */
wall+='<g transform="translate(652 4)">'+K(ln(78,168,108,168,.4),1.3)+'<circle cx="84" cy="170" r="1.8" fill="var(--ink)"/><circle cx="102" cy="170" r="1.8" fill="var(--ink)"/>';
wall+=F('M80 170 Q76 208 82 248 L90 248 Q86 210 88 170Z','var(--blossom)','opacity=".85"')+K('M80 170 Q76 208 82 248 L90 248 Q86 210 88 170',1)+K('M82 248 l-1 6 M85 248 l0 6 M88 248 l1 6',.8);
wall+=F('M94 194 L112 194 L115 224 L91 224Z','var(--table)')+SK(pl([[94,194],[112,194],[115,224],[91,224]],true,.4,1),1)+K('M97 194 Q102 176 109 194',1)+'</g>';
/* ---------- дверь ---------- */
wall+=F(Pp([[D0,DT],[D1,DT],[D1,392],[D0,392]]),'var(--headboard)');
wall+=SK(pl([[D0-6,392],[D0-6,DT-6],[D1+6,DT-6],[D1+6,392]],false,.6)+pl([[D0,392],[D0,DT],[D1,DT],[D1,392]],false,.5),1.3);
wall+=K(pl([[D0+10,DT+14],[D1-10,DT+14],[D1-10,DT+104],[D0+10,DT+104]],true,.4,1)+pl([[D0+10,DT+120],[D1-10,DT+120],[D1-10,382],[D0+10,382]],true,.4,1),.9,'k','opacity=".7"');
wall+='<circle cx="'+(D1-9)+'" cy="276" r="3.4" fill="var(--lamp)"/>'+K(el(D1-9,276,3.4,3.4,.3,1),.9);
if(night)wall+=K(ln(D0+2,391,D1-2,391,.2,1),1.8,'k','style="stroke:#f6d9a8"');
/* ---------- высокое растение между дверью и углом ---------- */
wall+=plant(984,392,1.05);
/* ---------- шкаф на правой стене, в перспективе ---------- */
var A=wpR(1096,0),B=wpR(1096,.74),C=wpR(1168,.74),Dd=wpR(1168,0),M1=wpR(1132,0),M2=wpR(1132,.74);
wall+=F(Pp([A,B,C,Dd]),'var(--headboard)')+SK(pl([A,B,C,Dd],true,.5),1.4)+SK(ln(M1[0],M1[1],M2[0],M2[1],.4),1.1);
var k1=wpR(1126,.38),k2=wpR(1138,.38);wall+='<circle cx="'+f(k1[0])+'" cy="'+f(k1[1])+'" r="2.4" fill="var(--lamp)"/><circle cx="'+f(k2[0])+'" cy="'+f(k2[1])+'" r="2.4" fill="var(--lamp)"/>';
var b1=wpR(1102,.75),b2=wpR(1130,.75);wall+=F(Pp([b1,[b1[0],b1[1]-24],[b2[0],b2[1]-30],b2]),'var(--table)')+SK(pl([b1,[b1[0],b1[1]-24],[b2[0],b2[1]-30],b2],true,.4,1),1);
var b3=wpR(1136,.75),b4=wpR(1162,.75);wall+=F('M'+f(b3[0])+' '+f(b3[1])+' Q'+f((b3[0]+b4[0])/2)+' '+f(Math.min(b3[1],b4[1])-20)+' '+f(b4[0])+' '+f(b4[1])+'Z','var(--blanket2)')+K('M'+f(b3[0])+' '+f(b3[1])+' Q'+f((b3[0]+b4[0])/2)+' '+f(Math.min(b3[1],b4[1])-20)+' '+f(b4[0])+' '+f(b4[1]),1);
/* ---------- вещи Пирожка (вариант В): миски у стены, лежанка, клубок, мышка ---------- */
front+=bowls(752,420)+catBed(1034,490,1.08)+yarn(950,494,9)+mouse(846,506);
s+='<defs><radialGradient id="pbulb"><stop offset="0" stop-color="#f6e3a1" stop-opacity=".9"/><stop offset="1" stop-color="#f6e3a1" stop-opacity="0"/></radialGradient><radialGradient id="pdoor" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#f6d9a8" stop-opacity=".5"/><stop offset="1" stop-color="#f6d9a8" stop-opacity="0"/></radialGradient></defs>';
return s+'<g filter="url(#pencil)">'+g+wall+'</g><g filter="url(#pencil)">'+bed+'</g><g id="catAgain"></g><g filter="url(#pencil)">'+front+'</g>';

};
