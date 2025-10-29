const database = require("../models");
const { Sequelize, QueryTypes } = require("sequelize");
const nodemailer = require("nodemailer");

class TarefaController {
  static async cadastraTarefa(req, res) {
    const novoTarefa = req.body;
    console.log('novoTarefa', novoTarefa);
    try {
      const newTask = await database.Tarefa.create(novoTarefa);
      return res.status(200).json(newTask);
    } catch (error) {
      // console.log('erro', error)
      return res.status(500).json(error.message);
    }
  }

  // static async cadastraTarefaMeet(req, res) {
  //   const novasTarefas = req.body;
  //   console.log("novasTarefas", novasTarefas);

  //   if (!Array.isArray(novasTarefas) || novasTarefas.length === 0) {
  //     return res.status(400).json({
  //       message:
  //         "O corpo da requisição deve ser um array com pelo menos uma tarefa.",
  //     });
  //   }

  //   try {
  //     const dataAtual = new Date();
  //     const dataFormatada = dataAtual.toISOString().split("T")[0]; // "YYYY-MM-DD"

  //     const newTask = await Promise.all(
  //       novasTarefas.map(async (tarefa) => {
  //         const prazo = Math.ceil(
  //           (new Date(tarefa.data_conclusao).getTime() - dataAtual.getTime()) /
  //             (1000 * 60 * 60 * 24)
  //         );

  //         const tarefaCriada = await database.Tarefa.create({
  //           nome_ordem: tarefa.nome_ordem,
  //           data_inicial: dataFormatada,
  //           data_conclusao: tarefa.data_conclusao,
  //           prazo,
  //           responsavel_id: tarefa.responsavel_id,
  //           status_id: tarefa.status_id,
  //           reuniao_id: tarefa.reuniao_id,
  //         });
  //         const pegarEmailResp = await database.User.findOne({
  //           where: { id: Number(tarefa.responsavel_id) },
  //           attributes: ["user_email"],
  //         });

  //         const enviarEmail = pegarEmailResp.user_email;
  //         // Configurar e enviar e-mail
  //         const transporter = configurarTransportador();
  //         const mailOptions = {
  //           from: "gestao.pessoas@sde.ce.gov.br",
  //           to: enviarEmail,
  //           subject: "Atribuição de tarefa",
  //           html: `
  //         <h3>Tarefa</h3>
  //         <p>Foi atribuida a tarefa de ${tarefa.nome_ordem} para apresentar na reunião ${tarefa.nome_reuniao}, marcada para o dia ${tarefa.data_conclusao}, após conclui-la acesse o sistema de <a href="https://www.gestaoprojetos.sde.ce.gov.br/commitment/acompanhamento">Gestão de projetos</a> e marque como realizada.</p>`,
  //         };

  //         await transporter.sendMail(mailOptions);
  //         console.log("E-mail enviado com sucesso!");

  //         await database.Audit.create({
  //           user_id: tarefa.usuario,
  //           tipo_acao: `Cadastro de tarefas`,
  //           acao: `Tarefa ${tarefa.nome_ordem} cadastrada pelo usuário ${tarefa.nome_usuario}.`,
  //         });

  //         return tarefaCriada;
  //       })
  //     );

  //     const mensagem =
  //       newTask.length === 1
  //         ? "1 tarefa cadastrada"
  //         : `${newTask.length} tarefas cadastradas`;

  //     return res.status(200).json({
  //       message: `${mensagem} com sucesso!`,
  //       tarefas: newTask,
  //     });
  //   } catch (error) {
  //     console.error("Erro ao cadastrar tarefas:", error);
  //     return res.status(500).json({ error: error.message });
  //   }
  // }

  static async todasTarefa(req, res) {
    try {
      const mostrarTarefa = await database.Tarefa.findAll();
      return res.status(200).json(mostrarTarefa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async umTarefa(req, res) {
    const { id } = req.params;
    try {
      const mostraUmTarefa = await database.Tarefa.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(mostraUmTarefa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async task(req, res) {
    const { id } = req.params;
    try {
      const mostraUmTarefa = await database.Tarefa.findAll({
        where: { projeto_id: Number(id) },
        attributes: ["id", "nome_ordem"],
      });
      return res.status(200).json(mostraUmTarefa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async tarefaByProjeto(req, res) {
    const { id } = req.params;
    try {
      const mostraUmTarefa = await database.Tarefa.findAll({
        where: { projeto_id: Number(id) },
        attributes: ["id", "nome_ordem"],
        order: [["id", "ASC"]],
      });
      return res.status(200).json(mostraUmTarefa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async ordem(req, res) {
    const { id } = req.params;
    try {
      const maxOrdem = await database.Tarefa.findOne({
        where: { projeto_id: Number(id) },
        attributes: [
          [Sequelize.fn("MAX", Sequelize.col("execucao")), "execucao"],
        ],
      });
      return res.status(200).json(maxOrdem);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaTarefa(req, res) {
    const { id } = req.params;
    const atualizaTarefa = req.body;
    try {
      await database.Tarefa.update(atualizaTarefa, {
        where: { id: Number(id) },
      });
      const tarefaAtualizado = await database.Tarefa.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(tarefaAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaTarefaStatus(req, res) {
    const { id } = req.params;
    const { status_id } = req.body;
    try {
      await database.Tarefa.update(
        { status_id },
        {
          where: { id: Number(id) },
        }
      );
      const updatedTarefa = await database.Tarefa.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: database.Status,
            as: "ass_tarefa_status",
            attributes: ["name"],
          },
          {
            model: database.Users,
            as: "ass_tarefa_users",
            attributes: ["name"],
          },
          {
            model: database.Sub_Tarefa,
            as: "ass_tarefa_task",
            attributes: [
              "id",
              "nome_sub_tarefa",
              "execucao",
              "data_inicial",
              "prazo",
              "data_conclusao",
              "responsavel_id",
            ],
            include: [
              {
                model: database.Status,
                as: "ass_task_status",
                attributes: ["name"],
              },
              {
                model: database.Users,
                as: "ass_task_users",
                attributes: ["name"],
              },
            ],
          },
        ],
      });
      return res.status(200).json(updatedTarefa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletaTarefa(req, res) {
    const { id } = req.params;
    try {
      const deleted = await database.Tarefa.destroy({
        where: { id: Number(id) },
      });
      if (deleted) {
        return res
          .status(200)
          .json({ message: `Tarefa with id ${id} deleted successfully.` });
      }
      throw new Error(`Tarefa with id ${id} not found`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TarefaController;
