var jugadas_posibles =0;
var jugadas_aceptadas = 18;
var min = 0.00001;
var monto = 75.498;
var primer_calculo = true;
var bajada = true; // se usa cuando el igualador resta del valor minimo

if (primer_calculo){
  primer_calculo = false;
  Jugadas(min, monto, 1);
}

console.log(min);

function Jugadas(min, monto, jugadas){// determina el valor de jugadas posibles
  if(min < monto){
    //console.log(jugadas);
    Jugadas(min*2, monto-min, jugadas+1);
  }
  else{
    jugadas_posibles = jugadas-1;
    Igualador();
  }
}

function JugadasFin(min, monto, jugadas){
  if(min < monto){
    JugadasFin(min*2, monto-min, jugadas+1);
  }
  else{
    jugadas_posibles = jugadas-1;
  }
}

function Igualador(){
  if (jugadas_posibles > jugadas_aceptadas){
    min = min + 0.00000001;
    //console.log("jugadas posibles son mas "+ min);
    bajada= false;
    Jugadas(min, monto, 1);
  }
  if (jugadas_posibles < jugadas_aceptadas){
    min = min - 0.00000001;  
   // console.log("jugadas posibles son menos "+ min);
    Jugadas(min, monto, 1);
  }
  if(jugadas_posibles == jugadas_aceptadas ){
    //console.log("jugadas posibles son iguales");  
    determinador();
  }
}

function determinador(){
  var min_tem = min;
  while(jugadas_posibles == jugadas_aceptadas && !bajada){
    min_tem = min_tem + 0.00000001;
    JugadasFin(min_tem,monto,1);    
  }
  min = min_tem;
}
