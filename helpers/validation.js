exports.validation = (required_fields, data) => {
    const error = {};

    for (let field of required_fields) {
        if (!data[field]) {
            error[field] = `${field} is required`;
        }
    }

    return Object.keys(error).length ? error : null;
};

exports.validStatus = (status) => {
    const validStatuses = ["pending", "in-progress", "completed"];
    return validStatuses.includes(status);
};
