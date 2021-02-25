// Made by: Crypto Inc. Technology

//Nota
//No esta funcionando de la manera esperada la primer victoria 

var maximum_rolls = 10; // Maximum Number of Rolls
var jugadas_aceptadas = 23;

var current_roll = 0; // Current Roll Number (0)            Contador de jugadas
var net_profit = 0;
var client_seed = generateRandomClientSeed();
var prediction = "1";
var bet_amount = 0.00001000;
var winning_chance = "47.00";

var victorias = 0;
var primer_ejecucion = true;
var jhg = 1;
var mayor_derrota = 0;
var min_de_cripto = 0.00001000;

$("#console-log").html("<b>Crypto Inc Start Script</b>");

function main() {
    console.log("se repite");
    var payout = getPayoutFromWinningChance(winning_chance);
    var profit = getProfit(bet_amount, payout);

    if (current_roll === 0) {
        resetGraph();
    }

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
                victorias++; 
                if (primer_ejecucion && victorias ==1){
                    console.log("primera victoria");
                    primer_ejecucion = false;
                    bet_amount = Jugadas(bet_amount, resp.balance, jugadas_aceptadas);
                }
                bet_amount = monto(3, bet_amount);
                net_profit = math.add(net_profit, profit).toFixed(8);
                llgs = "WIN";
                plotGraphData(window.chart, current_roll, net_profit * 100000000);
                $("#console-log").append("<br>" + "Status : " + llgs + " || Max_derr : " + mayor_derrota + " || Balance Now : " + resp.balance + " || WC: " + winning_chance).scrollTop($("#console-log")[0].scrollHeight);
                if (victorias%100 == 0) {
                    bet_amount = Jugadas(bet_amount, resp.balance, jugadas_aceptadas); 
                }
                jhg=1;
                //stopScript();
            }

            if (resp.win === 0) { // si pierde
                bet_amount = monto(2, bet_amount);
                net_profit = parseFloat(net_profit - bet_amount).toFixed(8);
                llgs = "LOSE";
                plotGraphData(window.chart, current_roll, net_profit * 100000000);
                if(jhg > mayor_derrota){
                    mayor_derrota=jhg;
                }
                $("#console-log").append("<br>" + "Status : " + llgs + " || Max_derr : " + mayor_derrota + " || Balance Now : " + resp.balance + " || WC: " + winning_chance).scrollTop($("#console-log")[0].scrollHeight);
                jhg++;
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