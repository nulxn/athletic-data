async function beginzecode(){console.log("code haz begun");try{var o,e,r,t,a,l,s,n,c=(await axios.get("https://athleticlive.blob.core.windows.net/$web/ind_ent_list/_doc/"+document.getElementById("meetinput").value)).data;void 0!==c._source.en?(o=await processRacers(c,Number(document.getElementById("events").value)),e=await sortPRs(o),r=JSON.parse(e),t={},Object.entries(r.places).forEach(o=>{5<=o[1].athletes&&(t[o[0]]=o[1])}),(a=Object.entries(t)).sort((o,e)=>o[1].score-e[1].score),(l={}).teams=a,l.athletes=r.prs,s=[],l.teams.forEach(o=>{o={team:o[0],score:o[1].score,colors:o[1].colors};s.push(o)}),new Chart(document.getElementById("teamScores"),{type:"bar",data:{labels:s.map(o=>o.team),datasets:[{label:"Team Scores",data:s.map(o=>o.score),backgroundColor:s.map(o=>nameToColor(o.colors[0],o.team)+", 0.9)"),borderColor:s.map(o=>2===o.colors.length||o.colors.includes(null)||o.colors.includes("null")?nameToColor(o.colors[1],o.team)+", 0.95)":nameToColor(o.colors[2],o.team)+", 1)"),borderWidth:4}]},options:{responsive:!0,plugins:{legend:{labels:{color:"#f8f8f2",font:{size:14,family:"Arial, sans-serif"}}},tooltip:{backgroundColor:"#44475a",titleColor:"#f8f8f2",bodyColor:"#f8f8f2",borderColor:"#bd93f9",borderWidth:2,padding:10,caretSize:6}},scales:{x:{ticks:{color:"#f8f8f2",font:{size:12}},grid:{color:"#44475a",borderColor:"#282a36",borderWidth:1}},y:{ticks:{color:"#f8f8f2",font:{size:12}},grid:{color:"#44475a",borderColor:"#282a36",borderWidth:1}}},elements:{point:{radius:4,backgroundColor:"#bd93f9",borderColor:"#f8f8f2",borderWidth:1},line:{borderColor:"#bd93f9",borderWidth:2}},layout:{padding:{left:20,right:20,top:20,bottom:20}},backgroundColor:"#282a36"}}),n=[],l.athletes.forEach(o=>{o={name:o.name,pr:o.pr,school:o.school.name};n.push(o)}),new Tabulator("#example-table",{data:n,autoColumns:!0,pagination:"local",paginationSize:10,paginationSizeSelector:[10,20,30],movableColumns:!0,layout:"fitColumns"}),console.log(l)):void 0!==c._source.r?console.log("this meet already happened!"):console.log("the entries for this meet have not been posted")}catch(o){console.error("An error occurred:",o)}}console.clear();