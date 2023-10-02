require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listadoLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
require('colors')

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                //buscar el lugar
                const lugares = await busquedas.ciudad(termino)
                const idSeleccionado = await listadoLugares(lugares)

                //Seleccionar el lugar
                const lugarSel = lugares.find( l => l.id === idSeleccionado)
                console.log(lugarSel);
                // Clima

                // mostrar resultados
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng: ', lugarSel.lng);
                console.log('Temperatura: ');
                console.log('Minima: ');
                console.log('Maxima: ');


            break;

            case 2:
                console.log('historial');
            break;

            case 0:
                console.log('salir');
            break;    
        }

        await pausa();

    } while (opt != 0);
}

main()