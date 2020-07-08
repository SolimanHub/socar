clear();
var apuesta_inicial = 0.00000001;

setAmount(3, true);
Dice_CalculateAmounts(1, true); // actualiza el profit

for (var i = 1; i <= 40; i++) {
    var bet_amt = $("input[name='base_bet']").val();
    var profit = $("input[name='profit_auto']").val();

    console.log(bet_amt+"   "+profit);

    setAmount(2, true);
    Dice_CalculateAmounts(1, true); // actualiza el profit
}

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