import Joi from "joi";

const novelSchema = Joi.object({
  name: Joi.string().required().min(1),
  genres: Joi.required(),
  //  idVideo: Joi.string().required(),
  country: Joi.string(),
  author: Joi.string(),
  status: Joi.string(),
  poster_img: Joi.string().required(),
  releaseDate: Joi.date().required(),
  description: Joi.string(),
  totalChap: Joi.number(),
  viewed: Joi.number(),
});
export default novelSchema;
