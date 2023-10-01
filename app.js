require('dotenv').config()

const { leerInput, inquirerMenu, pausa } = require('./helpers/inquirer');
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
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar)
                //buscar el lugar

                //Seleccionar el lugar

                // Clima

                // mostrar resultados
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('Ciudad: ');
                console.log('Lat: ');
                console.log('Lng: ');
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

    await pausa()
}

main()