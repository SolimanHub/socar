import sys

'''
python nombre_del_archivo.py <apuesta_inicial> <monto_disponible>

este codigo devolvera el numero de jugadas maximo que se podra realizar
'''

def CalculoJugadas(monto,inicio,jugadas):
    if monto>inicio:
        monto=monto-inicio
        inicio=inicio*2
        jugadas=jugadas+1
        CalculoJugadas(monto,inicio,jugadas)
    else:
        jugadas=jugadas-1
        print(f'jugadas {jugadas}')
        return(jugadas)

def CalculoInicio(monto,jugadas,inicio):
    CalculoJugadas(monto,inicio,1)



inicio = sys.argv[1]
monto = sys.argv[2]

jugadasCalculadas = CalculoJugadas(float(monto),float(inicio),1)

print(f'Jugadas format {jugadasCalculadas}')
