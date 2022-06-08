export const attributesGetVehicle = (modelOne, modelTwo, idVehicle) => {
    if(idVehicle) {
        return {
            attributes: ['id', 'plate', 'status'],
            include: [{ model: modelOne, attributes: ['id', 'typeCar'] }, { model: modelTwo, attributes: ['id', 'color'] }],
            where: { id: idVehicle }
        }
    }
    return {
        attributes: ['id', 'plate', 'status'],
        include: [{ model: modelOne, attributes: ['id', 'typeCar'] }, { model: modelTwo, attributes: ['id', 'color'] }],
        where: { status: true }
    }
}
