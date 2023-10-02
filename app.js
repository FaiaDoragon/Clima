require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listadoLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
require('colors')

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    
    do {
        console.clear()
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
                if ( idSeleccionado === '0') continue;

                // Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre );

                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng)
                // mostrar resultados
                console.clear();
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre.green);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng: ', lugarSel.lng);
                console.log('Temperatura: ', clima.temp);
                console.log('Minima: ', clima.min);
                console.log('Maxima: ' ,clima.max);
                console.log('Como esta el clima: ', clima.desc.green);
            break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${ i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });

            break;

            case 0:
                console.log('salir');
            break;    
        }

        await pausa();

    } while (opt != 0);
}

main()