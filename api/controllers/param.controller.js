export const createParam = async (req, res, next) => {
    const { name, value } = req.body;
    /* const param = await Param.create({ name, value }); */
    res.status(201).json(param);
}