// Made by: Crypto Inc. Technology

var current_roll = 0; // Current Roll Number (0)            Contador de jugadas
var maximum_rolls = 2; // Maximum Number of Rolls
var net_profit = 0;
var client_seed = generateRandomClientSeed();
var prediction = "1";
var bet_amount = "0.00001000";

$("#console-log").html("<b>Crypto Inc Start Script</b>");

function main() {

    //var basebet = parseFloat(mybet).toFixed(8);
    //var ggs = Math.pow(2, ops);
   //var baset = parseFloat(basebet * ggs).toFixed(8);
    //var bet_amount = (baset).toString();
    //var winning_chance = validateWinningChance(Math.floor(Math.random() * (wcmax - wcmin + 1)) + wcmin); // valor ramdom entre 10 y 70
    var winning_chance = "47.00";
    var payout = getPayoutFromWinningChance(winning_chance);
    var profit = getProfit(bet_amount, payout);
    //var prediction = Math.floor((Math.random() * 1));

    if (current_roll === 0) {
        resetGraph();
    }

    placeBet(bet_amount, profit, payout, winning_chance, client_seed, prediction, function (resp) {

        if (resp !== false) {

            current_roll++;
            if (current_roll < maximum_rolls) {
                main();
            } else {
                main = null;
            }

            if (resp.win === 1) {
                net_profit = math.add(net_profit, profit).toFixed(8);
                llgs = "WIN";
                plotGraphData(window.chart, current_roll, net_profit * 100000000);
                $("#console-log").append("<br>" + "Status : " + llgs + " || Profit : " + net_profit + " || Balance Now : " + resp.balance + " || WC: " + winning_chance).scrollTop($("#console-log")[0].scrollHeight);
                stopScript();
            }

            if (resp.win === 0) {
                net_profit = parseFloat(net_profit - bet_amount).toFixed(8);
                llgs = "LOSE";
                plotGraphData(window.chart, current_roll, net_profit * 100000000);
                $("#console-log").append("<br>" + "Status : " + llgs + " || Profit : " + net_profit + " || Balance Now : " + resp.balance + " || WC: " + winning_chance).scrollTop($("#console-log")[0].scrollHeight);
            }

        }

    });

}