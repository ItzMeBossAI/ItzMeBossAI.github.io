(function(){
var box=document.getElementById('v3');if(!box)return;
function fail(){box.innerHTML='<div class="v3f"><p>The 3D view needs WebGL, which your browser did not provide.</p><button class="btn" data-src="'+box.dataset.plan+'" onclick="lb(this.dataset.src)">View 2D plan</button></div>'}
if(typeof THREE==='undefined'||!THREE.OrbitControls){fail();return}
var W=12,D=20,OX=-6,OZ=-10,H=2.8,FY=.14;
var R=[
{n:'Living room',w:7,d:4,x:0,z:12.6,c:0xb89f7c,open:'n',glass:'s',i:'Open to the central hall, with floor-to-ceiling glass facing south for soft morning light.'},
{n:'Office',w:3.5,d:3,x:0,z:9.6,c:0x8c7a5b,i:'A quiet corner for working from home.'},
{n:'Bathroom',w:2.5,d:2.6,x:0,z:7,c:0xb7c0c0,i:'Shared bathroom with low-flow fixtures.'},
{n:'Bedroom 3',w:3.5,d:3.5,x:0,z:3.5,c:0x9a7b55,i:'A kids’ room or guest bedroom.'},
{n:'Bedroom 1',w:4,d:3.5,x:0,z:0,c:0x9a7b55,i:'Master bedroom on the cooler north side of the house.'},
{n:'Bathroom 1',w:2,d:2.6,x:4,z:0,c:0xb7c0c0,i:'Ensuite-style bathroom between the two bedrooms.'},
{n:'Bedroom 2',w:4,d:3.5,x:8,z:0,c:0x9a7b55,i:'Second bedroom, quiet and shaded.'},
{n:'Dining area',w:4,d:5,x:8,z:3.5,c:0xa98a62,open:'w',glass:'e',i:'Open-plan dining beside the kitchen for family meals.'},
{n:'Kitchen',w:4,d:3.5,x:8,z:8.5,c:0xd8cdb8,open:'w',i:'Catches the morning sun from the east.'},
{n:'Carport',w:5,d:5,x:7,z:15,c:0x6a6a6a,nowall:1,i:'Covered parking for two cars at the front.'}];
var scene=new THREE.Scene();scene.background=new THREE.Color(0x261c12);scene.fog=new THREE.Fog(0x261c12,45,100);
var cam=new THREE.PerspectiveCamera(42,1,.1,200),rd;
try{rd=new THREE.WebGLRenderer({antialias:true})}catch(e){fail();return}
rd.setPixelRatio(Math.min(window.devicePixelRatio||1,2));rd.shadowMap.enabled=true;rd.shadowMap.type=THREE.PCFSoftShadowMap;
var holder=box.querySelector('.v3c');holder.appendChild(rd.domElement);
var ctl=new THREE.OrbitControls(cam,rd.domElement);ctl.enableDamping=true;ctl.dampingFactor=.08;ctl.maxPolarAngle=Math.PI*.49;ctl.minDistance=5;ctl.maxDistance=48;ctl.autoRotate=true;ctl.autoRotateSpeed=.7;
var HOME=[new THREE.Vector3(17,13,22),new THREE.Vector3(0,.8,0)];
cam.position.copy(HOME[0]);ctl.target.copy(HOME[1]);
scene.add(new THREE.HemisphereLight(0xfff3df,0x3a2c1c,.75),new THREE.AmbientLight(0xffffff,.2));
var sun=new THREE.DirectionalLight(0xfff0d6,1);sun.position.set(14,24,12);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
var sc=sun.shadow.camera;sc.left=-22;sc.right=22;sc.top=22;sc.bottom=-22;sc.near=1;sc.far=80;scene.add(sun);
function M(c,o){var m=new THREE.MeshStandardMaterial({color:c,roughness:.85,metalness:.05});if(o)for(var k in o){if(k=='emissive')m.emissive.set(o[k]);else m[k]=o[k]}return m}
function mesh(g,m,x,y,z,add){var e=new THREE.Mesh(g,m);e.position.set(x,y,z);e.castShadow=e.receiveShadow=true;(add||scene).add(e);return e}
function B(w,h,d){return new THREE.BoxGeometry(w,h,d)}
mesh(new THREE.PlaneGeometry(120,120),M(0x56733f),0,0,0).rotation.x=-Math.PI/2;
scene.children[scene.children.length-1].castShadow=false;
mesh(B(5.4,.04,7),M(0x77716a),3.5,.02,13.2);
mesh(B(W,.1,D),M(0xcbbba0),0,.05,0);
[[-9,1.4,.6,29.4],[9,1.4,.6,29.4],[0,-13,18.6,.6]].forEach(function(h){mesh(B(h[2],.9,h[3]),M(0x3f5a2e),h[0],.45,h[1])});
[[-12,-8],[12,-6],[-11,6],[12,8],[-13,-14],[13,-14]].forEach(function(t){mesh(new THREE.CylinderGeometry(.2,.28,2,8),M(0x5b4129),t[0],1,t[1]);var s=mesh(new THREE.SphereGeometry(1.8,14,12),M(0x3f6b34),t[0],3.2,t[1]);s.scale.y=1.15});
var floors=[],labels=[],wallsG=new THREE.Group(),furn=new THREE.Group(),lab=new THREE.Group();scene.add(wallsG,furn,lab);
var wallM=M(0xf3ece0),glassM=M(0x9fc3d6,{transparent:true,opacity:.35,roughness:.1});
function seg(x1,z1,x2,z2,gl){var t=.14,len=Math.hypot(x2-x1,z2-z1),g=B(z1==z2?len+t:t,H,x1==x2?len+t:t);g.translate(0,H/2,0);
var m=new THREE.Mesh(g,gl?glassM:wallM);m.position.set((x1+x2)/2+OX,.1,(z1+z2)/2+OZ);m.castShadow=!gl;m.receiveShadow=true;wallsG.add(m)}
function label(t){var c=document.createElement('canvas');c.width=320;c.height=80;var g=c.getContext('2d');g.fillStyle='rgba(38,28,18,.88)';g.strokeStyle='#c9a96e';g.lineWidth=3;
g.beginPath();g.roundRect?g.roundRect(4,8,312,64,18):g.rect(4,8,312,64);g.fill();g.stroke();g.fillStyle='#f3ece0';g.font='600 30px Montserrat,Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(t,160,41);
var s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false,transparent:true}));s.scale.set(3.6,.9,1);s.renderOrder=10;return s}
R.forEach(function(r,i){var cx=r.x+r.w/2+OX,cz=r.z+r.d/2+OZ;r.cx=cx;r.cz=cz;
var f=mesh(B(r.w-.02,.05,r.d-.02),M(r.c,{emissive:0xc9a96e,emissiveIntensity:0}),cx,.115,cz);f.userData.i=i;floors.push(f);r.f=f;
var s=label(r.n);s.position.set(cx,3.7,cz);lab.add(s);
if(r.nowall)return;var x1=r.x,x2=r.x+r.w,z1=r.z,z2=r.z+r.d,o=r.open||'',g=r.glass||'';
if(o.indexOf('n')<0)seg(x1,z1,x2,z1,g.indexOf('n')>=0);if(o.indexOf('s')<0)seg(x1,z2,x2,z2,g.indexOf('s')>=0);
if(o.indexOf('w')<0)seg(x1,z1,x1,z2,g.indexOf('w')>=0);if(o.indexOf('e')<0)seg(x2,z1,x2,z2,g.indexOf('e')>=0)});
seg(6,0,8,0);seg(12,12,12,15);seg(7,15,12,15);
function bx(w,h,d,c,x,y,z){return mesh(B(w,h,d),M(c),x+OX,y+h/2+FY,z+OZ,furn)}
function bed(x,z){bx(1.7,.4,2.05,0x6b5a45,x,0,z);bx(1.6,.15,1.9,0xe8dfd0,x,.4,z+.05);bx(.6,.12,.4,0xffffff,x-.4,.55,z-.7);bx(.6,.12,.4,0xffffff,x+.4,.55,z-.7);bx(1.8,.9,.1,0x4a3a28,x,0,z-1.05)}
bed(2,1.8);bed(10,1.8);bed(1.8,5.3);bx(.4,.5,.4,0x4a3a28,.7,0,.4);bx(.4,.5,.4,0x4a3a28,3.3,0,.4);
bx(2.7,.45,.95,0x7a6a55,3.5,0,15.9);bx(2.7,.5,.2,0x7a6a55,3.5,.45,16.3);bx(1.2,.35,.7,0x3a2c1c,3.5,0,14.6);bx(.35,.5,2.2,0x3a2c1c,.3,0,14.6);bx(.06,.7,1.5,0x111111,.3,.5,14.6);
bx(1.1,.75,2.3,0x6b5a45,10,0,6);[4.9,6,7.1].forEach(function(z){bx(.45,.45,.45,0xe8dfd0,9.1,0,z);bx(.45,.45,.45,0xe8dfd0,10.9,0,z)});
bx(.6,.9,3.4,0xe8dfd0,11.65,0,10.2);bx(1,.9,1.8,0xcbbba0,9.7,0,10.2);bx(.7,2,.7,0xd0d0d0,11.6,0,8.9);
bx(1.6,.75,.7,0x6b5a45,1.8,0,10.1);bx(.5,.5,.5,0x3a2c1c,1.8,0,10.9);bx(.3,1.6,1.6,0x4a3a28,.2,0,11.6);
bx(.4,.4,.55,0xffffff,.6,0,7.4);bx(.55,.85,1,0xe8dfd0,2.1,0,8.3);bx(.9,.1,.9,0xdde6e6,1.1,0,9.1);
bx(.4,.4,.55,0xffffff,4.5,0,.4);bx(.55,.85,1,0xe8dfd0,5.6,0,1.1);bx(.9,.1,.9,0xdde6e6,4.9,0,1.9);
[[8.3,0xf2f2f2],[10.7,0x2b2f36]].forEach(function(c){bx(1.9,.6,4.2,c[1],c[0],.15,17.6);bx(1.6,.5,2.2,c[1],c[0],.75,17.7)});
var pill=M(0xf3ece0);[7.1,11.9].forEach(function(x){mesh(new THREE.CylinderGeometry(.12,.12,H,10),pill,x+OX,H/2+.1,19.9+OZ)});
var a=W/2+.8,b=D/2+.8,h=a*.36,ri=b-a,roofG=new THREE.BufferGeometry();
var A=[-a,0,-b],Bp=[a,0,-b],C=[a,0,b],Dd=[-a,0,b],R1=[0,h,-ri],R2=[0,h,ri];
roofG.setAttribute('position',new THREE.Float32BufferAttribute([].concat(A,Bp,R1,A,R1,R2,A,R2,Dd,Dd,R2,C,Bp,C,R2,Bp,R2,R1),3));roofG.computeVertexNormals();
var roof=new THREE.Mesh(roofG,M(0x3b3631,{flatShading:true,side:THREE.DoubleSide,roughness:.7}));roof.castShadow=true;scene.add(roof);
var rt=0,ry=0,wt=1,vis=true,sel=-1,tw=null,roofOn=true,cutOn=false;
var info=box.querySelector('.v3i'),btn={};
box.querySelectorAll('.v3t button').forEach(function(b){btn[b.dataset.a]=b});
function mark(){btn.roof.classList.toggle('on',roofOn);btn.cut.classList.toggle('on',cutOn);btn.rot.classList.toggle('on',ctl.autoRotate)}
function setRoof(v){roofOn=v;rt=v?0:7;lab.visible=!v;mark()}
function setCut(v){cutOn=v;wt=v?.12:1;mark()}
function fly(p,t){tw={t0:performance.now(),p0:cam.position.clone(),t1:ctl.target.clone(),p:p,t:t}}
function select(i){sel=i;R.forEach(function(r,j){r.f.material.emissiveIntensity=j==i?.55:0});
document.querySelectorAll('#rlist li').forEach(function(l,j){l.classList.toggle('on',j==i)});
if(i<0){info.innerHTML='<b>Click any room</b><small>Drag to rotate · scroll or pinch to zoom</small>';setRoof(true);setCut(false);fly(HOME[0].clone(),HOME[1].clone());return}
var r=R[i];info.innerHTML='<b>'+r.n+'</b><small>'+r.w.toFixed(1)+' × '+r.d.toFixed(1)+' m · '+(r.w*r.d).toFixed(1)+' sq.m</small><p>'+r.i+'</p>';
setRoof(false);setCut(true);ctl.autoRotate=false;mark();var k=4+Math.max(r.w,r.d)*.9;fly(new THREE.Vector3(r.cx+k*.35,k*.95,r.cz+k*.9),new THREE.Vector3(r.cx,0,r.cz))}
var ul=document.getElementById('rlist');R.forEach(function(r,i){var li=document.createElement('li');li.className='rl';li.innerHTML=r.n+'<b>'+r.w.toFixed(1)+' × '+r.d.toFixed(1)+' m</b>';li.onclick=function(){select(i)};ul.appendChild(li)});
btn.roof.onclick=function(){setRoof(!roofOn)};btn.cut.onclick=function(){setCut(!cutOn)};
btn.top.onclick=function(){setRoof(false);setCut(true);ctl.autoRotate=false;mark();fly(new THREE.Vector3(0,34,.01),new THREE.Vector3(0,0,0))};
btn.rot.onclick=function(){ctl.autoRotate=!ctl.autoRotate;mark()};btn.reset.onclick=function(){select(-1)};
ctl.addEventListener('start',function(){tw=null;if(ctl.autoRotate){ctl.autoRotate=false;mark()}});
var ray=new THREE.Raycaster(),m2=new THREE.Vector2(),dn=null,cv=rd.domElement;
cv.addEventListener('pointerdown',function(e){dn=[e.clientX,e.clientY]});
cv.addEventListener('pointerup',function(e){if(!dn||Math.abs(e.clientX-dn[0])+Math.abs(e.clientY-dn[1])>6)return;var q=cv.getBoundingClientRect();
m2.set((e.clientX-q.left)/q.width*2-1,-(e.clientY-q.top)/q.height*2+1);ray.setFromCamera(m2,cam);var hit=ray.intersectObjects(floors)[0];if(hit)select(hit.object.userData.i)});
function size(){var w=holder.clientWidth,hh=holder.clientHeight;if(!w||!hh)return;rd.setSize(w,hh,false);cam.aspect=w/hh;cam.updateProjectionMatrix()}
new ResizeObserver(size).observe(holder);size();
new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(box);
function loop(t){requestAnimationFrame(loop);if(!vis)return;
if(tw){var k=Math.min(1,(t-tw.t0)/900);k=1-Math.pow(1-k,3);cam.position.lerpVectors(tw.p0,tw.p,k);ctl.target.lerpVectors(tw.t1,tw.t,k);if(k>=1)tw=null}
ry+=(rt-ry)*.08;roof.position.y=H+.1+ry;roof.visible=ry<6.8;wallsG.scale.y+=(wt-wallsG.scale.y)*.12;
ctl.update();rd.render(scene,cam)}
select(-1);mark();requestAnimationFrame(loop);
})();
