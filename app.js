
let aportes=JSON.parse(localStorage.getItem("aportes"))||[];
let rendimentos=JSON.parse(localStorage.getItem("rendimentos"))||[];

function salvarAporte(){
 const fundo=document.getElementById("fundo").value.toUpperCase();
 const cotas=Number(document.getElementById("cotas").value);
 const valor=Number(document.getElementById("valor").value);
 const data=document.getElementById("data").value;
 if(!fundo||!cotas||!valor){alert("Preencha todos os campos.");return;}
 aportes.push({fundo,cotas,valor,data});
 localStorage.setItem("aportes",JSON.stringify(aportes));
 location.reload();
}

function salvarRendimento(){
 const fundo=document.getElementById("fundoRendimento").value.toUpperCase();
 const mes=document.getElementById("mes").value;
 const valor=Number(document.getElementById("rendimento").value);
 if(!fundo||!mes||!valor){alert("Preencha todos os campos.");return;}
 rendimentos.push({fundo,mes,valor});
 localStorage.setItem("rendimentos",JSON.stringify(rendimentos));
 location.reload();
}

function atualizarResumo(){
 const investido=aportes.reduce((t,a)=>t+a.cotas*a.valor,0);
 const rend=rendimentos.reduce((t,r)=>t+r.valor,0);
 if(document.getElementById("totalInvestido")){
  document.getElementById("totalInvestido").innerHTML="Investido: R$ "+investido.toFixed(2);
  document.getElementById("totalRendimentos").innerHTML="Rendimentos: R$ "+rend.toFixed(2);
 }
}

function carregarHistorico(){
 const div=document.getElementById("historico");
 if(!div)return;
 const fundos={};
 aportes.forEach(a=>{
   if(!fundos[a.fundo]) fundos[a.fundo]={cotas:0,investido:0,rendimento:0};
   fundos[a.fundo].cotas+=a.cotas;
   fundos[a.fundo].investido+=a.cotas*a.valor;
 });
 rendimentos.forEach(r=>{
   if(!fundos[r.fundo]) fundos[r.fundo]={cotas:0,investido:0,rendimento:0};
   fundos[r.fundo].rendimento+=r.valor;
 });
 let total=0;
 for(let f in fundos){
   total+=fundos[f].rendimento;
   div.innerHTML += `<div class="item"><h2>${f}</h2>
   <p>Cotas: ${fundos[f].cotas}</p>
   <p>Investido: R$ ${fundos[f].investido.toFixed(2)}</p>
   <p>Rendimentos: R$ ${fundos[f].rendimento.toFixed(2)}</p></div>`;
 }
 div.innerHTML += `<div class="item"><h2>Total Geral</h2><h1>R$ ${total.toFixed(2)}</h1></div>`;
}

function carregarListaFundos(){
 const lista=document.getElementById("listaFundos");
 if(!lista)return;
 lista.innerHTML="";
 aportes.forEach((a,i)=>{
   lista.innerHTML += `<div class="item">
   <b>${a.fundo}</b><br>
   ${a.cotas} cotas<br>
   Valor da cota: R$ ${Number(a.valor).toFixed(2)}<br>
   <button onclick="editarFundo(${i})">✏️ Editar</button>
   <button onclick="excluirFundo(${i})" style="background:#dc2626;margin-top:10px;">🗑️ Excluir</button>
   </div>`;
 });
}

function editarFundo(i){
 const a=aportes[i];
 const fundo=prompt("Fundo",a.fundo);
 const cotas=prompt("Quantidade de cotas",a.cotas);
 const valor=prompt("Valor da cota",a.valor);
 if(fundo===null||cotas===null||valor===null)return;
 a.fundo=fundo.toUpperCase();
 a.cotas=Number(cotas);
 a.valor=Number(valor);
 localStorage.setItem("aportes",JSON.stringify(aportes));
 location.reload();
}

function excluirFundo(i){
 if(!confirm("Excluir este cadastro?")) return;
 aportes.splice(i,1);
 localStorage.setItem("aportes",JSON.stringify(aportes));
 location.reload();
}

atualizarResumo();
