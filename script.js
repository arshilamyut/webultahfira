// ===== Ganti dengan foto kamu (URL atau data URI) =====
const PHOTOS=["foto/foto1.jpeg","foto/foto2.jpeg","foto/foto3.jpeg","foto/foto4.jpeg","foto/foto5.jpeg"];
const CAPS=["cantiknyaaaa","gemesss","lucuuu","beautyy","imuppp"];
const $=s=>document.querySelector(s);
const cv=$("#cv"),cx=cv.getContext("2d");
function fit(){cv.width=innerWidth;cv.height=innerHeight}fit();addEventListener("resize",fit);
/* confetti */
let parts=[];
function confetti(n=140){const c=["#ff8fb8","#ffd3e4","#fff","#ffcf5c","#c9a7ff","#ff5c9a"];for(let i=0;i<n;i++)parts.push({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*14,vy:Math.random()*-14-3,s:Math.random()*7+4,c:c[i%c.length],r:Math.random()*6})}
(function loop(){cx.clearRect(0,0,cv.width,cv.height);parts=parts.filter(p=>p.y<innerHeight+20);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.3;p.r+=.2;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);cx.restore()});requestAnimationFrame(loop)})();
/* sparkle trail */
function spark(e){const x=e.touches?e.touches[0].clientX:e.clientX,y=e.touches?e.touches[0].clientY:e.clientY;const s=document.createElement("div");s.className="sp";s.textContent=["✨","💗","⭐","🎀"][Math.random()*4|0];s.style.left=x+"px";s.style.top=y+"px";document.body.appendChild(s);setTimeout(()=>s.remove(),800)}
let lt=0;["mousemove","touchmove"].forEach(ev=>addEventListener(ev,e=>{if(Date.now()-lt>70){lt=Date.now();spark(e)}},{passive:true}));
/* music: file mpeg sendiri */
let playing=false;
const lagu=new Audio("music/audio.mp3.mpeg");
lagu.loop=true;
function toggleMusic(on){
  playing=on??!playing;
  if(playing){lagu.play().catch(()=>{})}else{lagu.pause()}
  $("#music").textContent=playing?"🎵":"🔇";
}
$("#music").onclick=()=>toggleMusic();
/* theme */
$("#theme").onclick=()=>{const r=document.documentElement,n=r.dataset.theme==="night";r.dataset.theme=n?"":"night";$("#theme").textContent=n?"🌙":"☀️"};
/* loading */
requestAnimationFrame(()=>setTimeout(()=>$("#lb").style.width="100%",50));
setTimeout(()=>{$("#load").classList.add("hide");$("#pass").classList.remove("hide")},2600);
/* password */
// Kode yang diterima (angka saja, tanda baca/spasi diabaikan). Tambah/ganti sesuka kamu.
const KODE=["19102008","191008","1910","19102026","190808"];
function tryPin(){
  const v=($("#pin").value||"").replace(/[^0-9]/g,"");
  if(KODE.includes(v)){
    $("#pass").classList.add("hide");
    $("#envs").classList.remove("hide");
    try{toggleMusic(true)}catch(e){console.log(e)}
  }else{
    $("#perr").textContent="Hmm, salah. Coba lagi ya 🥺";
    $("#pin").classList.remove("shake");void $("#pin").offsetWidth;$("#pin").classList.add("shake");
  }
}
$("#pgo").addEventListener("click",tryPin);
$("#pin").addEventListener("keydown",e=>{if(e.key==="Enter")tryPin()});
$("#pin").removeAttribute("maxlength");

