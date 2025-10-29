const database = require("../models");
const { Op } = require("sequelize");

class SimaController {
  static async cadastraSima(req, res) {
    const newSima = req.body;
    // console.log("newSima", newSima);
    try {
      const sima = await database.Sima.create({
        numero_programa: newSima.numero_programa,
        nome_entrega: newSima.nome_entrega,
        meta: newSima.meta,
        status_id: Number(newSima.status_id),
        detalhamento: newSima.detalhamento,
        mapp: newSima.mapp,
        responsavel_id: Number(newSima.responsavel_id),
      });

      return res.status(200).json(sima);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async todosSima(req, res) {
    try {
      const mostrarSima = await database.Sima.findAll({
        order: ["id"],
        attributes: [
          "id",
          "numero_programa",
          "nome_entrega",
          "meta",
          "status_id",
          "detalhamento",
          "mapp",
          "responsavel_id"
        ],
        include: [
          {
            association: "ass_sima_users",
            where: (database.Sima.responsavel_id = database.Users.id),
            attributes: ["name", "user_email"],
          },
          {
            association: "ass_sima_status",
            where: (database.Sima.status_id = database.Status.id),
            attributes: ["name", "id"],
          }
        ],
      });
      return res.status(200).json(mostrarSima);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async simaId(req, res) {
    const { id } = req.params;
    try {
      const mostrarSima = await database.Sima.findAll({
        where: { id: Number(id) },
        attributes: [
          "id",
          "numero_programa",
          "nome_entrega",
          "meta",
          "detalhamento",
          "mapp",
          "responsavel_id"
        ],
        include: [
          {
            association: "ass_sima_users",
            where: (database.Sima.responsavel_id = database.Users.id),
            attributes: ["name", "user_email"],
          },
          {
            association: "ass_sima_status",
            where: (database.Sima.status_id = database.Status.id),
            attributes: ["name", "id"],
          }
        ],
      });
      return res.status(200).json(mostrarSima);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaSima(req, res){
      const { id } = req.params;
      const atualiza = req.body;
      // console.log('atualiza', atualiza)
      try{
          await database.Sima.update({
            numero_programa: atualiza.numero_programa,
            nome_entrega: atualiza.nome_entrega,
            meta: atualiza.meta,
            responsavel_id: atualiza.responsavel_id,
            status_id: atualiza.status_id,
            detalhamento: atualiza.detalhamento,
            mapp: atualiza.mapp,
          }, 
          { where: { id: Number(id) }
        })
          const simaAtualizada = await database.sima.findOne( { where: { id: Number(id) }})
          return res.status(200).json(simaAtualizada)  
      }
      catch(error){
          return res.status(500).json(error.message)
      }
    }
  
    static async apagaSima(req, res){
      const { id } = req.params;
      const apaga = req.body;
      try{
          await database.Sima.destroy({ where: { id: Number(id) }})
          return res.status(200).json({ mensagem: `O SIMA de número ${apaga.numero_programa} foi excluido com sucesso!!`})
  
      }catch(error){
          return res.status(500).json(error.message)
      }  
    }

    static async statuSima(req, res) {
      try {
        const mostrarSima = await database.Sima.findAll({
          attributes: [
            [database.Sequelize.col('ass_sima_status.name'), 'status'],
            [database.Sequelize.fn('COUNT', '*'), 'numero_programa']
          ],

          include: [
            {
              association: 'ass_sima_status',
              attributes: []
            }
          ],
          group: ['status'],
          order: [[database.Sequelize.literal("status"), 'ASC']]       
         
        });
        return res.status(200).json(mostrarSima);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
}

module.exports = SimaController;
