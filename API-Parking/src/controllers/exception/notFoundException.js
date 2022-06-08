export const NotFound = (object, res, msg) => {
    if (object.length > 0) {
        res.json(object);
    } else {
        res.status(404).json({ msg: msg });
    }
}