const database = require("../models");
const { Sequelize, QueryTypes } = require('sequelize');

class TarefaControllers {
   
   static async cadastraTasks(req,res){
    
    const novaSubTarefa = req.body;
    // console.log('novaTarefa', novaSubTarefa);
    try{
        const newTask = await database.Sub_Tarefa.create(novaSubTarefa)
        return res.status(200).json(newTask)
    }catch (error){
      // console.log('erro', error)
        return res.status(500).json(error.message)
    }

   }

   static async todasTasks(req,res){
    try{
        const mostrarTarefas = await database.Sub_Tarefa.findAll()
        return res.status(200).json(mostrarTarefas)
    }catch (error){
        return res.status(500).json(error.message)
    }
    
   }

   static async umaTask(req,res){
    const { id } = req.params;
    try {
        const mostraUmatarefa = await database.Sub_Tarefa.findOne({
            where: { id: Number(id) }
        })
        return res.status(200).json(mostraUmatarefa);
    }catch (error){
        return res.status(500).json(error.message)
    }
    
   }

   static async umaTaskByTarefa(req,res){
    const { id } = req.params;
    try {
        const mostraUmatarefa = await database.Sub_Tarefa.findAll({
            where: { tarefa_id: Number(id) },
            attributes: ["id", "nome_sub_tarefa"]
        })
        return res.status(200).json(mostraUmatarefa);
    }catch (error){
        return res.status(500).json(error.message)
    }
    
   }

   static async ordem(req, res){
    const { id } = req.params;
    try{
      const maxOrdem = await database.Sub_Tarefa.findOne({
        where: { tarefa_id: Number(id) },
        attributes: [
          [Sequelize.fn("MAX", Sequelize.col("execucao")), "execucao"],
        ],
      });
      return res.status(200).json(maxOrdem);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

   static async atualizaTask(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await database.Sub_Tarefa.update(novasInfos, { where: { id: Number(id) } });
      const updatedTask = await database.Sub_Tarefa.findOne({ where: { id: Number(id) } });
      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaTaskStatus(req, res) {
    const { id } = req.params;
    const { status_id } = req.body;
    try {
      await database.Sub_Tarefa.update({ status_id }, {
        where: { id: Number(id) }
      });
      const updatedTarefa = await database.Sub_Tarefa.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: database.Status,
            as: 'ass_task_status',
            attributes: ['name']
          },
          {
            model: database.Users,
            as: 'ass_task_users',
            attributes: ['name']
          },
          {
            model: database.Tarefa,
            attributes: ['id', 'nome_ordem', 'data_inicial', 'prazo', 'data_conclusao'],
            include: [
              {
                model: database.Status,
                as: 'ass_tarefa_status',
                attributes: ['name']
              },
              {
                model: database.Users,
                as: 'ass_tarefa_users',
                attributes: ['name']
              }
            ]
          }
        ]
      });
      return res.status(200).json(updatedTarefa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletaTask(req, res) {
    const { id } = req.params;
    try {
      const deleted = await database.Sub_Tarefa.destroy({ where: { id: Number(id) } });
      if (deleted) {
        return res.status(200).json({ message: `Tarefa with id ${id} deleted successfully.` });
      }
      throw new Error(`Tarefa with id ${id} not found`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TarefaControllers;