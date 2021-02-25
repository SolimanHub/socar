            /*
            actualizado, primer apuesta se realiza con un minimo de probabilidad de exito
            */

            //console.time('tiempo_en_ejecucion');

            var jugadas_aceptadas=23;
            var limite=30000; //cantidad de victorias maxima
            var apuesta_inicial = 0.00001000; // 0.00000100 000004

            var tasa_refresco=10; //actualiza el log de datos cada n jugadas
            var victorias = 0; //contador de victorias
            var mayor_derrota=0; //registra el numero mayor de derrotas antes de una victoria
            var jhg=1; // jugadas antes de ganar.
            var jhg_arr = [];
            var jhg_arr_rep = [];
            var tamanio=0;
            var makeidd = makid();
            var winning =0;
            var porcentaje_variable1 = "2.02128";
            var porcentaje_variable2 = "47";
            /*
                3.06452 - 31
                2.02128 - 47
            */
            //
            // Variables para calcular bet
            var balance = 0; //almacena el valor del balance
            var jugadas_posibles =0;
            var primer_ejecucion = true;
            ///////////////////////////
            $("input[name='max_rolls']").val(10000000);
            clear();

            Roll_HiLo_Dice_a_mod();

            function Roll_HiLo_Dice_a_mod() {
                var bet_amt = monto(3, apuesta_inicial);
                var count = 0;
                var prediction = "1";

                $("input[name='hidden_current_base']").val($("input[name='base_bet']").val());
                $("input[name='rolls_to_play']").val($("input[name='max_rolls']").val());
                $("button[name='auto_roll']").html('Stop Betting').attr('onclick', 'Stop_HiLO_Dice_a()');

                function performBet_mod() {
                    if (primer_ejecucion && victorias ==1){
                        primer_ejecucion = false;
                        //Jugadas(apuesta_inicial, balance, 1);
                        apuesta_inicial = Apuesta(apuesta_inicial, balance, jugadas_aceptadas); 
                    }
                    var client_seed = makeidd;
                    //var profit = $("input[name='profit_auto']").val();
                    //var payout = $("input[name='payout_auto']").val();
                    //var winning_chance = $("input[name='winning_chance_auto']").val();
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
                        profit: Pro(bet_amt),
                        payout: Payout(jhg),
                        winning_chance: winning,
                        prediction: prediction

                    }, function (obj) {

                        $("#alertMessageRobot").html("(" + count + ") " + obj.message);

                        if (obj.error == 1) {
                            $("input[name='rolls_to_play']").val(0);
                            $('#roll-number-auto').html("XXXX");
                            parar();
                        } else {
                            if (obj.win == 1) { // si gana                                
                                $('#roll-number-auto').addClass('green').removeClass('black');
                                bet_amt = monto(3, bet_amt); // 3 retorna al valor minimo
                                victorias++;
                                balance = parseFloat(obj.balance);                                
                                if (victorias%100==0) {
                                    apuesta_inicial = apuesta_inicial -  0.00000100;
                                    //Jugadas(apuesta_inicial, balance, 1); 
                                    apuesta_inicial = Apuesta(apuesta_inicial, balance, jugadas_aceptadas); 
                                }
                                if(victorias==limite){
                                    /*se dentiene si alcanza el limite
                                    o si las jugadas antes de ganar igualan las derrotas permitidas, dado que
                                    proximamente las jhg superaran ese limite y se generaran perdidas.
                                    */                                
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
                            } else { // si pierde
                                if (jhg == 1) {
                                    bet_amt = monto(3, bet_amt);
                                } else {
                                    bet_amt = monto(2, bet_amt);
                                }
                                jhg++;
                                if(jhg > mayor_derrota){
                                    mayor_derrota=jhg;
                                }
                                $('#roll-number-auto').addClass('black').removeClass('green');
                            }
                            //$('#roll-number-auto').html(obj.roll);

                            if(victorias==limite){
                                $('#roll-number-auto').html("¡LISTO!");
                            }else{
                                $('#roll-number-auto').html(jhg+">#"+mayor_derrota+"("+victorias+")");
                            }
                            if (count%tasa_refresco==0) {
                                imprimir();
                            }
                            $("h4[class='text-center tx-roboto tx-semibold']").html("J"+count+"(V"+victorias+")>#d"+mayor_derrota);

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
                            console.log("mayor # derrotas "+mayor_derrota);
                                Stop_HiLO_Dice_a();
                            }
                        }
                    });
                    count++;
                }
                performBet_mod();
            } // fin funcion roll_hilo_dice

             function parar() {
                imprimir();
                //console.timeEnd("tiempo_en_ejecucion");
                Stop_HiLO_Dice_a();
            }

            function monto(id, valor_actual) {
                if (id == 3) {
                    return apuesta_inicial;
                } else {
                    return valor_actual * 2;
                }
            }

            function imprimir() {
                console.clear();
                var nJ =0;
                var orden =0;
                while(orden<tamanio){
                    orden++;
                    for(var i=0;i<tamanio;i++){
                        var temp=0;
                        var j=i+1;
                        if(i<tamanio-1){
                            if(jhg_arr[j]<jhg_arr[i]){
                                temp=jhg_arr[i];
                                jhg_arr[i]=jhg_arr[j];
                                jhg_arr[j]=temp;

                                temp=jhg_arr_rep[i];
                                jhg_arr_rep[i]=jhg_arr_rep[j];
                                jhg_arr_rep[j]=temp;                    
                            }
                        }
                    }
                }
                for (var i = 0; i < tamanio; i++) {
                    if (jhg_arr[i] < 10) {
                        console.log('0'+jhg_arr[i]+' -- '+jhg_arr_rep[i]);
                    } else {
                        console.log(jhg_arr[i]+' -- '+jhg_arr_rep[i]);
                    }
                    nJ = nJ+jhg_arr_rep[i];
                }
                console.log(apuesta_inicial);
            }

            function Payout(arg) { //arg es jugadas antes de ganar
                var pay =0;
                switch (arg) {
                  case 1:
                    pay = "95.00000"; //1
                    winning = "1.00"
                    break;
                  case 2:
                    pay = "95.00000"; //1              
                    //pay = "3.06452"; //31                
                    winning = "1.00"
                    break;
                case jugadas_aceptadas-1:
                    pay = "1.72727";        //55 
                    winning = "55.00"       
                    break;
                case jugadas_aceptadas:
                    pay = "1.58333";               //55 
                    winning = "60.00"
                    break;
                  default:
                    pay=porcentaje_variable1; //47
                    winning = porcentaje_variable2;
                    break;
                }           
                return pay;
             } 

             function Pro(bet_amt) {
                var cal = Payout(jhg) * 100;
                var cal = cal / 100 * bet_amt;
                var cal = parseInt((cal * 100000000)) / 100000000;
                var cal = cal - bet_amt;

                return parseFloat(cal).toFixed(8);
             }

             function makid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 19; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
            }

            function Apuesta(apuesta_inicial, balance, jugadas){// determina el valor de jugadas posibles
                var controlador = 1;
                for(let i = 0; i<jugadas-1; i++){
                  controlador = controlador * 2;
                }
                while(apuesta_inicial*2*controlador + apuesta_inicial < balance){
                  apuesta_inicial = apuesta_inicial + 0.00000001;
                }
                apuesta_inicial = apuesta_inicial - 0.00000001;
                apuesta_inicial = parseFloat(apuesta_inicial).toFixed(8);
                return apuesta_inicial;
            }