const isUndefined = (value: any) => value === undefined;

const isNull = (value: any) => value === null;

const isBoolean = (value: any) => typeof value === "boolean";

const isObject = (value: any) => value === Object(value);

const isArray = (value: any) => Array.isArray(value);

const isDate = (value: any) => value instanceof Date;

const isBlob = (value: any) =>
	isObject(value) &&
	typeof value.size === "number" &&
	typeof value.type === "string" &&
	typeof value.slice === "function";

const isFile = (value: any) =>
	isBlob(value) &&
	typeof value.name === "string" &&
	(isObject(value.lastModifiedDate) || typeof value.lastModified === "number");

const initConfig = (value: any) => (isUndefined(value) ? false : value);

const buildFormData = (
	data: any,
	config?: HELPERS.IBuildFormData,
	existingFormData?: FormData,
	key?: any,
) => {
	config = config || {};
	existingFormData = existingFormData || new FormData();

	config.indexes = initConfig(config.indexes);
	config.nullsAsUndefineds = initConfig(config.nullsAsUndefineds);
	config.booleansAsIntegers = initConfig(config.booleansAsIntegers);
	config.allowEmptyArrays = initConfig(config.allowEmptyArrays);
	config.noFilesWithArrayNotation = initConfig(config.noFilesWithArrayNotation);
	config.dotsForObjectNotation = initConfig(config.dotsForObjectNotation);

	if (isUndefined(data)) {
		return existingFormData;
	} else if (isNull(data)) {
		if (!config?.nullsAsUndefineds) {
			existingFormData.append(key, "");
		}
	} else if (isBoolean(data)) {
		if (config?.booleansAsIntegers) {
			existingFormData.append(key, data ? "1" : "0");
		} else {
			existingFormData.append(key, data);
		}
	} else if (isArray(data)) {
		if (data.length) {
			data.forEach((value: any, index: number) => {
				let keyPrefix = `${key}[${config?.indexes ? index : ""}]`;

				if (config?.noFilesWithArrayNotation && isFile(value)) {
					keyPrefix = key;
				}

				buildFormData(value, config, existingFormData, keyPrefix);
			});
		} else if (config?.allowEmptyArrays) {
			existingFormData.append(`${key}[]`, "");
		}
	} else if (isDate(data)) {
		existingFormData.append(key, data.toISOString());
	} else if (isObject(data) && !isBlob(data)) {
		Object.keys(data).forEach((prop) => {
			const value = data[prop];

			if (isArray(value)) {
				while (prop.length > 2 && prop.lastIndexOf("[]") === prop.length - 2) {
					prop = prop.substring(0, prop.length - 2);
				}
			}

			const keyPrefix = key
				? config?.dotsForObjectNotation
					? `${key}.${prop}`
					: `${key}[${prop}]`
				: prop;

			buildFormData(value, config, existingFormData, keyPrefix);
		});
	} else {
		existingFormData.append(key, data);
	}

	return existingFormData;
};

export default buildFormData;
