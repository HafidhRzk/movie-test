const { movie } = require("../../models");
const Joi = require("joi");
const CustomError = require("../middlewares/customError");
const uploadImg = require("../utils/uploadImg");

class Movie {
  static async createMovie(req, res, next) {
    try {
      const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        rating: Joi.number().required(),
        image: Joi.string().allow(''),
      });
      const options = {
        abortEarly: true,
        stripUnknown: true,
      };
      const { error, value } = schema.validate(req.body, options);

      if (error) throw new CustomError(error.details[0].message, 400);

      const newMovieData = value;

      if (value.image) {
        newMovieData.image = await uploadImg(value.image);
      }

      await movie.create(newMovieData);

      return res.status(200).json({ message: "New Movie Created!" });
    } catch (error) {
      next(error);
    }
  }

  static async getMovieList(req, res, next) {
    try {
      const data = await movie.findAll();

      return res.status(200).json({
        message: "Success Get Data Movie",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMovieDetail(req, res, next) {
    try {
      const { id } = req.params;
      const data = await movie.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { code: 400, message: "Movie Not Found!" };
      }

      return res.status(200).json({
        message: "Success Get Detail Movie",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const schema = Joi.object({
        title: Joi.string().allow(''),
        description: Joi.string().allow(''),
        rating: Joi.number().allow(''),
        image: Joi.string().allow(''),
      });
      const options = {
        abortEarly: true,
        stripUnknown: true,
      };
      const { error, value } = schema.validate(req.body, options);

      if (error) throw new CustomError(error.details[0].message, 400);

      const { id } = req.params;

      const data = await movie.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { code: 400, message: "Movie Not Found!" };
      }

      const newMovieData = value;

      value.image = value.image === "" ? null : value.image;

      if (value.image) {
        newMovieData.image = await uploadImg(value.image);
      }

      data.update({
        ...newMovieData,
      });

      return res.status(200).json({ message: "Success Update Movie" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const data = await movie.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { code: 400, message: "Movie Not Found!" };
      }

      await data.destroy();

      return res.status(200).json({ message: "Success Deleted Movie!" });
    } catch (error) {
      next(error);
    }
  }
} // end class

module.exports = Movie;