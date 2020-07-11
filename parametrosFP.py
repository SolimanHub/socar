import sys

'''
python nombre_del_archivo.py <apuesta_inicial> <monto_disponible>

este codigo devolvera el numero de jugadas maximo que se podra realizar
'''

def Calculo(monto,inicio,jugadas):
    if monto>inicio:
        monto=monto-inicio
        inicio=inicio*2
        jugadas=jugadas+1
        Calculo(monto,inicio,jugadas)
    else:
        jugadas=jugadas-1
        print(f'jugadas {jugadas}')

inicio = sys.argv[1]
monto = sys.argv[2]


Calculo(float(monto), float(inicio), 1)
