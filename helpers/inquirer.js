const inquirer = require('inquirer');

const preguntas = [
    {
        type: "list",
        name: "opcion",
        message: "Que desea hacer?",
        choices: [
            {
                value: "1",
                name: `${"1".green}.Crear Tarea`
            },
            {
                value: "2",
                name: `${"2".green}.Listar tarea`
            },
            {
                value: "3",
                name: `${"3".green}.Listar tareas Completadas`
            },
            {
                value: "4",
                name: `${"4".green}.Listar tareas pendientes`
            }, {
                value: "5",
                name: `${"5".green}.Completar tarea`
            }, {
                value: "6",
                name: `${"6".green}.Borrar tarea`
            }, {
                value: "0",
                name: `${"0".green}.Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {
    process.stdout.write("\033c")

    console.log(`${"====================".green}`)
    console.log(`${"Seleccione una opcion".white}`)
    console.log(`${"====================".green}\n`)

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion
}


const pausa = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"ENTER".green} para continuar`
        }

    ]

    console.log("\n");

    await inquirer.prompt(question);
}

const leerInput = async (message) => {

    const question = [{

        type: "input",
        name: "desc",
        message,
        validate(value) {
            if (value.length === 0) {
                return "Por favor ingrese un valor"
            }
            return true;
        }
    }]
    console.log("Para salir presione 0".green);
    const { desc } = await inquirer.prompt(question);

    


    return desc;

}

const listarBorrarTarea = async (tareas = []) => {


    const choices = tareas.map((tarea, i) => { 
        const idx = `${i + 1}.`.green

        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }
    })

    choices.unshift({
        value: "0",
        name: "0.".green + "Cancelar"
    });

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "Borrar",
            choices 
        }
    ]
    const { id } = await inquirer.prompt(preguntas)
    return id;
}

const seguroBorrar = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "answer",
            message
        }

    ]


    const { answer } = await inquirer.prompt(question);
    return answer
}

const mostrarListadoCheckList = async (tareas = []) => {


    const choices = tareas.map((tarea, i) => { 
        const idx = `${i + 1}.`.green

        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false  
        }
    })

   

    const pregunta = [
        {
            type: "checkbox",
            name: "ids",
            message: "Seleccione",
            choices 
        }
    ]
    const { ids } = await inquirer.prompt(pregunta)
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarBorrarTarea,
    seguroBorrar,
    mostrarListadoCheckList
}