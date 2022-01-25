require('dotenv').config()
const {leerInput, inquirerMenu, pausa, listarLugares}=require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main=async()=>{
    let opt
    const busquedas=new Busquedas()
    do{
        opt= await inquirerMenu()
        switch (opt) {
            case 1:
                const termino= await leerInput('Ciudad: '.blue)
                const lugares=await busquedas.ciudad(termino)
                const idSeleccionado= await listarLugares(lugares)
                if(idSeleccionado==='0')continue

                const lugarSeleccionado= lugares.find(l=>l.id===idSeleccionado)
                busquedas.agregarHistorial(lugarSeleccionado.nombre)

                const clima= await busquedas.climaLugar(lugarSeleccionado.lat,lugarSeleccionado.lng)
            
                console.clear()
                console.log('\n Información de la ciudad\n'.green)
                console.log('Ciudad: ',lugarSeleccionado.nombre)
                console.log('Latitud: ',lugarSeleccionado.lat)
                console.log('Longitud: ',lugarSeleccionado.lng)
                console.log(`Temperatura: ${clima.temp}ºC`)
                console.log(`Mínima: ${clima.min}ºC`)
                console.log(`Máxima: ${clima.max}ºC`)
                console.log('Cómo está el clima: ',clima.desc.green)
                break;
        
            case 2:
               busquedas.historialCaptalizado.forEach((lugar,i)=>{
                   const index=`${i+1}`.green
                   console.log(`${index}.${lugar}`)
               })
                break;
        }
        if(opt!==0) await pausa()
    } while(opt!==0);

}

main()