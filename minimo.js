var jugadas_posibles =0;
var jugadas_aceptadas = 19;
var min = 0.00001;
var monto = 85.825;
var primer_calculo = true;

if (primer_calculo){
  primer_calculo = false;
  Jugadas(min, monto, 1);
}

console.log(min);

function Jugadas(min, monto, jugadas){// determina el valor de jugadas posibles
  if(min < monto){
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
    min = min + 0.00001;
    Jugadas(min, monto, 1);
  }
  if (jugadas_posibles < jugadas_aceptadas){
    min = min - 0.00000001;  
    Jugadas(min, monto, 1);
  }
  if(jugadas_posibles == jugadas_aceptadas ){
    determinador();
  }
}

function determinador(){
  var min_tem = min;
  while(jugadas_posibles == jugadas_aceptadas){
    min_tem = min_tem + 0.00000001;
    JugadasFin(min_tem,monto,1);    
  }
  min_tem = min_tem - 0.00000001;
  min = parseFloat(min_tem).toFixed(8);
}