/* envelope */
$("#env").onclick=()=>{$("#env").classList.add("open");confetti(60);setTimeout(()=>$("#ego").style.display="inline-block",1200)};
$("#ego").onclick=()=>{$("#envs").classList.add("hide");$("#main").classList.add("show");$("#bear").classList.add("show");confetti(200);observe()};
/* reveal on scroll */
function observe(){const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("in")),{threshold:.15});document.querySelectorAll(".rv").forEach(el=>io.observe(el))}
/* cake */
let off=0;document.querySelectorAll(".candle").forEach(c=>c.onclick=()=>{if(c.classList.contains("off"))return;c.classList.add("off");if(++off===3){confetti(220);$("#cakemsg").textContent="Yeay! Semoga semua wish kamu terkabul 🎉💗"}});
/* polaroids */
CAPS.forEach((c,i)=>{const d=document.createElement("div");d.className="pol";d.style.setProperty("--r",(i%2?3:-3)+(i-2)+"deg");d.innerHTML=`<div class="ph"></div>${c}`;d.firstChild.style.backgroundImage=`url(${PHOTOS[i]})`;$("#pols").appendChild(d)});
/* calendar */
(()=>{let h="";["Min","Sen","Sel","Rab","Kam","Jum","Sab"].forEach(d=>h+=`<b>${d}</b>`);for(let i=0;i<4;i++)h+="<span></span>";for(let d=1;d<=31;d++)h+=`<span class="${d===19?"bd":""}">${d}</span>`;$("#cal").innerHTML=h})();
/* quiz */
const Q=[["Sudah berapa tahun kita sahabatan?",["3","5","7"],1],["Kapan ulang tahun Zhafira?",["19 Oktober","9 Januari","19 Agustus"],0],["Sekarang Zhafira berumur…",["17","18","20"],1],["Zhafira nggak boleh … sama aku!",["Sayang","Bosen","Cerita"],1]];
let qi=0,sc=0;
function showQ(){const q=Q[qi],z=$("#quiz");if(!q){z.innerHTML=`<h3>Skor kamu ${sc}/${Q.length} 🎉</h3><p style="margin-top:.6rem">${sc===Q.length?"Sempurna! Sahabat sejati 💗":"Tetap sahabat terbaik kok 🩷"}</p>`;if(sc===Q.length)confetti();return}
z.innerHTML=`<b>${qi+1}/${Q.length}</b><h3 style="margin-top:.4rem">${q[0]}</h3><div class="opts">${q[1].map((o,i)=>`<button data-i="${i}">${o}</button>`).join("")}</div>`;
z.querySelectorAll("button").forEach(b=>b.onclick=()=>{const ok=+b.dataset.i===q[2];b.classList.add(ok?"ok":"no");if(ok)sc++;z.querySelectorAll("button").forEach(x=>x.disabled=true);setTimeout(()=>{qi++;showQ()},900)})}
showQ();
/* gift */
$("#gift").onclick=function(){this.classList.add("shake");setTimeout(()=>{this.textContent="🎉";$("#giftmsg").style.display="block";confetti(160)},900)};
/* bear */
const bm=["Hai Zhafira! 🎀","Selamat ulang tahun ke-18! 🎂","Jangan pendek terus ya, hehe 😝","Kamu disayang banget 💗","Cerita ke dia kalau ada apa-apa ya 🥹","Peluk virtual 🤗"];let bi=0;
$("#bear").onclick=()=>{bi=(bi+1)%bm.length;$("#bubble").textContent=bm[bi];spark({clientX:50,clientY:innerHeight-80})};
/* wish */
const w=document.querySelector(".wish");for(let i=0;i<40;i++){const s=document.createElement("i");s.className="star";s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";s.style.animationDelay=Math.random()*2+"s";w.appendChild(s)}
$("#wbtn").onclick=()=>{for(let i=0;i<5;i++)setTimeout(()=>{const s=document.createElement("i");s.className="shoot";s.style.left=Math.random()*50+"%";s.style.top=Math.random()*40+"%";w.appendChild(s);setTimeout(()=>s.remove(),1300)},i*300);confetti(100);$("#wtxt").innerHTML="Semoga kamu selalu bahagia, sehat, dan semua mimpimu tercapai.<br>Dan semoga kita terus bareng sampai puluhan tahun lagi"};