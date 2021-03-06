// Made by: Crypto Inc. Technology

// Nota
// Agregar intercambiador entre un wc alto y uno medio
//

var maximum_rolls = 10; // Maximum Number of Rolls
var jugadas_aceptadas = 19;

var current_roll = 0; // Current Roll Number (0)            Contador de jugadas
var net_profit = 0;
var client_seed = generateRandomClientSeed();
var prediction = "1";
var bet_amount = 0.00001000;
var winning_chance = "45.00";

var victorias = 0;
var primer_ejecucion = true;
var jhg = 1;
var mayor_derrota = 0;
var min_de_cripto = 0.00001000;

$("#console-log").html("<b>Crypto Inc Start Script</b>");

function main() {
    var payout = getPayoutFromWinningChance(winning_chance);
    var profit = getProfit(bet_amount, payout);

    if (current_roll === 0) {
        resetGraph();
    }
    
    console.log("datos de mierda enviados: " + bet_amount + ' ' + winning_chance);
    placeBet(bet_amount, profit, payout, winning_chance, client_seed, prediction, function (resp) {

        if (resp !== false) {

            current_roll++;
            if (current_roll < maximum_rolls) {
                main();
            } else {
                stopScript();
                main = null;
            }

            if (resp.win === 1) { // si gana
                net_profit = math.add(net_profit, profit).toFixed(8);
                llgs = "WIN";
                plotGraphData(window.chart, current_roll, net_profit * 100000000);
                $("#console-log").append("<br>" + current_roll + ' || ' + llgs + ' || ' + bet_amount + ' || ' + winning_chance).scrollTop($("#console-log")[0].scrollHeight);
                victorias++; 
                if (victorias%100 == 0) {
                    bet_amount = Jugadas(bet_amount, resp.balance, jugadas_aceptadas); 
                }
                jhg=1;
                bet_amount = monto(3, bet_amount);
                if (primer_ejecucion){
                    primer_ejecucion = false;
                    bet_amount = Jugadas(bet_amount, resp.balance, jugadas_aceptadas);
                }
            }

            if (resp.win === 0) { // si pierde
                net_profit = parseFloat(net_profit - bet_amount).toFixed(8);
                llgs = "LOSE";
                plotGraphData(window.chart, current_roll, net_profit * 100000000);
                $("#console-log").append("<br>" + current_roll + ' || ' + llgs + ' || ' + bet_amount + ' || ' + winning_chance).scrollTop($("#console-log")[0].scrollHeight);
                if(jhg > mayor_derrota){
                    mayor_derrota=jhg;
                }
                jhg++;
                bet_amount = monto(2, bet_amount);
            }
        }

    });

}

function Jugadas(bet_amount, balance, jugadas){// determina el valor de jugadas posibles
    var controlador = 1;
    for(let i = 0; i<jugadas-1; i++){
      controlador = controlador * 2;
    }
    while(bet_amount*2*controlador + bet_amount < balance){
      bet_amount = bet_amount + 0.00000001;
    }
    bet_amount = bet_amount - 0.00000001;
    min_de_cripto = parseFloat(bet_amount).toFixed(8);
    return parseFloat(bet_amount).toFixed(8);
}

function monto(id, valor_creciente) {
    if (id == 3) {
        return min_de_cripto;
    } else {
        return valor_creciente * 2;
    }
}

function wc(j){
  if(j < 2){
    winning_chance = "45.00";
  }else{
    winning_chance = "47.00";
  }
}
