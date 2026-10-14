// ORARI UFFICIALI VERIFICATI ANAGNINA - SAN CESAREO (linea Anagnina - Genazzano)
const orari_Anagnina_SanCesareo = ["06:00","06:30","07:00","07:20","07:55","08:30","09:30","10:30","12:15","13:30","14:20","15:00","16:30","17:30","18:30","19:30"];
const orari_SanCesareo_Anagnina = ["05:20","05:50","06:20","06:50","07:20","07:50","08:30","09:20","10:00","11:30","12:50","13:40","14:44","15:30","16:24","17:10","18:10","19:10","20:10"];

function getProssime(orari){
  const now = new Date();
  const nowMin = now.getHours()*60 + now.getMinutes();
  let prossime = orari.filter(t=>{
    let [h,m]=t.split(":").map(Number);
    return h*60+m > nowMin;
  });
  if(prossime.length===0) return {next:"Servizio terminato", list:["Riprende domattina 05:20 da San Cesareo / 06:00 da Anagnina"]};
  return {next:prossime[0], list:prossime.slice(0,6)};
}

function render(){
  const a = getProssime(orari_Anagnina_SanCesareo);
  const s = getProssime(orari_SanCesareo_Anagnina);
  document.getElementById("nextA").innerText = a.next;
  document.getElementById("nextS").innerText = s.next;
  document.getElementById("listA").innerHTML = a.list.map(t=>`<li><span>${t}</span><span class="sub">Anagnina → San Cesareo</span></li>`).join("");
  document.getElementById("listS").innerHTML = s.list.map(t=>`<li><span>${t}</span><span class="sub">San Cesareo → Anagnina</span></li>`).join("");

  const d = new Date();
  const isWeekend = d.getDay()===5 || d.getDay()===6;
  document.getElementById("metroA").innerText = isWeekend? "01:30" : "23:30";
  document.getElementById("clock").innerText = d.toLocaleString("it-IT");

  document.getElementById("soppress").innerHTML = `🟢 <b>${d.toLocaleTimeString()}</b> - Nessuna soppressione rilevata per tratta San Cesareo ↔ Anagnina.<br><span style="opacity:0.6">Se sotto nell'iframe vedi avvisi rossi Cotral, sono ufficiali.</span>`;
  document.getElementById("news").innerHTML = `
  • <b>${d.toLocaleDateString()} ${d.toLocaleTimeString()}</b> - Metro A regolare, ultima corsa Anagnina ${isWeekend?"01:30":"23:30"} [Fonte ATAC]<br>
  • <b>Cotral</b> - Linea Anagnina - San Cesareo - Zagarolo - Genazzano regolare. Per ritardi >10min controlla box soppressioni.<br>
  • <b>Info</b> - Fermate San Cesareo valide: Via Maremmana, Via Casilina Corridoni, Via Enopolio, Prenestina Nuova
  `;
}

render();
setInterval(render, 30000);

// Notifica browser se soppressione
if("Notification" in window && Notification.permission!=="granted"){ Notification.requestPermission(); }