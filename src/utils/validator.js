
const validateSchema = (schema) => async (req, res, next) => {
	const body = req?.body;


	try {
		await schema.validate(body, { context: req });
		req.cleanData = body;

		next();
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: error.message });
	}
};

export default validateSchema;