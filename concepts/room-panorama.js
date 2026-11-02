/* Вторая половина комнаты как продолжение первой: та же перспектива, кровать дорисована, без швов.
   Возвращает разметку для x 400..800 (в координатах сцены игры). */
window.pano=function(V){
var vb=document.getElementById('scene').getAttribute('viewBox').split(/\s+/).map(Number),SE=-vb[1];
var seed=100+V*17;
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
/* ---------- стены, пол, ковёр — продолжение без швов ---------- */
s+=F('M398 '+(-SE-2)+'H801V561H398Z','var(--wall)');
s+=F('M398 '+(-SE-2)+'H801V'+TB+'H398Z',CEIL);
s+=F('M398 392H801V561H398Z','var(--floor)');
var RT=600,RB=toVP(RT,410,516);
s+=F('M398 410L'+RT+' 410L'+f(RB)+' 516L398 516Z','var(--rug)');
g+=SK(ln(360,TB,801,TB)+ln(360,392,801,392)+ln(360,529,801,531,1.2)+ln(520,528,toVP(520,528,560),560)+ln(700,528,toVP(700,528,560),560),1.3);
g+=K(ln(360,386,801,386,.6,1),.8,'k','opacity=".6"');
g+=K(ln(360,410,RT,410,.6,1)+ln(RT,410,RB,516)+ln(360,516,RB,516),1.1);
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
var front='';
if(V===0){
  /* ===== А. Кошачий уголок: домик-когтеточка, полка, портрет Пирожка ===== */
  g+=garland(486,790,TB+44,22);
  /* когтеточка с домиком */
  var cx=548;g+=F(R(506,376,88,16),'var(--pet-rim)')+SK(pl([[506,376],[594,376],[594,392],[506,392]],true,.4,1),1.1);
  g+=F(R(cx-7,232,14,144),'#c9b08a')+SK(ln(cx-7,232,cx-7,376,.4)+ln(cx+7,232,cx+7,376,.4),1.1);
  var rope='';for(var y=238;y<374;y+=6)rope+=ln(cx-7,y,cx+7,y+3,.3,1);g+=K(rope,.6,'k','opacity=".55"');
  g+=F(R(512,296,72,9),'var(--pet-rim)')+SK(pl([[512,296],[584,296],[584,305],[512,305]],true,.4,1),1.1);
  /* домик наверху с круглым входом */
  g+=F('M514 232 L582 232 L582 186 L548 164 L514 186Z','var(--pet-rim)')+SK(pl([[514,232],[582,232],[582,186],[548,164],[514,186]],true,.5,1),1.2);
  g+=F(eF(548,208,13,14),'#1b1630','opacity="'+(night?.9:.55)+'"')+K(el(548,208,13,14,.4,1),1);
  /* помпон на верёвочке */
  g+=K(ln(578,305,578,338,.3,1),.8)+F(eF(578,344,6,6),'var(--yarn)')+K(el(578,344,6,6,.3,1),.9);
  /* полка с книгами и цветком */
  g+=F(R(626,226,128,6),'var(--table)')+SK(pl([[626,226],[754,226],[754,232],[626,232]],true,.3,1),1.1)+K(ln(636,232,642,244,.3,1)+ln(744,232,738,244,.3,1),1);
  [['#8fa8d6',640,10,30],['#c9a3c8',651,9,26],['#a6c7b0',661,11,32],['#e3c08f',673,8,24]].forEach(function(b){g+=F(R(b[1],226-b[3],b[2],b[3]),b[0],'opacity=".85"')+K(pl([[b[1],226],[b[1],226-b[3]],[b[1]+b[2],226-b[3]],[b[1]+b[2],226]],false,.3,1),.9)});
  g+=plant(728,226,.42);
  /* портрет Пирожка */
  g+=frame(652,262,46,56,'<g transform="translate(663 270) scale(.5)"><path d="M20 66 Q6 64 8 46 Q10 30 22 26 L18 10 L28 20 L40 20 L50 10 L48 26 Q60 32 60 48 Q60 64 46 66Z" fill="#c9875c"/><circle cx="27" cy="40" r="2.2" fill="#4a2c1c"/><circle cx="41" cy="40" r="2.2" fill="#4a2c1c"/><path d="M31 47 q3 3 6 0" stroke="#4a2c1c" fill="none" stroke-width="1.4"/></g>');
  front+=bowls(728,412);
  front+=catBed(620,452,1.05)+yarn(500,470,9)+mouse(560,506);
}else if(V===1){
  /* ===== Б. Читальный уголок: кресло, торшер, низкий стеллаж ===== */
  /* торшер-дуга */
  if(night)s+='<circle cx="640" cy="236" r="120" fill="url(#plamp)"/>';
  g+=K('M690 392 L690 210 Q690 176 662 176 Q644 176 640 196',1.4)+F(R(678,386,24,6),'var(--table)');
  g+=F('M624 196 L656 196 L650 222 L630 222Z','var(--lamp)','opacity="'+(night?.85:.45)+'"')+SK(pl([[624,196],[656,196],[650,222],[630,222]],true,.3,1),1.1);
  /* кресло */
  g+=F('M508 300 Q508 262 540 262 L596 262 Q628 262 628 300 L628 350 L508 350Z','var(--blanket2)')+SK('M508 350 L508 300 Q508 262 540 262 L596 262 Q628 262 628 300 L628 350',1.3);
  g+=F('M496 322 Q496 306 512 306 Q526 306 526 322 L526 384 L496 384Z','var(--blanket)')+F('M610 322 Q610 306 624 306 Q640 306 640 322 L640 384 L610 384Z','var(--blanket)');
  g+=SK('M496 384 L496 322 Q496 306 512 306 Q526 306 526 322 L526 384 M610 384 L610 322 Q610 306 624 306 Q640 306 640 322 L640 384',1.2);
  g+=F('M524 344 L612 344 L612 368 L524 368Z','var(--pillow)')+SK(pl([[524,344],[612,344],[612,368],[524,368]],true,.4,1),1.1)+F(R(498,384,140,8),'var(--table)')+SK(ln(504,392,504,398,.3,1)+ln(632,392,632,398,.3,1)+ln(498,384,638,384,.4),1.1);
  /* вязаный плед на спинке */
  g+=F('M546 262 L590 262 L594 318 L548 322Z','var(--rug)')+SK(pl([[546,262],[590,262],[594,318],[548,322]],true,.4,1),1);var kn='';for(var y=270;y<318;y+=7)kn+=ln(548,y,592,y-1,.4,1);g+=K(kn,.6,'k','opacity=".5"');
  /* подушка-кот на кресле */
  g+=F(eF(568,336,16,11),'var(--pet-cush)')+SK(el(568,336,16,11,.4,1),1)+F('M556 328 l3 -9 l5 6z M574 325 l5 -6 l3 9z','var(--pet-cush)')+'<circle cx="563" cy="335" r="1.3" fill="var(--ink)"/><circle cx="573" cy="335" r="1.3" fill="var(--ink)"/>';
  /* стеллаж с книгами */
  g+=F(R(708,300,86,92),'var(--table)')+SK(pl([[708,300],[794,300],[794,392],[708,392]],true,.4,1)+ln(708,346,794,346,.4),1.2);
  var bx=714;[['#8fa8d6',9,36],['#c9a3c8',8,32],['#a6c7b0',11,38],['#e3c08f',7,30],['#8fa8d6',9,34]].forEach(function(b){g+=F(R(bx,344-b[2],b[1],b[2]),b[0],'opacity=".85"')+K(pl([[bx,344],[bx,344-b[2]],[bx+b[1],344-b[2]],[bx+b[1],344]],false,.3,1),.8);bx+=b[1]+2});
  g+=F(R(716,368,34,22),'var(--pet-rim)','opacity=".8"')+K(pl([[716,368],[750,368],[750,390],[716,390]],true,.3,1),.9)+F(eF(774,384,9,6),'var(--yarn)')+K(el(774,384,9,6,.3,1),.9);
  g+=plant(748,300,.5);
  /* круглые часы на стене */
  g+=F(eF(560,200,20,20),'var(--pillow)')+SK(el(560,200,20,20,.4),1.2)+K('M560 200 L560 188 M560 200 L569 205',1.2);
  front+=bowls(748,420);
  front+=catBed(596,468,1.1)+mouse(506,512)+yarn(676,486,8);
}else{
  /* ===== В. Столик и зеркало: письменный стол, гирлянда, высокое растение ===== */
  g+=garland(486,790,TB+46,26);
  g+=F(eF(600,214,30,30),'var(--wall-l)')+F(eF(600,214,25,25),night?'#0c1530':'var(--sky1)');
  if(night)g+='<circle cx="609" cy="204" r="5.5" fill="var(--moon)" opacity=".85"/>';
  g+=SK(el(600,214,30,30,.5),1.3)+K(el(600,214,25,25,.4,1),.8,'k','opacity=".6"')+K('M584 210 L596 199 M588 223 L604 207',.8,'k','opacity=".4"');
  g+=F(R(536,300,132,8),'var(--table)')+SK(pl([[536,300],[668,300],[668,308],[536,308]],true,.4,1),1.2)+SK(ln(542,308,542,392,.4)+ln(662,308,662,392,.4),1.1);
  g+=F(R(626,308,36,26),'var(--table)')+SK(pl([[626,308],[662,308],[662,334],[626,334]],true,.4,1),1)+K(ln(638,321,650,321,.2,1),1.2);
  g+=SK('M550 300 L562 300 M556 300 L556 272 L568 258',1.2)+F('M562 248 L580 254 L574 268 L558 260Z','var(--lamp)','opacity=".5"')+SK(pl([[562,248],[580,254],[574,268],[558,260]],true,.3,1),1.1);
  [['#8fa8d6',612,294,26],['#c9a3c8',614,288,22],['#a6c7b0',611,282,24]].forEach(function(b){g+=F(R(b[1],b[2],b[3],6),b[0],'opacity=".85"')+K(pl([[b[1],b[2]],[b[1]+b[3],b[2]],[b[1]+b[3],b[2]+6],[b[1],b[2]+6]],true,.3,1),.9)});
  g+=F(R(588,286,10,14),'var(--pillow)')+K(pl([[588,286],[598,286],[598,300],[588,300]],true,.3,1),1)+K('M598 290 q5 0 5 4 q0 4 -5 4',1);
  g+=F('M570 284 Q570 278 576 278 L610 278 Q616 278 616 284 L616 326 L570 326Z','var(--table)')+SK('M570 326 L570 284 Q570 278 576 278 L610 278 Q616 278 616 284 L616 326',1.2)+F(R(566,326,54,8),'var(--table)')+SK(pl([[566,326],[620,326],[620,334],[566,334]],true,.3,1),1.1)+SK(ln(570,334,568,400,.4)+ln(616,334,618,400,.4),1.1);
  g+=plant(752,392,1.05);
  front+=bowls(708,420)+catBed(556,470,1.05)+yarn(648,486,9)+mouse(724,510);
}
s+='<defs><radialGradient id="pbulb"><stop offset="0" stop-color="#f6e3a1" stop-opacity=".9"/><stop offset="1" stop-color="#f6e3a1" stop-opacity="0"/></radialGradient><radialGradient id="plamp"><stop offset="0" stop-color="#f0b46a" stop-opacity=".38"/><stop offset=".5" stop-color="#f0b46a" stop-opacity=".1"/><stop offset="1" stop-color="#f0b46a" stop-opacity="0"/></radialGradient></defs>';
return s+'<g filter="url(#pencil)">'+g+'</g><g filter="url(#pencil)">'+bed+'</g><g id="catAgain"></g><g filter="url(#pencil)">'+front+'</g>';
};
