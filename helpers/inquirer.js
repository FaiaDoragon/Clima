const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: 'Que decea hacer?',
        choices : [
            {
                value : 1, 
                name : `${'1.'.green} Buscar Ciudad`
            },
            {
                value : 2, 
                name : `${'2.'.green} Historial`
            },
            {
                value : 0, 
                name : `${'3.'.green} Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {

    //console.clear();
    console.log('======================='.green);
    console.log('Seleccione una opcion'.white);
    console.log('=======================\n'.green);

    const { option } = await inquirer.prompt(preguntas)

    return option;
}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green}`
        }
    ];

    console.log('\n');
    
    await inquirer.prompt(question)
}

const leerInput = async(message) =>{

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

// lista las tareas para escojer cual quieres borrar
const listadoTareasBorrar = async( tareas = []) => {

    const choices = tareas.map ( (tarea, i) => {

        const idx = `${ i + 1 }.`.green
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id;
}

//muestra el mensaje de confirmacion despues de seleccionar una opcion
const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok
}
// muestra el listado de todas las tareas como un checklist para luego cambiar su estado
// entre completadas y pendientes
const mostrarListadoChecklist = async( tareas = []) => {

    const choices = tareas.map ( (tarea, i) => {

        const idx = `${ i + 1 }.`.green
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);

    return ids;
}

module.exports ={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}