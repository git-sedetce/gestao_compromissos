const database = require("../models");
const { Op } = require("sequelize");

class InauguracaoController {
  static async cadastraInauguracao(req, res) {
    const newInauguracao = req.body;
    // console.log("newInauguracao", newInauguracao);
    try {
      const inauguracao = await database.Inauguracao.create({
        tipo: newInauguracao.tipo,
        data_inauguracao: newInauguracao.data_inauguracao,
        valor: newInauguracao.valor,
        qtde_empregos: newInauguracao.qtde_empregos,
        empresa_id: Number(newInauguracao.empresa_id),
        city_id: Number(newInauguracao.city_id),
      });

      return res.status(200).json(inauguracao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaInauguracao(req, res) {
    try {
      const hoje = new Date(); // Data atual
  
      const mostrarInauguracao = await database.Inauguracao.findAll({
        where: {
          data_inauguracao: {
            [database.Sequelize.Op.gt]: hoje, // Filtra datas futuras
          },
        },
        order: [["data_inauguracao", "ASC"]],
        attributes: [
          "id",
          "tipo",
          "data_inauguracao",
          "valor",
          "qtde_empregos",
          "empresa_id",
          "city_id",
        ],
        include: [
          {
            association: "ass_inauguracao_empresa",
            attributes: ["id", "cnpj", "razao_social", "nome_fantasia", "city_id"],
          },
          {
            association: "ass_inauguracao_city",
            attributes: ["id", "nome_municipio"],
            include: [
              {
                association: "ass_cidade_regiao",
                attributes: ["id", "nome"],
              },
            ],
          },
        ],
      });
  
      return res.status(200).json(mostrarInauguracao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  

  static async inauguracaobyId(req, res) {
    const { id } = req.params;
    try {
        const mostrarInauguracao = await database.Inauguracao.findAll({
            where: { id: Number(id) },
          attributes: [
            "id",
            "tipo",
            "data_inauguracao",
            "valor",
            "qtde_empregos",
          ],
          include: [
            {
              association: "ass_inauguracao_empresa",
              where: (database.Inauguracao.empresa_id = database.Empresa.id),
              attributes: [
                "id",
                "cnpj",
                "razao_social",
                "nome_fantasia",
                "city_id",
              ],
              // include: [
              //   {
              //     association: "ass_empresa_city",
              //     where: (database.Empresa.city_id = database.Cidade.id),
              //     attributes: ["id", "nome_cidade", "cod_ibge"],
              //     include: [
              //       {
              //         association: "ass_cidade_regiao",
              //         where: (database.Cidade.regiao_id = database.Regiao.id),
              //         attributes: ["id", "nome"],
              //       },
              //     ],
              //   },
              // ],
            },
            {
                association: "ass_inauguracao_city",
                where: (database.Inauguracao.city_id = database.Cidade.id),
                attributes: ["id", "nome_cidade"],
                include: [
                  {
                    association: "ass_cidade_regiao",
                    where: (database.Cidade.regiao_id = database.Regiao.id),
                    attributes: ["id", "nome"],
                  },
                ],
              },
          ],
        });
        return res.status(200).json(mostrarInauguracao);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }   

    static async atualizaIng(req, res){
          const { id } = req.params;
          const atualiza = req.body;
          // console.log('atualiza', atualiza)
          try{
              await database.Inauguracao.update({
                tipo: atualiza.tipo,
                empresa_id: atualiza.empresa_id,
                city_id: atualiza.city_id,
                data_inauguracao: atualiza.data_inauguracao,
                valor: atualiza.valor,
                qtde_empregos: atualiza.qtde_empregos 
              }, 
              { where: { id: Number(id) }
            })
              const inauguracao = await database.Inauguracao.findOne( { where: { id: Number(id) }})
              return res.status(200).json(inauguracao)  
          }
          catch(error){
              return res.status(500).json(error.message)
          }
        }
      
        static async apagaIng(req, res){
          const { id } = req.params;
          const apaga = req.body;
          try{
              await database.Inauguracao.destroy({ where: { id: Number(id) }})
              return res.status(200).json({ mensagem: `O evento de ianuguração de ${apaga.tipo} foi excluido com sucesso!!`})
      
          }catch(error){
              return res.status(500).json(error.message)
          }  
        }

        static async proximaInauguracao(req, res) {
          try {
            const hoje = new Date(); // Data atual
        
            const inauguracaoMaisProxima = await database.Inauguracao.findOne({
              where: {
                data_inauguracao: {
                  [database.Sequelize.Op.gt]: hoje, // Apenas datas futuras
                },
              },
              order: [["data_inauguracao", "ASC"]], // Ordena pela data mais próxima
              attributes: [
                "id",
                "tipo",
                "data_inauguracao",
                "valor",
                "qtde_empregos",
                "empresa_id",
                "city_id",
              ],
              include: [
                {
                  association: "ass_inauguracao_empresa",
                  attributes: ["id", "cnpj", "razao_social", "nome_fantasia", "city_id"],
                },
                {
                  association: "ass_inauguracao_city",
                  attributes: ["id", "nome_municipio"],
                  include: [
                    {
                      association: "ass_cidade_regiao",
                      attributes: ["id", "nome"],
                    },
                  ],
                },
              ],
            });
        
            if (!inauguracaoMaisProxima) {
              return res.status(404).json({ message: "Nenhuma inauguração futura encontrada." });
            }
        
            return res.status(200).json(inauguracaoMaisProxima);
          } catch (error) {
            return res.status(500).json(error.message);
          }
        }

        static async contarInauguracoesFuturas(req, res) {
          try {
            const hoje = new Date(); // Data atual
        
            const inauguracoesPorAno = await database.Inauguracao.findAll({
              where: {
                data_inauguracao: {
                  [database.Sequelize.Op.gt]: hoje, // Apenas datas futuras
                },
              },
              attributes: [
                [database.Sequelize.literal("date_part('year', data_inauguracao)"), 'ano'],
                [database.Sequelize.fn('COUNT', '*'), 'quantidade']
              ],
              group: ['ano'],
              order: [[database.Sequelize.literal("ano"), 'ASC']]
            });
        
            return res.status(200).json(inauguracoesPorAno);
          } catch (error) {
            return res.status(500).json(error.message);
          }
        }

        static async contarInauguracoesRealizadas(req, res) {
          try {
            const hoje = new Date(); // Data atual
        
            const inauguracoesPorAno = await database.Inauguracao.findAll({
              where: {
                data_inauguracao: {
                  [database.Sequelize.Op.lte]: hoje, // Apenas datas passadas ou hoje
                },
              },
              attributes: [
                [database.Sequelize.literal("date_part('year', data_inauguracao)"), 'ano'],
                [database.Sequelize.fn('COUNT', '*'), 'quantidade']
              ],
              group: ['ano'],
              order: [[database.Sequelize.literal("ano"), 'DESC']]
            });
        
            return res.status(200).json(inauguracoesPorAno);
          } catch (error) {
            return res.status(500).json(error.message);
          }
        }

        static async contarInauguracoesRealizadasPorRegiao(req, res) {
          try {
            const hoje = new Date(); // Data atual
        
            const inauguracoesPorRegiao = await database.Inauguracao.findAll({
              where: {
                data_inauguracao: {
                  [database.Sequelize.Op.lte]: hoje, // Apenas datas passadas ou hoje
                },
              },
              attributes: [
                [database.Sequelize.col('ass_inauguracao_city.ass_cidade_regiao.nome'), 'regiao'],
                [database.Sequelize.fn('COUNT', '*'), 'quantidade']
              ],
              include: [
                {
                  association: 'ass_inauguracao_city',
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
        
        static async contarInauguracoesFuturasPorRegiao(req, res) {
          try {
            const hoje = new Date(); // Data atual
        
            const inauguracoesPorRegiao = await database.Inauguracao.findAll({
              where: {
                data_inauguracao: {
                  [database.Sequelize.Op.gt]: hoje, // Apenas datas futuras
                },
              },
              attributes: [
                [database.Sequelize.col('ass_inauguracao_city.ass_cidade_regiao.nome'), 'regiao'],
                [database.Sequelize.fn('COUNT', '*'), 'quantidade']
              ],
              include: [
                {
                  association: 'ass_inauguracao_city',
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

module.exports = InauguracaoController;
