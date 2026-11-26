function lb(s){document.getElementById('lbi').src=s;document.getElementById('lb').classList.add('on')}
document.querySelectorAll('.tabs button').forEach(function(b){b.onclick=function(){document.querySelectorAll('.tabs button,.panel').forEach(function(x){x.classList.remove('on')});b.classList.add('on');document.getElementById(b.dataset.t).classList.add('on')}});
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(x){io.observe(x)});
var $=function(i){return document.getElementById(i)};
function calc(){var p=+$('price').value||0,d=+$('dp').value,r=+$('rt').value,y=+$('tr').value;
$('dpv').textContent=d;$('rtv').textContent=r;$('trv').textContent=y;
var L=p*(1-d/100),i=r/1200,n=y*12,m=i?L*i/(1-Math.pow(1+i,-n)):L/n,tot=m*n,int=tot-L;
$('mo').textContent='฿'+Math.round(m).toLocaleString();
$('b1').style.width=(tot?L/tot*100:0)+'%';$('b2').style.width=(tot?int/tot*100:0)+'%';
$('sum').textContent='Loan ฿'+Math.round(L).toLocaleString()+' · total interest ฿'+Math.round(int).toLocaleString()}
['price','dp','rt','tr'].forEach(function(i){$(i).oninput=calc});calc();
var L=[['Novara Living (our homes)','Home',500,330,'#c9a96e','10510 Min Buri Rd.'],
['Minburi MRT Station','Transport',420,300,'#e07aa8','MRT Pink Line'],['Talad Minburi MRT Station','Transport',640,250,'#e07aa8','MRT Pink Line'],['Minburi Transport Station','Transport',360,420,'#e07aa8','Bus, van and songthaew'],
['Minburi School','Schools',300,230,'#c9a96e','School'],['Setthabutr Bamphen School','Schools',690,400,'#c9a96e','School'],['Kasembandit University Romklao','Schools',830,300,'#c9a96e','University'],
['Nawamin 9 Hospital','Hospitals',250,360,'#e0705f','Hospital'],['Sinphaet Serirak Hospital','Hospitals',580,470,'#e0705f','Hospital'],
['Minburi Market','Shopping',470,210,'#e9a04a','Market'],
['Chalerm Phrakiat Minburi Park','Parks and temples',760,500,'#8fb36b','Park and rally point'],['Wat Bamphen Nuea','Parks and temples',200,500,'#8fb36b','Temple'],['Wat Sansuk','Parks and temples',900,430,'#8fb36b','Temple'],['Minburi District Office','Parks and temples',560,140,'#8fb36b','Rally point']];
var S=1,TX=0,TY=0,sv=$('msv'),mg=$('mg'),NS='http://www.w3.org/2000/svg',cur=-1,mk=[];
function E(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);(p||mg).appendChild(e);return e}
var R=$('mroads');
[['M-200 420 C200 380 700 300 1200 190','Ramkhamhaeng Rd',40,433],['M-100 140 L1200 560','Seri Thai Rd',900,515],['M320 -200 C380 200 440 500 520 900','Rom Klao Rd',360,-10]].forEach(function(r){E('path',{d:r[0],fill:'none',stroke:'#6b5a3f','stroke-width':16,'stroke-linecap':'round'},R);E('path',{d:r[0],fill:'none',stroke:'#8c7a5b','stroke-width':2,'stroke-dasharray':'10 10'},R);var t=E('text',{x:r[2],y:r[3],fill:'#cdbfa8','font-size':12,'letter-spacing':2},R);t.textContent=r[1].toUpperCase()});
E('path',{d:'M-100 300 C300 320 700 340 1100 330',fill:'none',stroke:'#e07aa8','stroke-width':5,'stroke-dasharray':'2 9','stroke-linecap':'round'},R);
L.forEach(function(l,i){var g=E('g',{style:'cursor:pointer'},$('mmk'));E('circle',{r:l[1]=='Home'?20:14,fill:l[4],stroke:'#261c12','stroke-width':3,opacity:.95},g);var t=E('text',{y:5,'text-anchor':'middle','font-size':l[1]=='Home'?16:12},g);t.textContent=l[1]=='Home'?'🏡':'📍';var lb=E('text',{y:-24,'text-anchor':'middle',fill:'#f3ece0','font-size':13,'font-weight':600,'paint-order':'stroke',stroke:'#261c12','stroke-width':4},g);lb.textContent=l[0].replace(' (our homes)','');g.onclick=function(){if(!mv)msel(i)};mk.push(g)});
var mb=$('mml'),cat='';L.forEach(function(l,i){if(l[1]!=cat){cat=l[1];var h=document.createElement('h4');h.textContent=cat;mb.appendChild(h)}var b=document.createElement('button');b.innerHTML='<i style="background:'+l[4]+'"></i>'+l[0];b.onclick=function(){msel(i)};b.id='mb'+i;mb.appendChild(b)});
function mupd(){mg.setAttribute('transform','translate('+TX+' '+TY+') scale('+S+')');mk.forEach(function(g,i){g.setAttribute('transform','translate('+L[i][2]+' '+L[i][3]+') scale('+(1/S)+')')});R.querySelectorAll('text').forEach(function(t){t.setAttribute('font-size',12)})}
function mpt(e){var p=sv.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(sv.getScreenCTM().inverse())}
function mzp(f,p){var n=Math.max(.6,Math.min(5,S*f));f=n/S;TX=p.x-(p.x-TX)*f;TY=p.y-(p.y-TY)*f;S=n;mupd()}
function mz(f){mzp(f,{x:500,y:320})}
function mfly(i){var s=i==null?1:2.4,tx=i==null?0:500-L[i][2]*s,ty=i==null?0:320-L[i][3]*s,a=[S,TX,TY],t0=performance.now();(function st(t){var k=Math.min(1,(t-t0)/550);k=1-Math.pow(1-k,3);S=a[0]+(s-a[0])*k;TX=a[1]+(tx-a[1])*k;TY=a[2]+(ty-a[2])*k;mupd();if(k<1)requestAnimationFrame(st)})(t0)}
function msel(i){cur=i;mk.forEach(function(g,j){g.style.filter=j==i?'drop-shadow(0 0 8px #f3ece0)':''});document.querySelectorAll('.mml button').forEach(function(b){b.classList.remove('on')});$('mb'+i).classList.add('on');$('mpn').textContent=L[i][0].replace(' (our homes)','');$('mpt').textContent=L[i][5]+' · Min Buri, Bangkok';$('mpl').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(L[i][0].replace(' (our homes)','')+' Min Buri Bangkok');$('mmp').classList.add('on');mfly(i)}
var ptr={},mv=0,d0=0;
sv.addEventListener('pointerdown',function(e){ptr[e.pointerId]=e;mv=0;d0=0});
window.addEventListener('pointermove',function(e){if(!ptr[e.pointerId])return;var ks=Object.keys(ptr),o=ptr[e.pointerId];if(ks.length==1){var c=sv.getScreenCTM().a;TX+=(e.clientX-o.clientX)/c;TY+=(e.clientY-o.clientY)/c;if(Math.abs(e.clientX-o.clientX)+Math.abs(e.clientY-o.clientY)>0)mv=mv||0;mv+=Math.abs(e.clientX-o.clientX)+Math.abs(e.clientY-o.clientY);if(mv<4)mv=mv;mupd()}else if(ks.length==2){var a=ptr[ks[0]],b=ptr[ks[1]];if(e.pointerId==ks[0])a=e;else b=e;var d=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);if(d0)mzp(d/d0,mpt({clientX:(a.clientX+b.clientX)/2,clientY:(a.clientY+b.clientY)/2}));d0=d;mv=9}ptr[e.pointerId]=e});
window.addEventListener('pointerup',function(e){delete ptr[e.pointerId];d0=0;setTimeout(function(){mv=0},0)});window.addEventListener('pointercancel',function(e){delete ptr[e.pointerId]});
sv.addEventListener('wheel',function(e){e.preventDefault();mzp(e.deltaY<0?1.15:1/1.15,mpt(e))},{passive:false});
function mm(o){$('mm').classList.toggle('on',!!o);if(o){mupd();if(cur<0)msel(0)}}
document.addEventListener('keydown',function(e){if(e.key=='Escape')mm(0)});mupd();
