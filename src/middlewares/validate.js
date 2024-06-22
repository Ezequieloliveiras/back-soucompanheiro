const validation = (schema, type) => {
	return (req, res, next) => {
		const { error } = schema.validate(req[type], {
			abortEarly: false,
		});

		if (!error) {
			next();
		} else {
			res.status(400).send(error.details.map((d) => d.message));
		}
	};
};

const validationBody = (schema) => {
	return validation(schema, 'body');
};

const validationParams = (schema) => {
	return validation(schema, 'params');
};

const validationQuery = (schema) => {
	return validation(schema, 'query');
};

function validationHeader(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, app-key, app-token");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	if (req.method === "OPTIONS") {
		res.sendStatus(200); // Responde ao preflight request com sucesso
	} else {
		next();
	}
}

module.exports = { validationBody, validationParams, validationQuery, validationHeader };
