require("colors");
const Tareas = require('./models/tareas.js')
const { guardarDB, leerDB } = require('./helpers/guardarDB.js')
const { inquirerMenu, 
        pausa,
        leerInput,
        listarBorrarTarea, 
        seguroBorrar,
        mostrarListadoCheckList } = require('./helpers/inquirer')


const main = async () => {

    let opt = "";

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }

    
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                const desc = await leerInput('Descripcion:')
                if(desc!=0){
                tareas.crearTarea(desc);
            }
                break;

            case "2":
                
                tareas.listadoCompleto()
                break;
            case '3': 
                    tareas.listarPendientesCompletadas(true)
            break;
            case '4': 
                tareas.listarPendientesCompletadas(false)
            break;
            
            case '5': 
                const ids=await  mostrarListadoCheckList(tareas.listadoArreglo)
                tareas.toggleCompletadoen(ids)
                break;
            
            case '6': 
               const id = await listarBorrarTarea(tareas.listadoArreglo)
               if(id!=="0"){
                const answer = await seguroBorrar()
                
                if(answer){tareas.borrarTarea(id)
                     console.log("Tarea Borrada");
               }
             
            }
               
                break;

        }


        guardarDB(tareas.listadoArreglo)

        await pausa();

    } while (opt !== "0")


}

main();

