const database = require("../models");
const { Op } = require("sequelize");

class AtracaoController {
  static async cadastraEmpresa(req, res) {
    const newCompany = req.body;
    // console.log("newCompany", newCompany);
    try {
      const empresa = await database.Empresa.create({
        cnpj: newCompany.cnpj,
        razao_social: newCompany.razao_social,
        nome_fantasia: newCompany.nome_fantasia,
        city_id: Number(newCompany.city_id),
      });

      return res.status(200).json(empresa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastraAtracao(req, res) {
    const newAtracao = req.body;
    // console.log("newAtracao", newAtracao);
    try {
      const atracao = await database.Atracao.create({
        empresa_id: newAtracao.empresa_id,
        status_id: newAtracao.status_id,
        detalhamento: newAtracao.detalhamento,
        mou: newAtracao.mou,
        contato: newAtracao.contato,
        email_contato: newAtracao.email_contato,
        fone_contato: newAtracao.fone_contato,
        city_id: newAtracao.city_id,
        data_inicio: newAtracao.data_inicio,
        descricao: newAtracao.descricao,
        valor_investimento: newAtracao.valor_investimento,
        qtde_empregos: newAtracao.qtde_empregos,
        tem_fdi: newAtracao.tem_fdi,
        proximo_passo: newAtracao.proximo_passo,
      });

      return res.status(200).json(atracao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async todasEmpresas(req, res) {
    try {
      const mostrarEmpresas = await database.Empresa.findAll({
        order: ["id"],
        attributes: ["id", "cnpj", "razao_social", "nome_fantasia"],
        include: [
          {
            association: "ass_empresa_cidadebr",
            where: (database.Empresa.city_id = database.CidadesBr.id),
            attributes: ["id", "municipio", "cod_ibge"],
            include: [
              {
                association: "ass_cidadebr_estadobr",
                where: (database.CidadesBr.estado_id = database.EstadosBr.id),
                attributes: ["id", "estado"],
              },
            ],
          },
        ],
      });
      return res.status(200).json(mostrarEmpresas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async todasEmpresasAtracoes(req, res) {
    try {
      const mostrarEmpresas = await database.Empresa.findAll({
        order: ["id"],
        attributes: ["id", "cnpj", "razao_social", "nome_fantasia", "city_id"],
        include: [
          {
            association: "ass_empresa_cidadebr",
            where: (database.Empresa.city_id = database.CidadesBr.id),
            attributes: ["id", "municipio", "cod_ibge"],
            include: [
              {
                association: "ass_cidadebr_estadobr",
                where: (database.CidadesBr.estado_id = database.EstadosBr.id),
                attributes: ["id", "estado"],
              },
            ],
          },
          {
            association: "ass_empresa_atracao",
            where: (database.Atracao.empresa_id = database.Empresa.id),
            attributes: ["id", "detalhamento", "mou", "contato", "email_contato", "fone_contato", "data_inicio", "descricao", "valor_investimento", "qtde_empregos", "tem_fdi", "proximo_passo", "status_id", "city_id"],
            include: [
              {
                association: "ass_atracao_status",
                where: (database.Atracao.status_id = database.Status.id),
                attributes: ["name"],
              },
              {
                association: "ass_atracao_city",
                where: (database.Atracao.city_id = database.Cidade.id),
                attributes: ["nome_municipio", "cod_ibge"],
                include: [
                  {
                    association: "ass_cidade_regiao",
                    where: (database.Cidade.regiao_id = database.Regiao.id),
                    attributes: [ "nome"],
                  },
                ],
              }
            ]
          },
          {
            association: "ass_empresa_fdi",
            where: (database.FDI.empresa_id = database.Empresa.id),
            attributes: ["id", "pedido", "detalhamento", "valor_investimento", "qtde_empregos", "status_id", "city_id"],
            include: [
              {
                association: "ass_fdi_status",
                where: (database.FDI.status_id = database.Status.id),
                attributes: ["id", "name"],
              },
              {
                association: "ass_fdi_city",
                where: (database.Cidade.city_id = database.Cidade.id),
                attributes: ["id", "nome_municipio", "cod_ibge"],
                include: [
                  {
                    association: "ass_cidade_regiao",
                    where: (database.Cidade.regiao_id = database.Regiao.id),
                    attributes: ["id", "nome"],
                  },
                ],
              }
            ]
          }
        ],
      });
      return res.status(200).json(mostrarEmpresas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async todasAtracoes(req, res) {
    try {
      const atracaoAttrs = [
        "id", "detalhamento", "mou", "contato", "email_contato", "fone_contato", "data_inicio", "descricao", "valor_investimento", "qtde_empregos", "tem_fdi", "proximo_passo"
      ];
  
      const empresaAttrs = ["id", "cnpj", "razao_social", "nome_fantasia"];
      const cidadeAttrs = ["id", "municipio"];
      const estadoAttrs = ["id", "estado", "sigla", "regiao"];
      const statusAttrs = ["id", "name"];
      const cidadeAtracaoAttrs = ["id", "nome_municipio", "cod_ibge"];
      const regiaoAttrs = ["id", "nome"];
  
      const mostrarAtracoes = await database.Atracao.findAll({
        order: ["id"],
        attributes: atracaoAttrs,
        include: [
          {
            association: "ass_atracao_empresa",
            attributes: empresaAttrs,
            include: [
              {
                association: "ass_empresa_cidadebr",
                attributes: cidadeAttrs,
                include: [
                  {
                    association: "ass_cidadebr_estadobr",
                    attributes: estadoAttrs,
                  }
                ]
              }
            ]
          },
          {
            association: "ass_atracao_status",
            attributes: statusAttrs,
          },
          {
            association: "ass_atracao_city",
            attributes: cidadeAtracaoAttrs,
            include: [
              {
                association: "ass_cidade_regiao",
                attributes: regiaoAttrs,
              }
            ]
          }
        ],
      });
  
      return res.status(200).json(mostrarAtracoes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }  

  static async empresa(req, res) {
    const { id } = req.params;
    try {
      const umaEmpresa = await database.Empresa.findOne({
        where: { id: Number(id) },
        attributes: ["id", "cnpj", "razao_social", "nome_fantasia"],        
      });
      return res.status(200).json(umaEmpresa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atracao(req, res) {
    const { id } = req.params;
    try {
      const umaAtracao = await database.Atracao.findOne({
        where: { id: Number(id) },
        attributes: [
          "id",
          "detalhamento",
          "mou",
          "contato",
          "data_inicio",
          "descricao",
          "valor_investimento",
          "qtde_empregos",
          "tem_fdi",
          "proximo_passo",
        ],
        include: [
          {
            association: "ass_atracao_empresa",
            where: (database.Atracao.empresa_id = database.Empresa.id),
            attributes: ["id", "cnpj", "razao_social", "nome_fantasia"],
            include: [
              {
                association: "ass_cidade_regiao",
                where: (database.Cidade.regiao_id = database.Regiao.id),
                attributes: ["id", "nome"],
              },
            ],
          },
          {
            association: "ass_atracao_status",
            where: (database.Atracao.status_id = database.Status.id),
            attributes: ["id", "name"],
          },
          {
            association: "ass_atracao_city",
            where: (database.Atracao.city_id = database.Cidade.id),
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
      return res.status(200).json(umaAtracao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaEmpresa(req, res){
    const { id } = req.params;
    const atualiza = req.body;
    try{
        await database.Empresa.update({
          cnpj: atualiza.cnpj,
          razao_social: atualiza.razao_social,
          nome_fantasia: atualiza.nome_fantasia,
          city_id: Number(atualiza.city_id)
        }, 
        { where: { id: Number(id) }
      })
        const empresaAtualizada = await database.Empresa.findOne( { where: { id: Number(id) }})
        return res.status(200).json(empresaAtualizada)

    }catch(error){
        return res.status(500).json(error.message)
    }
  }

  static async atualizaAtracao(req, res){
    const { id } = req.params;
    const atualiza = req.body;
    try{
        await database.Atracao.update({
          empresa_id: atualiza.empresa_id,
          status_id: atualiza.status_id,
          detalhamento: atualiza.detalhamento,
          mou: atualiza.mou,
          contato: atualiza.contato,
          email_contato: atualiza.email_contato,
          fone_contato: atualiza.fone_contato,
          city_id: atualiza.city_id,
          data_inicio: atualiza.data_inicio,
          descricao: atualiza.descricao,
          valor_investimento: atualiza.valor_investimento,
          qtde_empregos: atualiza.qtde_empregos,
          tem_fdi: atualiza.tem_fdi,
          proximo_passo: atualiza.proximo_passo,
        }, 
        { where: { empresa_id: Number(id) }
      })
        const atracaoAtualizada = await database.Atracao.findOne( { where: { empresa_id: Number(id) }})
        return res.status(200).json(atracaoAtualizada)

    }catch(error){
        return res.status(500).json(error.message)
    }
  }

  static async apagaEmpresa(req, res){
    const { id } = req.params;
    const apaga = req.body;
    try{
        await database.Empresa.destroy({ where: { id: Number(id) }})
        return res.status(200).json({ mensagem: `A Empresa ${apaga.nome_fantasia} foi bloqueado com sucesso!!`})

    }catch(error){
        return res.status(500).json(error.message)
    }

  }

  static async contarEmpresasAtPorRegiao(req, res) {
      try {
    
        const empresaPorRegiao = await database.Atracao.findAll({        
          attributes: [
            [database.Sequelize.col('ass_atracao_city.ass_cidade_regiao.nome'), 'regiao'],
            [database.Sequelize.fn('COUNT', '*'), 'empresa_id']
          ],
          include: [
            {
              association: 'ass_atracao_city',
              attributes: [],
              include: [{ association: 'ass_cidade_regiao', attributes: [] }]
            }
          ],
          group: ['regiao'],
          order: [[database.Sequelize.literal("regiao"), 'ASC']]
        });
    
        return res.status(200).json(empresaPorRegiao);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
  
    static async somarInvestimentoAtPorRegiao(req, res) {
      try {
    
        const somaInvestimento = await database.Atracao.findAll({        
          attributes: [
            [database.Sequelize.col('ass_atracao_city.ass_cidade_regiao.nome'), 'regiao'],
            [database.Sequelize.fn('SUM', database.Sequelize.col('valor_investimento')), 'valor_investimento'] // Substituir '*' pela coluna de investimento
          ],
          include: [
            {
              association: 'ass_atracao_city',
              attributes: [],
              include: [{ association: 'ass_cidade_regiao', attributes: [] }]
            }
          ],
          group: ['regiao'],
          order: [[database.Sequelize.literal("regiao"), 'ASC']]
        });
    
        return res.status(200).json(somaInvestimento);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
  
    static async somarEmpregosAtPorRegiao(req, res) {
      try {
    
        const somaEmpregos = await database.Atracao.findAll({        
          attributes: [
            [database.Sequelize.col('ass_atracao_city.ass_cidade_regiao.nome'), 'regiao'],
            [database.Sequelize.fn('SUM', database.Sequelize.col('qtde_empregos')), 'empregos_gerados'] // Substituir '*' pela coluna de investimento
          ],
          include: [
            {
              association: 'ass_atracao_city',
              attributes: [],
              include: [{ association: 'ass_cidade_regiao', attributes: [] }]
            }
          ],
          group: ['regiao'],
          order: [[database.Sequelize.literal("regiao"), 'ASC']]
        });
    
        return res.status(200).json(somaEmpregos);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
}

module.exports = AtracaoController;
