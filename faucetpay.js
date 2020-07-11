/*
poner payout en 2
*/

console.time('tiempo_en_ejecucion');

var derrotas_permitidas=31;
var limite=1; //cantidad de victorias maxima
var apuesta_inicial = 0.00000001;

var tasa_refresco=50;
var victorias = 0; //contador de victorias
var mayor_derrota=0; //registra el numero mayor de derrotas antes de una victoria
var jhg=1; // jugadas antes de ganar.
var jhg_arr = [];
var jhg_arr_rep = [];
var tamanio=0;

var bloqueo = 6;
clear(); 

Roll_HiLo_Dice_a_mod();

function Roll_HiLo_Dice_a_mod() {
    monto(3);
    var count = 0;
    $("input[name='hidden_current_base']").val($("input[name='base_bet']").val());
    $("input[name='rolls_to_play']").val($("input[name='max_rolls']").val());
    $("button[name='auto_roll']").html('Stop Betting').attr('onclick', 'Stop_HiLO_Dice_a()');

    function performBet_mod() {
        var prediction = "1";
        var client_seed = $("input[name='client_seed']").val();
        var bet_amt = $("input[name='base_bet']").val();
        var profit = $("input[name='profit_auto']").val();
        var payout = $("input[name='payout_auto']").val();
        var winning_chance = $("input[name='winning_chance_auto']").val();
        var url = "https://faucetpay.io/dice/play";
        $("button[name='roll_hi']").attr('disabled', 'disabled');
        $("button[name='roll_lo']").attr('disabled', 'disabled');

        var on_win = $("input[name='onWinRadio']:checked").val();
        var on_lose = $("input[name='onLoseRadio']:checked").val();

        $.post(url, {

            play: true,
            client_seed: client_seed,
            coin: window.coin_selected,
            bet_amt: bet_amt,
            profit: profit,
            payout: "2.99968",
            //payout: payout,
            winning_chance: "31.67",
            //winning_chance: winning_chance,
            prediction: prediction

        }, function (obj) {

            $("#alertMessageRobot").html("(" + count + ") " + obj.message);

            if (obj.error == 1) {
                $("input[name='rolls_to_play']").val(0);
                $('#roll-number-auto').html("XXXX");
                parar();
            } else {
                if (obj.win == 1) {
                    $('#roll-number-auto').addClass('green').removeClass('red');
                    monto(3); // 3 retorna al valor minimo
                    victorias++;
                    if(victorias==limite || jhg==derrotas_permitidas){                     
                        /*se dentiene si alcanza el limite
                        o si las jugadas antes de ganar igualan las derrotas permitidas, dado que
                        proximamente las jhg superaran ese limite y se generaran perdidas.
                        */
                        if (jhg == derrotas_permitidas) {
                            console.log('final de emergencia');
                        }else{
                            console.log('final esperado');
                        }
                        parar();
                    }
                    if(jhg_arr.indexOf(jhg) == -1){
                        jhg_arr.push(jhg); // add a new element (r) to jhg_arr
                        jhg_arr_rep.push(1);
                        tamanio++;
                    }else{
                        jhg_arr_rep[jhg_arr.indexOf(jhg)] = jhg_arr_rep[jhg_arr.indexOf(jhg)]+1;
                    }
                    jhg=1;
                } else {
                    if (jhg<= bloqueo) {
                        // aqui no pasa nada, se mira feo pero funciona
                    } else {
                        if(jhg>derrotas_permitidas){
                            //console.log("numero critico de derrotas alcanzado, retorno al valor seguro");
                            monto(1);
                        }else{
                            monto(2);
                        }
                    }
                    jhg++;
                    if(jhg > mayor_derrota){
                        mayor_derrota=jhg;
                    }                    
                    $('#roll-number-auto').addClass('red').removeClass('green');                    
                }
                //$('#roll-number-auto').html(obj.roll);

                if(victorias==limite){
                    $('#roll-number-auto').html("¡LISTO!");                    
                }else{
                    $('#roll-number-auto').html(count+">#"+mayor_derrota+"("+victorias+")");
                }
                if (jhg%tasa_refresco==0) {
                    imprimir();
                }
                $("h4[class='text-center tx-roboto tx-semibold']").html("J"+count+"V"+victorias+">#d"+mayor_derrota);

                $("input[name='server_seed_hash']").val(obj.server_seed_hash);

                $("#balance").html(obj.balance);

                $("button[name='roll_hi']").removeAttr('disabled');
                $("button[name='roll_lo']").removeAttr('disabled');

                randClientSeed();

                if (count < $("input[name='rolls_to_play']").val()) {
                    setTimeout(function () {
                        performBet_mod();
                    }, 75);
                } else {
                    //console.timeEnd("t1");
                console.log("mayor # derrotas "+mayor_derrota);

                    Stop_HiLO_Dice_a();
                }
            }
        });
        count++;
    }
    performBet_mod();
} // fin funcion roll_hilo_dice 

