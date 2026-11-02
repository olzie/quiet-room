(function(){
var vb=document.getElementById('scene').getAttribute('viewBox').split(/\s+/).map(Number),SE=-vb[1];
var seed=77;
function f(n){return n.toFixed(1)}
function rnd(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646}
function j(a){return (rnd()-.5)*2*a}
function ln(x1,y1,x2,y2,r,p){r=r==null?1.1:r;p=p||2;var s='';for(var k=0;k<p;k++){var mx=(x1+x2)/2+j(r*1.4),my=(y1+y2)/2+j(r*1.4);s+='M'+f(x1+j(r))+' '+f(y1+j(r))+'Q'+f(mx)+' '+f(my)+' '+f(x2+j(r))+' '+f(y2+j(r))}return s}
function pl(pts,closed,r,p){var s='';for(var i=0;i<pts.length-1;i++)s+=ln(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],r,p);if(closed)s+=ln(pts[pts.length-1][0],pts[pts.length-1][1],pts[0][0],pts[0][1],r,p);return s}
function el(cx,cy,rx,ry,r,p,n){r=r==null?.8:r;p=p||2;n=n||28;var s='';for(var k=0;k<p;k++){var a0=rnd()*6.283,t=1.04+rnd()*.07;for(var i=0;i<=n;i++){var a=a0+t*6.283*i/n;s+=(i?'L':'M')+f(cx+Math.cos(a)*(rx+j(r)))+' '+f(cy+Math.sin(a)*(ry+j(r)))}}return s}
function elFill(cx,cy,rx,ry){var s='';for(var i=0;i<24;i++){var a=6.283*i/24;s+=(i?'L':'M')+f(cx+Math.cos(a)*rx)+' '+f(cy+Math.sin(a)*ry)}return s+'Z'}
function K(d,w,cls,extra){return '<path class="'+(cls||'k')+'" d="'+d+'" stroke-width="'+(w||1.3)+'" '+(extra||'')+'/>'}
function SK(d,w,cls){w=w||1.3;return K(d,w,cls)+K(d,w*.6,cls,'transform="translate(.9 .7)" opacity=".45"')}
function F(d,fill,extra){return '<path d="'+d+'" fill="'+fill+'" stroke="none" '+(extra||'')+'/>'}
function topL(x){var s=(83+SE)/738;return (14-SE)-(125-x)*s}
function VPt(){var y0=topL(0),k=((14-SE)-y0)/125,x=(442-y0)/(k+.4);return [x,y0+k*x]}
function wy(X,y,x){var v=VPt();return v[1]+(y-v[1])*(v[0]-x)/(v[0]-X)}
/* правая стена — зеркало левой стены игры */
function wyR(X,y,x){return wy(400-X,y,400-x)}
function P(pts){return 'M'+pts.map(function(q){return f(q[0])+' '+f(q[1])}).join('L')+'Z'}
var night=document.documentElement.dataset.theme==='night';
var cs=getComputedStyle(document.documentElement);
function hex(c){c=c.trim();return [1,3,5].map(function(i){return parseInt(c.substr(i,2),16)})}
var W=hex(cs.getPropertyValue('--wall')),CEIL=night?'#16122a':'rgb('+hex('#16122a').map(function(v,i){return Math.round(v*.28+W[i]*.72)}).join(',')+')';
var TB=14-SE,s='';
s+=F('M0 '+(-SE-2)+'H400V560H0Z','var(--wall)');
s+=F('M0 '+(-SE-2)+' H400 V'+f(topL(0))+' L275 '+TB+' L0 '+TB+' Z',CEIL);
s+=F('M400 '+f(topL(0))+' L275 '+TB+' L275 392 L400 442 Z','var(--wall-l)');
s+=F('M400 442 L275 392 L0 392 L0 560 L400 560Z','var(--floor)');
/* свет из-под двери на полу */
var D0=104,D1=164,DT=152;
if(night)s+='<path d="M'+(D0+2)+' 392 L'+(D1-2)+' 392 L'+(D1+70)+' 486 L'+(D0-70)+' 486 Z" fill="url(#doorLight2)"/>';
/* круглый коврик */
s+=F(elFill(170,474,128,34),'var(--rug)');
var g='';
/* каркас комнаты */
var d=ln(400,topL(0),275,TB)+ln(275,TB,0,TB)+ln(275,TB,275,392,.8)+ln(275,392,0,392)+ln(400,442,275,392);
d+=ln(0,530,400,528,1.2)+ln(250,528,303,560)+ln(70,528,110,560);
g+=SK(d,1.3)+K(ln(275,386,0,386,.6,1)+ln(275,386,400,wyR(275,386,400),.6,1),.8,'k','opacity=".6"');
g+=SK(el(170,474,128,34,.9),1.1)+K(el(170,474,112,27,.6,1),.7,'k','opacity=".5"');
/* дверь */
g+=F(P([[D0,DT],[D1,DT],[D1,392],[D0,392]]),'var(--headboard)');
g+=SK(pl([[D0-6,392],[D0-6,DT-6],[D1+6,DT-6],[D1+6,392]],false,.6)+pl([[D0,392],[D0,DT],[D1,DT],[D1,392]],false,.5),1.3);
g+=K(pl([[D0+10,DT+14],[D1-10,DT+14],[D1-10,DT+104],[D0+10,DT+104]],true,.4,1)+pl([[D0+10,DT+120],[D1-10,DT+120],[D1-10,382],[D0+10,382]],true,.4,1),.9,'k','opacity=".7"');
g+='<circle cx="'+(D1-9)+'" cy="276" r="3.4" fill="var(--lamp)"/>'+K(el(D1-9,276,3.4,3.4,.3,1),.9);
if(night)g+=K(ln(D0+2,391,D1-2,391,.2,1),1.8,'k','style="stroke:#f6d9a8"');
/* крючки, шарф и сумка */
g+='<g transform="translate(160 4)">';g+=K(ln(78,168,108,168,.4),1.3)+'<circle cx="84" cy="170" r="1.8" fill="var(--ink)"/><circle cx="102" cy="170" r="1.8" fill="var(--ink)"/>';
g+=F('M80 170 Q76 208 82 248 L90 248 Q86 210 88 170Z','var(--blossom)','opacity=".85"')+K('M80 170 Q76 208 82 248 L90 248 Q86 210 88 170',1);
g+=K('M82 248 l-1 6 M85 248 l0 6 M88 248 l1 6',.8);
g+=F('M94 194 L112 194 L115 224 L91 224Z','var(--table)')+SK(pl([[94,194],[112,194],[115,224],[91,224]],true,.4,1),1)+K('M97 194 Q102 176 109 194',1);g+='</g>';
/* зеркало над столом */
g+='<g transform="translate(-5 0)">';
g+=F(elFill(46,206,28,28),'var(--wall-l)')+F(elFill(46,206,23,23),night?'#0c1530':'var(--sky1)');
g+='<circle cx="54" cy="197" r="5.5" fill="var(--moon)" opacity="'+(night?.85:.0)+'"/>';
g+=SK(el(46,206,28,28,.5),1.3)+K(el(46,206,23,23,.4,1),.8,'k','opacity=".6"')+K('M31 202 L43 191 M35 215 L50 199',.8,'k','opacity=".4"');
/* стол */
g+=F('M4 300H98V308H4Z','var(--table)')+SK(pl([[4,300],[98,300],[98,308],[4,308]],true,.4,1),1.2);
g+=SK(ln(10,308,10,392,.4)+ln(92,308,92,392,.4)+ln(14,308,14,384,.3,1),1.1);
/* настольная лампа (днём и ночью не горит — горит большая) */
g+=SK('M18 300 L30 300 M24 300 L24 272 L36 258',1.2)+F('M30 248 L48 254 L42 268 L26 260Z','var(--lamp)','opacity=".35"')+SK(pl([[30,248],[48,254],[42,268],[26,260]],true,.3,1),1.1);
[['#8fa8d6',62,294,24],['#c9a3c8',64,288,20],['#a6c7b0',61,282,22]].forEach(function(b){g+=F('M'+b[1]+' '+b[2]+'h'+b[3]+'v6h-'+b[3]+'Z',b[0],'opacity=".8"')+K(pl([[b[1],b[2]],[b[1]+b[3],b[2]],[b[1]+b[3],b[2]+6],[b[1],b[2]+6]],true,.3,1),.9)});
g+=F('M42 286h10v14h-10Z','var(--pillow)')+K(pl([[42,286],[52,286],[52,300],[42,300]],true,.3,1),1)+K('M52 290 q5 0 5 4 q0 4 -5 4',1);
/* стул задвинут под стол: видна спинка */
g+=F('M38 284 Q38 278 44 278 L78 278 Q84 278 84 284 L84 326 L38 326Z','var(--table)')+SK('M38 326 L38 284 Q38 278 44 278 L78 278 Q84 278 84 284 L84 326',1.2);
g+=K(ln(44,294,78,294,.3,1)+ln(44,308,78,308,.3,1),.8,'k','opacity=".6"');
g+=F('M34 326H88V334H34Z','var(--table)')+SK(pl([[34,326],[88,326],[88,334],[34,334]],true,.3,1),1.1);
g+=SK(ln(38,334,36,400,.4)+ln(84,334,86,400,.4),1.1);g+='</g>';
/* растение у двери */
g+=F('M237 362 L263 362 L259 392 L241 392Z','var(--table)')+SK(pl([[237,362],[263,362],[259,392],[241,392]],true,.4,1),1.1);
[[-16,-58],[10,-70],[-4,-84],[18,-46],[-22,-38],[4,-54]].forEach(function(l){var x0=250,y0=362,x1=x0+l[0],y1=y0+l[1],q='M'+x0+' '+y0+' Q'+f((x0+x1)/2-7)+' '+f((y0+y1)/2)+' '+x1+' '+y1+' Q'+f((x0+x1)/2+7)+' '+f((y0+y1)/2)+' '+x0+' '+y0;g+=F(q+'Z','#7f9c86','opacity=".85"')+K(q,.8)});
/* гирлянда над дверью */
var GP=[];for(var i=0;i<=12;i++){var t=i/12;GP.push([12+t*252,TB+46+Math.sin(t*3.1416)*24])}
g+=K('M'+GP.map(function(q){return f(q[0])+' '+f(q[1])}).join('L'),.9,'k','opacity=".7"');
GP.slice(1,-1).forEach(function(q){if(night)g+='<circle cx="'+f(q[0])+'" cy="'+f(q[1]+5)+'" r="9" fill="url(#bulbG2)"/>';g+=F(elFill(q[0],q[1]+5,2.6,3.2),night?'#f6e3a1':'var(--pillow)')+K(el(q[0],q[1]+5,2.6,3.2,.2,1),.7)});
/* шкаф на правой стене (той же, где окно), ближе к углу */
function wp(x,fr){var yb=wyR(275,392,x),yt=wyR(275,TB,x);return [x,yb-fr*(yb-yt)]}
var A=wp(290,0),B=wp(290,.8),C=wp(352,.8),Dd=wp(352,0),M1=wp(321,0),M2=wp(321,.8);
g+=F(P([A,B,C,Dd]),'var(--headboard)')+SK(pl([A,B,C,Dd],true,.5),1.4)+SK(ln(M1[0],M1[1],M2[0],M2[1],.4),1.1);
var k1=wp(316,.4),k2=wp(326,.4);g+='<circle cx="'+f(k1[0])+'" cy="'+f(k1[1])+'" r="2.2" fill="var(--lamp)"/><circle cx="'+f(k2[0])+'" cy="'+f(k2[1])+'" r="2.2" fill="var(--lamp)"/>';
var b1=wp(296,.81),b2=wp(322,.81);g+=F(P([b1,[b1[0],b1[1]-20],[b2[0],b2[1]-22],b2]),'var(--table)')+SK(pl([b1,[b1[0],b1[1]-20],[b2[0],b2[1]-22],b2],true,.4,1),1);
var b3=wp(328,.81),b4=wp(350,.81);g+=F('M'+f(b3[0])+' '+f(b3[1])+' Q'+f((b3[0]+b4[0])/2)+' '+f(b3[1]-16)+' '+f(b4[0])+' '+f(b4[1])+'Z','var(--blanket2)')+K('M'+f(b3[0])+' '+f(b3[1])+' Q'+f((b3[0]+b4[0])/2)+' '+f(b3[1]-16)+' '+f(b4[0])+' '+f(b4[1]),1);
/* краешек шторы у самого края — это та же штора, что в первой половине */
var cx0=386,ctop=wyR(275,TB,cx0)+18,cbot=wyR(275,392,cx0)+30;
g+=F(P([[cx0,ctop],[400,ctop+4],[400,cbot+6],[cx0,cbot]]),'var(--curtain)');
for(var c=0;c<3;c++){var xx=cx0+3+c*5;g+=K(ln(xx,ctop+2,xx,cbot-2,.5,1),.8)}
g+=SK(ln(cx0-6,ctop-4,400,ctop,.4),1.2);
/* лежанка Пирожка с мышкой */
g+=F(elFill(314,486,44,15),'var(--blanket)')+F(elFill(314,482,32,9),'var(--blanket2)')+SK(el(314,486,44,15,.6),1.2)+K(el(314,482,32,9,.5,1),.8,'k','opacity=".6"');
g+=F(elFill(344,500,6,3.4),'var(--ink-soft)')+K('M350 500 q6 2 8 -2',.8)+'<circle cx="339" cy="499" r="1.4" fill="var(--blossom)"/>';
/* миска у двери, стоит на полу */
g+=F(elFill(196,412,13,3),'#000','opacity=".18"')+F('M183 408 Q196 417 209 408 L206 401 L186 401Z','var(--lamp)','opacity=".65"')+SK('M183 408 Q196 417 209 408 L206 401 L186 401Z',1)+K('M190 402 q6 -4 12 0',.8,'k','opacity=".6"');
/* тапочки */
g+=F(elFill(96,500,12,5.5),'var(--pillow)')+F(elFill(118,507,12,5.5),'var(--pillow)')+K(el(96,500,12,5.5,.4,1)+el(118,507,12,5.5,.4,1),1)+K('M89 498 q7 -4 14 0 M111 505 q7 -4 14 0',.8,'k','opacity=".6"');
/* лампа под потолком — та же, что видна из постели */
var lit=night;
var lamp='<circle cx="205" cy="185" r="9" fill="var(--lamp)" opacity="'+(lit?.9:0)+'"/>'+SK(ln(205,-SE-2,205,157,.5,1)+el(205,182,24,25)+el(205,182,14,25,.5,1)+el(205,182,6,25,.4,1)+el(205,184,10,10,.5,1)+ln(201,157,209,157,.4),1.2);
s+='<defs><radialGradient id="doorLight2" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#f6d9a8" stop-opacity=".5"/><stop offset="1" stop-color="#f6d9a8" stop-opacity="0"/></radialGradient><radialGradient id="bulbG2"><stop offset="0" stop-color="#f6e3a1" stop-opacity=".9"/><stop offset="1" stop-color="#f6e3a1" stop-opacity="0"/></radialGradient><radialGradient id="lglow2"><stop offset="0" stop-color="#f0b46a" stop-opacity=".42"/><stop offset=".5" stop-color="#f0b46a" stop-opacity=".12"/><stop offset="1" stop-color="#f0b46a" stop-opacity="0"/></radialGradient></defs>';
if(lit)s+='<circle cx="205" cy="185" r="190" fill="url(#lglow2)"/>';
s+='<g filter="url(#pencil)">'+g+'</g>'+lamp.replace(/^(<circle[^>]*>)/,'$1<g filter="url(#pencil)">')+'</g>';
var sv=document.getElementById('scene'),defs=sv.querySelector('defs').outerHTML;
sv.innerHTML=defs+'<g clip-path="url(#frame)">'+s+'</g>';
})();
