import { NotFound } from "../controllers/exception/notFoundException.js";

export const softDelete = (model, idObject, res) => {
    model.update({ status: false }, { where: { id: idObject, status: true } })
    .then(result => {
        if (result == 0) {
            NotFound([], res, 'Vehicle Not Found');
        } else {
            res.status(204).json({ msg: 'Vehicle successfully removed' });
        }
    })
    .catch(err => console.log(err));
}