export const updateModel = (model, updateObject, res, conditionalParameter, nameTable) => {
    model.update( updateObject, { where:  conditionalParameter })
        .then(result => {
            res.json({ msg: `${nameTable} successfully upgraded` });
        })
        .catch(err => console.log(err));
}