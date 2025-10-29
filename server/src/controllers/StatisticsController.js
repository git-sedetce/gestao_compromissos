const database = require("../models");
const { Sequelize, QueryTypes } = require("sequelize");
const dbConfig = require('../config/config').development;

class StatisticsController {
  static async projetoCoordSt1(req, res) {
    try {
      const qtv = await database.Projeto.findAll({
        where: { status_id: 1 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_project_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_coordenadoria",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_project_status.id",
          "ass_project_status.name",
          "ass_project_coordenadoria.id",
          "ass_project_coordenadoria.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async projetoCoordSt2(req, res) {
    try {
      const qtv = await database.Projeto.findAll({
        where: { status_id: 2 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_project_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_coordenadoria",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_project_status.id",
          "ass_project_status.name",
          "ass_project_coordenadoria.id",
          "ass_project_coordenadoria.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async projetoCoordSt3(req, res) {
    try {
      const qtv = await database.Projeto.findAll({
        where: { status_id: 3 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_project_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_coordenadoria",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_project_status.id",
          "ass_project_status.name",
          "ass_project_coordenadoria.id",
          "ass_project_coordenadoria.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async projetoCoordSt4(req, res) {
    try {
      const qtv = await database.Projeto.findAll({
        where: { status_id: 4 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_project_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_coordenadoria",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_project_status.id",
          "ass_project_status.name",
          "ass_project_coordenadoria.id",
          "ass_project_coordenadoria.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async projetoSexecSt1(req, res) {
    try {
      const qtv = await database.Projeto.findAll({
        where: { status_id: 1 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_project_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_sexec",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_project_status.id",
          "ass_project_status.name",
          "ass_project_sexec.id",
          "ass_project_sexec.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async projetoSexecSt2(req, res) {
    try {
      const qtv = await database.Projeto.findAll({
        where: { status_id: 2 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_project_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_sexec",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_project_status.id",
          "ass_project_status.name",
          "ass_project_sexec.id",
          "ass_project_sexec.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async projetoSexecSt3(req, res) {
    try {
      const qtv = await database.Projeto.findAll({
        where: { status_id: 3 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_project_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_sexec",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_project_status.id",
          "ass_project_status.name",
          "ass_project_sexec.id",
          "ass_project_sexec.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async projetoSexecSt4(req, res) {
    try {
      const qtv = await database.Projeto.findAll({
        where: { status_id: 4 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_project_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_sexec",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_project_status.id",
          "ass_project_status.name",
          "ass_project_sexec.id",
          "ass_project_sexec.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async compromissoCoordSt1(req, res) {
    try {
      const resultado = await database.Compromisso.findAll({
        attributes: [
          "coord_id",
          [
            Sequelize.fn("COUNT", Sequelize.col("Compromisso.id")),
            "qtd_compromissos",
          ],
        ],
        include: [
          {
            association: "ass_commitment_coord",
            attributes: ["id", "sigla"],
          },
        ],
        group: [
          "coord_id",
          "ass_commitment_coord.id",
          "ass_commitment_coord.sigla",
        ],
      });
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async compromissoCoordSt2(req, res) {
    try {
      const qtv = await database.Compromisso.findAll({
        where: { status_id: 1 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_commitment_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_commitment_coord",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_commitment_status.id",
          "ass_commitment_status.name",
          "ass_commitment_coord.id",
          "ass_commitment_coord.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async compromissoCoordSt3(req, res) {
    try {
      const qtv = await database.Compromisso.findAll({
        where: { status_id: 2 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_commitment_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_commitment_coord",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_commitment_status.id",
          "ass_commitment_status.name",
          "ass_commitment_coord.id",
          "ass_commitment_coord.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async compromissoCoordSt4(req, res) {
    try {
      const qtv = await database.Compromisso.findAll({
        where: { status_id: 4 },
        attributes: [
          "coord_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_commitment_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_commitment_coord",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "coord_id",
          "status_id",
          "ass_commitment_status.id",
          "ass_commitment_status.name",
          "ass_commitment_coord.id",
          "ass_commitment_coord.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async compromissoSexecSt1(req, res) {
    try {
      const resultado = await database.Compromisso.findAll({
        attributes: [
          "sexec_id",
          [
            Sequelize.fn("COUNT", Sequelize.col("Compromisso.id")),
            "qtd_compromissos",
          ],
        ],
        include: [
          {
            association: "ass_commitment_sexec",
            attributes: ["id", "sigla"],
          },
        ],
        group: [
          "sexec_id",
          "ass_commitment_sexec.id",
          "ass_commitment_sexec.sigla",
        ],
      });
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async compromissoSexecSt2(req, res) {
    try {
      const qtv = await database.Compromisso.findAll({
        where: { status_id: 1 },
        attributes: [
          "sexec_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_commitment_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_commitment_sexec",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "sexec_id",
          "status_id",
          "ass_commitment_status.id",
          "ass_commitment_status.name",
          "ass_commitment_sexec.id",
          "ass_commitment_sexec.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async compromissoSexecSt3(req, res) {
    try {
      const qtv = await database.Compromisso.findAll({
        where: { status_id: 2 },
        attributes: [
          "sexec_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_commitment_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_commitment_sexec",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "sexec_id",
          "status_id",
          "ass_commitment_status.id",
          "ass_commitment_status.name",
          "ass_commitment_sexec.id",
          "ass_commitment_sexec.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async compromissoSexecSt4(req, res) {
    try {
      const qtv = await database.Compromisso.findAll({
        where: { status_id: 4 },
        attributes: [
          "sexec_id",
          "status_id",
          [Sequelize.fn("COUNT", Sequelize.col("status_id")), "qtd_status"],
        ],
        include: [
          {
            association: "ass_commitment_status",
            // where:(database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_commitment_sexec",
            // where:(database.Projeto.coord_id = database.Coordenadorias.id),
            attributes: ["sigla"],
          },
        ],
        group: [
          "sexec_id",
          "status_id",
          "ass_commitment_status.id",
          "ass_commitment_status.name",
          "ass_commitment_sexec.id",
          "ass_commitment_sexec.sigla",
        ],
      });
      return res.status(200).json(qtv);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async tarefaCoordSt1(req, res) {
    const sequelize = new Sequelize({...dbConfig, logging: false});
    try {
      const resultado = await sequelize.query(
        `SELECT 
    coord.sigla AS sigla,
    COUNT(r.id) AS qtd_task
FROM 
   public."Reportars" r
INNER JOIN 
    public."Compromissos" c ON r.compromisso_id = c.id
INNER JOIN 
    public."Coordenadorias" coord ON c.coord_id = coord.id
GROUP BY 
    coord.sigla;`,
        {
          type: QueryTypes.SELECT,
        }
      );

      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async tarefaSexecSt1(req, res) {
    const sequelize = new Sequelize({...dbConfig, logging: false});
    try {
      const resultado = await sequelize.query(
        `SELECT 
    sexec.sigla AS sigla,
    COUNT(r.id) AS qtd_task
FROM 
   public."Reportars" r
INNER JOIN 
    public."Compromissos" c ON r.compromisso_id = c.id
INNER JOIN 
    public."Secretaria_Executivas" sexec ON c.sexec_id = sexec.id
GROUP BY 
    sexec.sigla;`,
        {
          type: QueryTypes.SELECT,
        }
      );

      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = StatisticsController;
