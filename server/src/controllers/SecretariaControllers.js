const database = require("../models");

class SecretariaControllers {
  static async pegaSecretaria(req, res) {
    const { id } = req.params;
    try {
      const secretaria = await database.Secretaria_Executivas.findOne({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(secretaria);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaCoordenadoria(req, res) {
    const { coord } = req.params;
    try {
      const coordenadoria = await database.Coordenadorias.findOne({
        where: {
          coordenadoria: String(coord),
        },
      });
      return res.status(200).json(coordenadoria);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaCoordenadoriaById(req, res) {
    const { id } = req.params;
    try {
      const coordenadoria = await database.Coordenadorias.findOne({
        where: {
          id: id,
        },
      });
      return res.status(200).json(coordenadoria);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async coordenadoria(req, res) {
    try {
      const coord = await database.Coordenadorias.findAll({
        order: ["id"],
        attributes: ["id", "coordenadoria", "sigla", "sexec_id"],
      });
      return res.status(200).json(coord);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async secretaria(req, res) {
    try {
      const coord = await database.Secretaria_Executivas.findAll({
        order: ["id"],
        attributes: ["id", "secretaria", "sigla"],
      });
      return res.status(200).json(coord);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarCoordSexevByUser(req, res) {
    const { id } = req.params;
    try {
      const user = await database.Users.findOne({
        where: { id: Number(id) },
        attributes: ["name", "coord_id", "sexec_id"],
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarCoordSexevByUserName(req, res) {
    const { name } = req.params;
    try {
      const user = await database.Users.findOne({
        where: { name: name },
        attributes: ["id", "coord_id", "sexec_id"],
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = SecretariaControllers;
