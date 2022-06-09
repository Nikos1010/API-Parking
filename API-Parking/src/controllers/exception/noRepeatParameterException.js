import fs from 'fs';

export const noRepeatParameter = (value, attribute) => {
    /*
    Que no se repita los resultados, leer el json y extraer solo 
    la parte de color y type, despues comparar el post con el JSON con 
    metodo has
    */
    const data = fs.readFileSync('./src/database/vehicleData.json');
    const parameterJSON = JSON.parse(data);
    for (const i in parameterJSON) {
        for (const j in parameterJSON[i]) {
            if (parameterJSON[i].hasOwnProperty(attribute)) {
                const element = parameterJSON[i][j];
                if(element == value){
                    return true;
                }
            }
        }
    }
}