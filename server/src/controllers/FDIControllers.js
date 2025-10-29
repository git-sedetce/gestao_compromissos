const database = require("../models");
const { Op } = require("sequelize");

class FDIController {
  static async cadastraFDI(req, res) {
    const newFDI = req.body;
    // console.log("newFDI", newFDI);
    try {
      const fdi = await database.FDI.create({
        pedido: newFDI.pedido,
        empresa_id: newFDI.empresa_id,
        status_id: newFDI.status_id,
        detalhamento: newFDI.detalhamento,
        valor_investimento: newFDI.valor_investimento,
        qtde_empregos: newFDI.qtde_empregos,
        city_id: newFDI.city_id,
      });

      return res.status(200).json(fdi);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaFDI(req, res) {
    try {
      const mostrarFDI = await database.FDI.findAll({
        order: ["id"],
        attributes: [
          "id",
          "pedido",
          "detalhamento",
          "valor_investimento",
          "qtde_empregos",
        ],
        include: [
          {
            association: "ass_fdi_empresa",
            where: (database.FDI.empresa_id = database.Empresa.id),
            attributes: [
              "id",
              "cnpj",
              "razao_social",
              "nome_fantasia",
              "city_id",
            ],
            include: [
              {
                association: "ass_empresa_cidadebr",
                where: (database.Empresa.city_id = database.CidadesBr.id),
                attributes: ["id", "municipio", "cod_ibge"],
                include: [
                  {
                    association: "ass_cidadebr_estadobr",
                    where: (database.Cidade.estado_id = database.EstadosBr.id),
                    attributes: ["id", "estado"],
                  },
                ],
              },
            ],
          },
          {
            association: "ass_fdi_status",
            where: (database.FDI.status_id = database.Status.id),
            attributes: ["id", "name"],
          },
            {
              association: "ass_fdi_city",
              where: (database.FDI.city_id = database.Cidade.id),
              attributes: ["id", "nome_cidade", "cod_ibge"],
              include: [
                {
                  association: "ass_cidade_regiao",
                  where: (database.Cidade.regiao_id = database.Regiao.id),
                  attributes: ["id", "nome"],
                },
              ],
            }
        ],
      });
      return res.status(200).json(mostrarFDI);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async fdibyId(req, res) {
    const { id } = req.params;
    try {
      const mostrarFDI = await database.FDI.findOne({
        where: { id: Number(id) },
        attributes: [
          "id",
          "pedido",
          "detalhamento",
          "valor_investimento",
          "qtde_empregos",
        ],
        include: [
          {
            association: "ass_fdi_empresa",
            where: (database.FDI.empresa_id = database.Empresa.id),
            attributes: [
              "id",
              "cnpj",
              "razao_social",
              "nome_fantasia",
              "city_id",
            ],            
          },
          {
            association: "ass_fdi_status",
            where: (database.FDI.status_id = database.Empresa.id),
            attributes: ["id", "name"],
          },
          {
            association: "ass_fdi_city",
            where: (database.FDI.city_id = database.Cidade.id),
            attributes: ["id", "nome_cidade", "cod_ibge"],
            include: [
              {
                association: "ass_cidade_regiao",
                where: (database.Cidade.regiao_id = database.Regiao.id),
                attributes: ["id", "nome"],
              },
            ],
          }
        ],
      });
      return res.status(200).json(mostrarFDI);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async contarEmpresasPorRegiao(req, res) {
    try {
  
      const inauguracoesPorRegiao = await database.FDI.findAll({        
        attributes: [
          [database.Sequelize.col('ass_fdi_city.ass_cidade_regiao.nome'), 'regiao'],
          [database.Sequelize.fn('COUNT', '*'), 'empresa_id']
        ],
        include: [
          {
            association: 'ass_fdi_city',
            attributes: [],
            include: [{ association: 'ass_cidade_regiao', attributes: [] }]
          }
        ],
        group: ['regiao'],
        order: [[database.Sequelize.literal("regiao"), 'ASC']]
      });
  
      return res.status(200).json(inauguracoesPorRegiao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async somarInvestimentoPorRegiao(req, res) {
    try {
  
      const inauguracoesPorRegiao = await database.FDI.findAll({        
        attributes: [
          [database.Sequelize.col('ass_fdi_city.ass_cidade_regiao.nome'), 'regiao'],
          [database.Sequelize.fn('SUM', database.Sequelize.col('valor_investimento')), 'valor_investimento'] // Substituir '*' pela coluna de investimento
        ],
        include: [
          {
            association: 'ass_fdi_city',
            attributes: [],
            include: [{ association: 'ass_cidade_regiao', attributes: [] }]
          }
        ],
        group: ['regiao'],
        order: [[database.Sequelize.literal("regiao"), 'ASC']]
      });
  
      return res.status(200).json(inauguracoesPorRegiao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async somarEmpregosPorRegiao(req, res) {
    try {
  
      const inauguracoesPorRegiao = await database.FDI.findAll({        
        attributes: [
          [database.Sequelize.col('ass_fdi_city.ass_cidade_regiao.nome'), 'regiao'],
          [database.Sequelize.fn('SUM', database.Sequelize.col('qtde_empregos')), 'empregos_gerados'] // Substituir '*' pela coluna de investimento
        ],
        include: [
          {
            association: 'ass_fdi_city',
            attributes: [],
            include: [{ association: 'ass_cidade_regiao', attributes: [] }]
          }
        ],
        group: ['regiao'],
        order: [[database.Sequelize.literal("regiao"), 'ASC']]
      });
  
      return res.status(200).json(inauguracoesPorRegiao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  
  
}

module.exports = FDIController;
