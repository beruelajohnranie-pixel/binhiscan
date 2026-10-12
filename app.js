const D=[
{id:"mais",tl:"Mais",en:"Corn",e:"🌽",dp:"2.5–5 cm",wa:"Water after planting and keep moisture steady, especially during germination and flowering.",su:"Full sun is preferred.",g:"5–10 days",h:[75,100],m:[4,5,6,10,11,12],ph:[5.8,7],t:[21,32],s:[1,2,1],sun:6},
{id:"kamatis",tl:"Kamatis",en:"Tomato",e:"🍅",dp:"0.5–1 cm (seedbed)",wa:"Water regularly at the base; avoid wetting leaves and keep drainage good.",su:"Full sun (6+ hours).",g:"5–10 days",h:[90,120],m:[10,11,12,1,2],ph:[6,6.8],t:[18,30],s:[0,2,1],sun:6},
{id:"talong",tl:"Talong",en:"Eggplant",e:"🍆",dp:"0.5–1 cm (seedbed)",wa:"Keep soil evenly moist; mulch to hold moisture.",su:"Full sun (6+ hours).",g:"7–14 days",h:[90,120],m:[10,11,12,1,2,3],ph:[5.8,6.8],t:[24,32],s:[1,2,1],sun:6},
{id:"kangkong",tl:"Kangkong",en:"Water Spinach",e:"🌿",dp:"1–2 cm",wa:"Needs plenty of water; keep soil wet or shallowly flooded.",su:"Full sun to partial shade.",g:"3–7 days",h:[25,35],m:[1,2,3,4,5,6,7,8,9,10,11,12],ph:[5.5,7],t:[25,35],s:[2,2,0],sun:4,wet:1},
{id:"sitaw",tl:"Sitaw",en:"Yardlong Bean",e:"🫘",dp:"2–3 cm",wa:"Moderate watering; avoid waterlogging. Provide a trellis.",su:"Full sun (6+ hours).",g:"4–8 days",h:[55,70],m:[10,11,12,1,2,3],ph:[6,7],t:[22,34],s:[1,2,2],sun:6},
{id:"labanos",tl:"Labanos",en:"Radish",e:"🌱",dp:"1–1.5 cm",wa:"Keep soil evenly moist for tender roots.",su:"Full sun to partial shade.",g:"3–7 days",h:[25,40],m:[10,11,12,1,2],ph:[6,7],t:[15,28],s:[0,2,2],sun:4},
{id:"okra",tl:"Okra",en:"Okra",e:"🫑",dp:"2–3 cm",wa:"Water when the top soil is dry; tolerates short dry spells.",su:"Full sun (6+ hours).",g:"5–10 days",h:[50,65],m:[3,4,5,6,7,8,9,10],ph:[6,7],t:[24,36],s:[1,2,2],sun:6},
{id:"pechay",tl:"Pechay",en:"Pak Choi",e:"🥬",dp:"0.5–1 cm",wa:"Keep soil consistently moist, light daily watering.",su:"Full sun to partial shade.",g:"3–5 days",h:[25,35],m:[10,11,12,1,2,3],ph:[6,7],t:[18,30],s:[1,2,1],sun:4}];
const find=id=>D.find(x=>x.id==id),$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const MO="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),NOW=new Date().getMonth()+1,CL=["Clay","Loam","Sandy"];
const WX={Sunny:33,Cloudy:29,Rainy:26,Cool:20};
let hist=[];try{hist=JSON.parse(localStorage.getItem("bs_h")||"[]")}catch(e){}
const saveH=()=>{try{localStorage.setItem("bs_h",JSON.stringify(hist))}catch(e){}};
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),2200)}
const opts=D.map(s=>`<option value="${s.id}">${s.tl} (${s.en})</option>`).join("");
["#gs","#cs","#ses"].forEach(i=>$(i).innerHTML=opts);
$("#dt").textContent=new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
$("#seeds").innerHTML=D.map(s=>`<button class="chip" data-s="${s.id}">${s.e} ${s.tl}</button>`).join("");
const cal=s=>MO.map((m,i)=>`<i class="${s.m.includes(i+1)?"y":""} ${i+1==NOW?"n":""}">${m}</i>`).join("");
const row=(a,b)=>`<div class="gr"><b>${a}</b><p>${b}</p></div>`;
function guide(s){return `<div class="gh"><span>${s.e}</span><div><h3>${s.tl} / ${s.en}</h3><small>Harvest in ${s.h[0]}–${s.h[1]} days</small></div></div>`+row("Planting depth / Lalim ng pagtatanim","about "+s.dp)+row("Watering / Pagdidilig",s.wa)+row("Sunlight / Sikat ng araw",s.su)+row("Estimated germination / Tinatayang pagtubo","about "+s.g)+row("Soil & pH / Lupa",CL.filter((_,i)=>s.s[i]==2).join(" / ")+" · pH "+s.ph[0]+"–"+s.ph[1])+`<div class="gr"><b>Best months / Pinakamainam na buwan</b><div class="cal">${cal(s)}</div></div>`}
function go(p,id){$$(".pg").forEach(x=>x.classList.toggle("on",x.id=="p-"+p));$$(".tab [data-go]").forEach(b=>b.classList.toggle("on",b.dataset.go==p));
if(id){["#gs","#cs","#ses"].forEach(i=>$(i).value=id)}
if(p=="home")$("#ns").textContent=hist.length;if(p=="guide")$("#gout").innerHTML=guide(find($("#gs").value));if(p=="history")renderH();
$("#sout").hidden=true;$("#sout2").innerHTML="";scrollTo(0,0)}
$$("[data-go]").forEach(b=>b.onclick=()=>{ov(null);go(b.dataset.go)});
$("#hb").onclick=()=>go("history");$("#gs").onchange=()=>$("#gout").innerHTML=guide(find($("#gs").value));
$$("[data-s]").forEach(b=>b.onclick=()=>go("guide",b.dataset.s));
$("#ph").oninput=e=>$("#phv").textContent=e.target.value;
$("#sbt").onclick=()=>{const s=find($("#ses").value),ok=s.m.includes(NOW),nx=[...s.m,...s.m.map(x=>x+12)].find(x=>x>NOW);
$("#sout2").innerHTML=`<div style="margin-top:16px"><span class="verdict ${ok?"ok":"wn"}">${ok?"Good time to plant":"Not the best month"}</span><p>${ok?MO[NOW-1]+" is within the recommended planting months for "+s.tl+".":MO[NOW-1]+" is outside the recommended months for "+s.tl+". Next good month: "+MO[(nx-1)%12]+"."}</p><div class="cal">${cal(s)}</div></div>`};
$("#chk").onclick=()=>{const s=find($("#cs").value),sv=s.s[CL.indexOf($("#so").value)],ph=+$("#ph").value,mo=$("#mo").value,sn=+$("#sn").value,t=WX[$("#wx").value],inS=s.m.includes(NOW);let r=[],p=0;
const A=(l,a,b,n)=>{r.push([l,a,b]);p+=n};
sv==2?A("ok","Soil type","Ideal for "+s.tl+".",25):sv==1?A("wn","Soil type","Acceptable; mix in compost.",15):A("no","Soil type","Not ideal. Improve with compost or use raised beds.",4);
ph>=s.ph[0]&&ph<=s.ph[1]?A("ok","Soil pH",ph+" is within "+s.ph[0]+"–"+s.ph[1]+".",20):A("wn","Soil pH",ph+" is "+(ph<s.ph[0]?"acidic; add agricultural lime":"alkaline; add compost")+". Ideal "+s.ph[0]+"–"+s.ph[1]+".",9);
t>=s.t[0]&&t<=s.t[1]?A("ok","Temperature","About "+t+"°C is suitable ("+s.t[0]+"–"+s.t[1]+"°C).",20):A("no","Temperature","About "+t+"°C; ideal is "+s.t[0]+"–"+s.t[1]+"°C.",5);
mo=="Waterlogged"?(s.wet?A("ok","Moisture","Wet soil suits "+s.tl+".",15):A("no","Moisture","Waterlogged soil risks rot. Improve drainage.",2)):mo=="Dry"?(s.wet?A("no","Moisture","Too dry; "+s.tl+" needs wet soil.",3):A("wn","Moisture","Dry soil; irrigate before and after sowing.",9)):A("ok","Moisture","Soil moisture is good.",15);
sn>=s.sun?A("ok","Sunlight","Enough sun for "+s.tl+".",10):sn>=s.sun-2?A("wn","Sunlight","Slightly low; "+s.tl+" prefers "+s.sun+"+ hours.",6):A("no","Sunlight","Too shady for "+s.tl+".",2);
inS?A("ok","Season",MO[NOW-1]+" is within the planting months.",10):A("wn","Season",MO[NOW-1]+" is outside the best months.",3);
const v=p>=75?["ok","Suitable to plant"]:p>=50?["wn","Possible with care"]:["no","Not recommended"],I={ok:"✓",wn:"!",no:"✕"};
const o=$("#sout");o.hidden=false;o.innerHTML=`<h2>Result <small>— ${s.tl}</small></h2><div class="gauge ${v[0]}"><svg viewBox="0 0 160 90"><path d="M10 80A70 70 0 0 1 150 80" fill="none" stroke="var(--line)" stroke-width="12" stroke-linecap="round"/><path d="M10 80A70 70 0 0 1 150 80" fill="none" stroke="var(--c)" stroke-width="12" stroke-linecap="round" stroke-dasharray="${p/100*220} 220"/></svg><b>${p}</b></div><div style="text-align:center"><span class="verdict ${v[0]}">${v[1]}</span></div>`+r.map(c=>`<div class="chk ${c[0]}"><i>${I[c[0]]}</i><div><b>${c[1]}</b><span>${c[2]}</span></div></div>`).join("")+`<p class="note">Estimate only. Confirm with a real soil test and local agricultural advice.</p>`;o.scrollIntoView({behavior:"smooth"})};
function renderH(){$("#hl").innerHTML=hist.length?hist.map((h,i)=>{const s=find(h.id);return `<div class="hr"><div><b>${s.e} ${s.tl} (${s.en})</b><small>${h.ts} · ${h.c.toFixed(1)}%</small></div><button class="btn g" data-h="${h.id}">View guide</button></div>`}).join(""):`<p class="note" style="margin-top:14px">No scans yet.</p>`;$$("[data-h]").forEach(b=>b.onclick=()=>go("guide",b.dataset.h))}
$("#clr").onclick=()=>{hist=[];saveH();renderH();toast("History cleared")};
$("#exp").onclick=async()=>{const t=hist.map(h=>`${h.ts} - ${find(h.id).tl} (${find(h.id).en}) - ${h.c}%`).join("\n")||"No scans";try{await navigator.clipboard.writeText(t);toast("History copied")}catch(e){toast("Copy not available here")}};
// ---- Scan ----
let stream=null;const ov=n=>["cam","ana","res"].forEach(x=>$("#"+x).classList.toggle("on",x==n));
const stopCam=()=>{if(stream)stream.getTracks().forEach(t=>t.stop());stream=null};
async function openCam(){ov("cam");$("#tipbox").hidden=true;$("#hint").textContent="Place the seed inside the frame";
try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});$("#vid").srcObject=stream}catch(e){stream=null;$("#hint").textContent="Camera unavailable here. Tap the green button to use your phone camera."}}
$("#bcam").onclick=openCam;$("#vf").onclick=openCam;$("#retry").onclick=openCam;$("#cb").onclick=()=>{stopCam();ov(null)};$("#ab").onclick=()=>ov(null);
$("#tips").onclick=()=>$("#tipbox").hidden=!$("#tipbox").hidden;
$("#shut").onclick=()=>{if(!stream){$("#camin").click();return}const v=$("#vid"),c=document.createElement("canvas");c.width=v.videoWidth;c.height=v.videoHeight;c.getContext("2d").drawImage(v,0,0);c.toBlob(b=>{stopCam();scan(b)},"image/jpeg",.9)};
["up","up2","camin"].forEach(id=>$("#"+id).onchange=e=>{stopCam();scan(e.target.files[0]);e.target.value=""});
async function shrink(f){const b=await createImageBitmap(f),k=Math.min(1,900/Math.max(b.width,b.height)),c=document.createElement("canvas");c.width=Math.round(b.width*k);c.height=Math.round(b.height*k);c.getContext("2d").drawImage(b,0,0,c.width,c.height);return new Promise(r=>c.toBlob(r,"image/jpeg",.85))}
const ask=async(P,f)=>{const sm=await(window.claude&&claude.use("sample"));if(!sm)throw{code:"none"};return sm.json(P,{images:[await shrink(f)],cache:false})};
/* >>> HOOK: palitan ng sariling AI model ng BinhiScan. Dapat mag-return ng {id:"mais|kamatis|...", c:0-100} o {id:null, reason:"..."} <<< */
const identify=f=>ask(`Identify the seed in this image. Choose ONLY from: ${D.map(s=>s.id).join(", ")}. Reply JSON only: {"id":"<one of the list>"|null,"c":<honest confidence 0-100>,"reason":"<short English reason if null>"}`,f);
async function scan(file){if(!file)return;const url=URL.createObjectURL(file);$("#aimg").src=url;$("#sw").style.display="";$("#retry").hidden=true;$("#atx").textContent="Analyzing…";ov("ana");
const fail=t=>{$("#sw").style.display="none";$("#atx").innerHTML=t;$("#retry").hidden=false};
try{const r=await identify(file);if(!r||!find(r.id)){fail((r&&r.reason||"No supported seed detected.")+"<br><small style='font:400 13px var(--sans);color:var(--mut)'>Try a closer, brighter shot of one seed type.</small>");return}
const c=Math.max(0,Math.min(100,+r.c||0));hist.unshift({id:r.id,c,ts:new Date().toLocaleString()});hist=hist.slice(0,30);saveH();openRes(r.id,c,url)}
catch(e){fail(e.code=="not_granted"?"Permission is needed to analyze the photo.":e.code=="none"?"Scanner not available here.":"Scan failed. Please try again.")}}
function openRes(id,c,img){const s=find(id),R=$("#res");R.innerHTML=`<div class="in"><button class="btn g" id="rbk" style="width:auto;padding:11px 18px;margin-bottom:12px">‹ Back</button><div class="card" style="text-align:center"><div class="circ sm"><img src="${img}" alt=""></div><h2 style="font-size:28px">${s.tl}</h2><p style="margin:0">${s.en}</p><div class="cf"><span style="font-weight:700">${Math.round(c)}%</span><div class="bar"><i style="width:${c}%"></i></div><small class="note">confidence</small></div></div><div class="card">${guide(s)}</div><button class="btn" id="rsoil">Check soil suitability</button><button class="btn g" id="rdone">Done</button></div>`;
ov("res");R.scrollTop=0;$("#rbk").onclick=()=>ov(null);$("#rdone").onclick=()=>{ov(null);go("home")};$("#rsoil").onclick=()=>{ov(null);go("soil",id)}}
async function soilPhoto(f){if(!f)return;$("#sthumb").innerHTML=`<img class="thumb" src="${URL.createObjectURL(f)}" alt=""><p class="note" style="margin:8px 0 0" id="snote">Reading photo…</p>`;
try{const r=await ask(`Look at this soil photo. Reply JSON only: {"soil":"Clay"|"Loam"|"Sandy","moisture":"Dry"|"Moist"|"Waterlogged"}`,f);if(CL.includes(r.soil))$("#so").value=r.soil;if(["Dry","Moist","Waterlogged"].includes(r.moisture))$("#mo").value=r.moisture;$("#snote").textContent="Visual estimate applied: "+r.soil+", "+r.moisture+". Please adjust if wrong."}catch(e){$("#snote").textContent="Photo saved as a visual reference. Select soil details below."}}
$("#sp1").onchange=e=>soilPhoto(e.target.files[0]);$("#sp2").onchange=e=>soilPhoto(e.target.files[0]);
go("home");
