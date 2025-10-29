const database = require("../models");

class LocalizacaoControllers {
  static async pegarCidade(req, res) {
    try {
      const city = await database.Cidade.findAll({
        order: ["id"],
        attributes: ["id", "nome_municipio", "regiao_id"],
      });
      return res.status(200).json(city);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cityById(req, res) {
    const { id } = req.params;
    try {
      const city = await database.Cidade.findOne({
        where: { id: Number(id) },
        attributes: ["id", "nome_municipio", "regiao_id"],
      });
      return res.status(200).json(city);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarCidadeRegiao(req, res) {
    try {
      const city = await database.Cidade.findAll({
        order: ["id"],
        attributes: ["id", "secretaria", "sigla"],
        include: [
          {
            association: "ass_cidade_regiao",
            where: (database.Cidade.regiao_id = database.Regiao.id),
            attributes: ["id", "nome"],
          },
        ],
      });
      return res.status(200).json(city);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarRegiaoByCity(req, res) {
    const { id } = req.params;
    try {
      const regiao = await database.Regiao.findOne({
        where: { id: Number(id) },
        attributes: ["id", "nome"],
      });
      return res.status(200).json(regiao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarCidadeBr(req, res) {
    try {
      const city = await database.CidadesBr.findAll({
        order: ["municipio"],
        attributes: ["id", "municipio"],
        include: [
          {
            association: "ass_cidadebr_estadobr",
            where: (database.CidadesBr.estado_id = database.EstadosBr.id),
            attributes: ["id", "estado", "sigla"],
          },
        ],
      });
      return res.status(200).json(city);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cityByIdBr(req, res) {
    const { id } = req.params;
    try {
      const city = await database.CidadesBr.findOne({
        where: { id: Number(id) },
        attributes: ["id", "municipio"],
        include: [
          {
            association: "ass_cidadebr_estadobr",
            where: (database.CidadesBr.estado_id = database.EstadosBr.id),
            attributes: ["id", "estado", "sigla"],
          },
        ],
      });
      return res.status(200).json(city);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarEstadoBr(req, res) {
    try {
      const estado = await database.EstadosBr.findAll({
        order: ["regiao"],
        attributes: ["id", "estado", "sigla", "regiao"],
      });
      return res.status(200).json(estado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarEstadoByCityBr(req, res) {
    const { city } = req.params;
    try {
      const cidade = await database.CidadesBr.findOne({
        where: { municipio: city },
        attributes: ["municipio"],
        include: [
          {
            association: "ass_cidadebr_estadobr",
            where: (database.CidadesBr.estado_id = database.EstadosBr.id),
            attributes: ["id", "estado", "sigla"],
          },
        ],
      });
      return res.status(200).json(cidade);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = LocalizacaoControllers;
