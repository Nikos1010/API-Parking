class Generics {
    constructor(entity) {
        this.entity = entity;
    }
    async postGeneric(parameters) {
        this.entity.create(parameters)
    }
}

export default Generics;