function Dice_CalculateAmounts(id, auto = false) {

    if (auto === true) {

        var bet_amt = $("input[name='base_bet']").val();
        var payout = $("input[name='payout_auto']").val();
        var winning_chance = $("input[name='winning_chance_auto']").val();

    } else {

        var bet_amt = $("input[name='bet_amount']").val();
        var payout = $("input[name='payout_manual']").val();
        var winning_chance = $("input[name='winning_chance_manual']").val();

    }

    if (id === 1) {

        if (bet_amt < 0.00000001) {
            setAmount(3, auto);
            Dice_CalculateAmounts(1, auto);
            bet_amt = 0.00000001;
        }

        if (isNaN(bet_amt) === false) {

            var cal = payout * 100;
            var cal = cal / 100 * bet_amt;
            var cal = parseInt((cal * 100000000)) / 100000000;
            var cal = cal - bet_amt;

            if (auto === true) {
                $("#profit_auto").val(parseFloat(cal).toFixed(8));
            } else {
                $("#profit_manual").html(parseFloat(cal).toFixed(8));
            }

        } else {

            if (auto === true) {

                $("input[name='base_amount']").val((0).toFixed(8));
                $("#profit_auto").val(parseFloat(0).toFixed(8));

            } else {

                $("input[name='bet_amount']").val((0).toFixed(8));
                $("#profit_manual").html(parseFloat(0).toFixed(8));

            }

        }

    } else if (id === 3) {

        if (isNaN(payout) === false) {

            var floatVar = parseFloat(payout);
            var cal_pre = (9500 / floatVar);
            var cal = (cal_pre / 100).toFixed(2);

            if (auto === true) {
                $("input[name='winning_chance_auto']").val(cal);
            } else {
                $("input[name='winning_chance_manual']").val(cal);
            }

        } else {

            if (auto === true) {

                $("input[name='payout_auto']").val('1.01');
                $("input[name='winning_chance_auto']").val('94.00');

            } else {

                $("input[name='payout_manual']").val('1.01');
                $("input[name='winning_chance_manual']").val('94.00');

            }

        }

        Dice_CalculateAmounts(1, auto);

    } else if (id === 4) {

        if (isNaN(winning_chance) === false) {

            var winning_chance = parseFloat(winning_chance).toFixed(2);
            var cal = 95 / winning_chance;

            if (auto === true) {

                $("input[name='winning_chance_auto']").val(winning_chance);
                $("input[name='payout_auto']").val((cal).toFixed(5));

            } else {

                $("input[name='winning_chance_manual']").val(winning_chance);
                $("input[name='payout_manual']").val((cal).toFixed(5));

            }

        } else {

            if (auto === true) {

                $("input[name='payout_auto']").val('1.01064');
                $("input[name='winning_chance_auto']").val('94.00');

            } else {

                $("input[name='payout_manual']").val('1.01064');
                $("input[name='winning_chance_manual']").val('94.00');

            }

        }

        Dice_CalculateAmounts(1, auto);

    } else if (id === 5) {

        if (payout < 1.01064) {

            if (auto === true) {
                $("input[name='payout_auto']").val('1.01064');
            } else {
                $("input[name='payout_manual']").val('1.01064');
            }

        }

        if (payout > 9500.00) {

            if (auto === true) {
                $("input[name='payout_auto']").val('9500');
            } else {
                $("input[name='payout_manual']").val('9500');
            }

        }

        if (winning_chance < 0.01) {

            if (auto === true) {
                $("input[name='winning_chance_auto']").val('0.01');
            } else {
                $("input[name='winning_chance_manual']").val('0.01');
            }

        }

        if (winning_chance > 94.00) {

            if (auto === true) {
                $("input[name='winning_chance_auto']").val('94.00');
            } else {
                $("input[name='winning_chance_manual']").val('94.00');
            }

        }

        Dice_CalculateAmounts(1, auto);
        Dice_CalculateAmounts(4, auto);
        Dice_CalculateAmounts(6, auto);

    } else if (id === 6) {

        winning_chance = parseFloat(winning_chance).toFixed(2);

        var cal = winning_chance;
        cal = cal * 100;

        if (auto === true) {

            $("input[name='payout']").val(parseFloat(payout).toFixed(5));
            $("#high_auto").html(Math.round(9999 - cal));
            $("#low_auto").html(Math.round(cal));

        } else {

            $("input[name='payout']").val(parseFloat(payout).toFixed(5));
            $("#high_manual").html(Math.round(9999 - cal));
            $("#low_manual").html(Math.round(cal));
        }

    }

} //fin de la funcion dice calculations

function setAmount(id, auto = false) {

    let selector;

    if (auto === true) {
        selector = "input[name='base_bet']";
    } else {
        selector = "input[name='bet_amount']";
    }

    if (id === 1) {//divicion

        var bet_amt = $(selector).val();
        var burp = bet_amt / 2;

        if (isNaN(burp) === false) {

            $(selector).val(burp.toFixed(8));

        } else {

            $(selector).val((0).toFixed(8));

        }

    } else if (id === 2) {//doble

        var bet_amt = $(selector).val();
        var burp = bet_amt * 2;

        if (isNaN(burp) === false) {

            $(selector).val(burp.toFixed(8));

        } else {

            $(selector).val((0).toFixed(8));

        }

    } else if (id === 3) {//minimo
        //$(selector).val((0.00000001).toFixed(8));
        $(selector).val((apuesta_inicial).toFixed(8));
    } else {
        var balance = $("#balance").html();
        $(selector).val(parseFloat(balance).toFixed(8));
    }

    Dice_CalculateAmounts(1);

}
 
function parar() {    
    imprimir();
    console.timeEnd("tiempo_en_ejecucion");
    Stop_HiLO_Dice_a();
}

function monto(id) {
    setAmount(id,true); // apuesta minima
    Dice_CalculateAmounts(1, true); // actualiza el profit    
}

function imprimir() {
    console.clear();
    var nJ =0;
    for (var i = 0; i < tamanio; i++) {
        if (jhg_arr[i] < 10) {
            console.log('0'+jhg_arr[i]+' -- '+jhg_arr_rep[i]);
        } else {
            console.log(jhg_arr[i]+' -- '+jhg_arr_rep[i]);            
        }
        nJ = nJ+jhg_arr_rep[i];
    }
    console.log('numero de jugadas '+nJ);
}
