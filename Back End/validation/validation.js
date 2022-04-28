import Joi from "joi";

export const signupSchema = Joi.object({

    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string().min(7).required(),

    confirm_password: Joi.ref("password"),

    email: Joi.string().email(),
    gender: Joi.string(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    age : Joi.number()
});

export const loginSchema = Joi.object({

    email : Joi.string().email(),
    password : Joi.string().min(7)

})