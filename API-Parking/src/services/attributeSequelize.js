export const attributesGetVehicles = (modelOne, modelTwo) => {
    return {
        attributes: ['id', 'plate', 'status'],
        include: [{ model: modelOne, attributes: ['id', 'typeCar'] }, { model: modelTwo, attributes: ['id', 'color'] }],
        where: { status: true }
    }
}

export const attributesGetVehicle = (modelOne, modelTwo, idVehicle) => {
    return {
        attributes: ['id', 'plate', 'status'],
        include: [{ model: modelOne, attributes: ['id', 'typeCar'] }, { model: modelTwo, attributes: ['id', 'color'] }],
        where: { id: idVehicle }
    }
}

export const attributesGetColorOrType = (attributes, idModel) => {
    if(idModel) {
        return {
            attributes: attributes,
            where: { id: idModel }
        }
    }
    return {
        attributes: attributes
    }
}