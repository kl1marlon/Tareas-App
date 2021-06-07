const Tarea = require("./tarea");
const { leerDB } = require("../helpers/guardarDB.js")

const arregloDB = leerDB()


class Tareas {

    _listado = {}

    constructor() {
        this._listado = {};
    }

    get listadoArreglo() {

        let listado = [];
        Object.keys(this._listado).forEach(key => { 
            const tarea = this._listado[key];
            listado.push(tarea)
        })
        return listado
    }

    borrarTarea(id=""){
        if (this._listado[id]){
            delete this._listado[id]
         }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(key => {

            this._listado[key.id] = key
        })

      


    }

    crearTarea(desc = "") {

        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea 

    }

    listadoCompleto(){
            let contador = 0;
            this.listadoArreglo.forEach((tarea,i)=>{
                const idx= `${i+1}`.green;
                const {descripcion, completadoEn} = tarea;
                const estado = (completadoEn)
                                ? "Completado".green
                                : "Pendiente".red;

              console.log(`${idx} ${descripcion}:: ${estado} `);
               
            })      

       
    }

    listarPendientesCompletadas(completadas = true){
        let contador = 0;
        this.listadoArreglo.forEach((tarea,i)=>{
            const idx= `${i+1}`.green;
            const {descripcion, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? "Completado".green
                            : "Pendiente".red;

            if (completadas){
                if (completadoEn){

                    contador +=1; 
                    console.log(`${contador.toString().green} ${descripcion} completada en fecha :: ${completadoEn.green} `);
                }
            }else{
                if(!completadoEn){
                    contador +=1; 
                    console.log(`${contador.toString().green} ${descripcion}:: ${estado} `);
                }
            }


           
        })      

    }

    toggleCompletadoen(ids = []) {
        ids.forEach(id=>{ 
            const tarea = this._listado[id];
            if(!tarea.completadoEn){

                tarea.completadoEn = new Date().toISOString() 
                

            }
            
        })

        this.listadoArreglo.forEach(tarea=>{
            if(!ids.includes(tarea.id))
                this._listado[tarea.id].completadoEn=null 
    
            {

            }
        })
    }


}

module.exports = Tareas;