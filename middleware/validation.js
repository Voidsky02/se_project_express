const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
}

//! This was giving error because the key here is 'id' but the route goes to
//! 'itemId' so i guess the property in here must match the route parameter
//! specifically.
const validateId = celebrate({
    params: Joi.object().keys({
        itemId: Joi.string().hex().length(24).required(),
    }) 
});

const validateClothingItemBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        imageUrl: Joi.string().required().custom(validateURL).message({
            'string.empty': 'the "imageUrl" field must be filled in',
            'string.uri': 'The imageUrl field must be a valid url',
        }),
        // validate "weather" as well
        weather: Joi.string().valid('hot', 'warm', 'cold').required(),
    }),
})

const validateUserInfoBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        avatar: Joi.string().required().custom(validateURL).messages({
            'string.empty': 'the "imageUrl" field must be filled in',
            'string.uri': 'The imageUrl field must be a valid url',
        }),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

const validateAuthentication = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

module.exports = {
    validateURL,
    validateId,
    validateClothingItemBody,
    validateUserInfoBody,
    validateAuthentication,
}