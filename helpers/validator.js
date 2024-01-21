const hapiJoiValidator = require("@hapi/joi");
const validateSeminar = (data) => {
    const validateCandidate = hapiJoiValidator.object({
        name: hapiJoiValidator.string().required().min(3).max(20),
        email: hapiJoiValidator.string().required().max(20),
        age: hapiJoiValidator.number().required(),
        gender: hapiJoiValidator.string().required(),
        seatNumber: hapiJoiValidator.string().required().max(5),
        topic: hapiJoiValidator.string().required(),
        section: hapiJoiValidator.string().required().valid('Morning', 'Afternoon', 'Evening')
    }); 
    return validateCandidate.validate(data);
};


const validateSeminar2 = (data) => {
    const validateCandidate = hapiJoiValidator.object({
        name: hapiJoiValidator.string().max(20),
        email: hapiJoiValidator.string().max(20),
        age: hapiJoiValidator.number(),
        gender: hapiJoiValidator.string().min(4).max(6),
        seatNumber: hapiJoiValidator.string().max(5),
        topic: hapiJoiValidator.string(),
        section: hapiJoiValidator.string().valid('Morning', 'Afternoon', 'Evening')
    });
    return validateCandidate.validate(data);
};

module.exports = {validateSeminar, validateSeminar2};

/*
const hapijoivalid = require('@hapi/joi');

const validateSeminar = (data) => {
    const validSeat = hapijoivalid.object({
        name: hapijoivalid.string().required,

    });
    return validSeat.validate(data);

};
module.exports = validateSeminar

*/