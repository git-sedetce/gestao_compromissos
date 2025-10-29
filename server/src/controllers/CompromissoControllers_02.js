const database = require("../models");
const { Sequelize } = require("sequelize");
const nodemailer = require("nodemailer");

class CompromissoController {
  static async allReunioesTask(req, res) {
    try {
      const mostrarReunioes = await database.Reuniao.findAll({
        where: { projeto_id: null }, // Filtra reuniões sem projeto associado
        order: [["data_reuniao", "DESC"]],
        attributes: [
          "id",
          "nome_reuniao",
          "data_reuniao",
          "horario_inicial",
          "pauta",
        ],
        include: [
          {
            model: database.Coordenadorias,
            as: "ass_meet_coord",
            attributes: ["coordenadoria", "sigla"],
          },
          {
            model: database.Secretaria_Executivas,
            as: "ass_meet_sexec",
            attributes: ["secretaria", "sigla"],
          },
          {
            model: database.Atas,
            as: "ass_meet_register",
            attributes: ["id", "ata"],
          },
          // {
          //   model: database.Compromisso,
          //   as: "ass_meet_commitment",
          //   attributes: ["user_id", "reuniao_id", "solicitante", "tarefa_id"],
          //   include: [
          //     {
          //       model:database.Users,
          //       as: "ass_commitment_users",
          //       attributes: ["id", "name", "user_email"],
          //     },
          //     {
          //       model: database.Tarefa,
          //       as: "ass_commitment_task",
          //       attributes: [
          //         "id",
          //         "nome_ordem",
          //         "responsavel_id",
          //         "status_id",
          //         "data_inicial",
          //         "data_conclusao",
          //         "prazo",
          //         "dias_trabalhado",
          //         "status_conclusao",
          //       ],                
          //     }              
          //   ],
          // },
        ],
      });

      return res.status(200).json(mostrarReunioes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async reunioesTask(req, res) {
    const { id } = req.params;
    try {
      const mostrarReunioes = await database.Tarefa.findAll({
        where: { reuniao_id: Number(id) },
        // order: [["data_reuniao", "DESC"]],
        attributes: [
          "id",
          "nome_ordem",
          "responsavel_id",
          "status_id",
          "data_inicial",
          "data_conclusao",
          "prazo",
          "dias_trabalhado",
          "status_conclusao",
        ],
        include: [          
          {
            model: database.Users,
            as: "ass_tarefa_users",
            attributes: ["id", "name", "user_email"],            
          },
          {
            model: database.Status,
            as: "ass_tarefa_status",
            attributes: ["name"],
          }
        ],
      });

      return res.status(200).json(mostrarReunioes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async cadastrarParticipantes(req, res) {
    const participantes = req.body;
    console.log("participantes", participantes);

    if (!Array.isArray(participantes) || participantes.length === 0) {
      return res.status(400).json({
        message:
          "O corpo da requisição deve ser um array com pelo menos um participante.",
      });
    }

    try {     

      const newParticipant = await Promise.all(
        participantes.map(async (tarefa) => {          

          const criarParticipante = await database.Compromisso.create({
            user_id: tarefa.responsavel_id,
            reuniao_id: tarefa.reuniao_id,
            solicitante: false,
          });
          const pegarEmailResp = await database.Users.findOne({
            where: { id: Number(tarefa.responsavel_id) },
            attributes: ["user_email"],
          });

          const enviarEmail = pegarEmailResp.user_email;
          //Configurar e enviar e-mail
          const transporter = nodemailer.createTransport({
            host: "172.26.2.26", //relay.etice.ce.gov.br
            port: 25,
            secure: false,
            tls: {
              rejectUnauthorized: false,
            },
          });
          const mailOptions = {
            from: "gestaodeprojetos@sde.ce.gov.br",
            to: enviarEmail,
            subject: "Convite de reunião",
            html: `
          <h3>Reunião</h3>
          <p>Você foi convidado para a reunião de ${tarefa.nome_reuniao} verifique no sistema de <a href="https:ww.gestaoprojetos.sde.ce.gov.br/commitment/acompanhamento">Gestão de projetos</a> para mais detalhes.</p>`,
          };

          await transporter.sendMail(mailOptions);
          console.log("E-mail enviado com sucesso!");

          await database.Audit.create({
            user_id: tarefa.usuario,
            tipo_acao: `Cadastro de participantes`,
            acao: `O colaborador ${tarefa.nome_membro} foi convidado para a reunião ${tarefa.nome_reuniao} pelo usuário ${tarefa.nome_usuario}.`,
          });

          return criarParticipante;
        })
      );

      const mensagem =
        newParticipant.length === 1
          ? "1 tarefa cadastrada"
          : `${newParticipant.length} tarefas cadastradas`;

      return res.status(200).json({
        message: `${mensagem} com sucesso!`,
        tarefas: newParticipant,
      });
    } catch (error) {
      console.error("Erro ao cadastrar participante:", error);
      return res.status(500).json({ error: error.message });
    }
  }
  

  static async meetByCoord(req, res) {
    const id = Number(req.params.id); // Garante que o ID seja um número
  
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
  
    try {
      const mostrarReunioes = await database.Reuniao.findAll({
        where: {
          projeto_id: null, // Filtra reuniões sem projeto associado
          "$ass_meet_coord.id$": id, // Filtro da coordenadoria
        },
        order: [["data_reuniao", "DESC"]],
        attributes: [
          "id",
          "nome_reuniao",
          "data_reuniao",
          "horario_inicial",
          "pauta",
        ],
        include: [
          {
            model: database.Coordenadorias,
            as: "ass_meet_coord",
            attributes: ["id", "coordenadoria", "sigla"],
          },
          {
            model: database.Secretaria_Executivas,
            as: "ass_meet_sexec",
            attributes: ["id", "secretaria", "sigla"],
          },
          {
            model: database.Atas,
            as: "ass_meet_register",
            attributes: ["id", "ata"],
          },
          {
            model: database.Compromisso,
            as: "ass_meet_commitment",
            attributes: ["user_id", "reuniao_id", "solicitante", "tarefa_id"],
            include: [
              {
                model: database.Users,
                as: "ass_commitment_users",
                attributes: ["id", "name", "user_email"],
              },
              {
                model: database.Tarefa,
                as: "ass_commitment_task",
                attributes: [
                  "id",
                  "nome_ordem",
                  "responsavel_id",
                  "status_id",
                  "data_inicial",
                  "data_conclusao",
                  "prazo",
                  "dias_trabalhado",
                  "status_conclusao",
                ],
              },
            ],
          },
        ],
      });
  
      if (!mostrarReunioes || mostrarReunioes.length === 0) {
        return res.status(404).json({ message: "Nenhuma reunião encontrada." });
      }
  
      return res.status(200).json(mostrarReunioes);
    } catch (error) {
      console.error("Erro ao buscar reuniões:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
  

  static async meetBySexec(req, res) {
    const id = Number(req.params.id); // Garante que o ID seja um número
  
    try {
      const mostrarReunioes = await database.Reuniao.findAll({
        where: {
          projeto_id: null, // Filtra reuniões sem projeto associado
          "$ass_meet_sexec.id$": id, // Filtro da secretaria executiva
        },
        order: [["data_reuniao", "DESC"]],
        attributes: [
          "id",
          "nome_reuniao",
          "data_reuniao",
          "horario_inicial",
          "pauta",
        ],
        include: [
          {
            model: database.Coordenadorias,
            as: "ass_meet_coord",
            attributes: ["coordenadoria", "sigla"],
          },
          {
            model: database.Secretaria_Executivas,
            as: "ass_meet_sexec",
            attributes: ["secretaria", "sigla"],
          },
          {
            model: database.Atas,
            as: "ass_meet_register",
            attributes: ["id", "ata"],
          },
          {
            model: database.Compromisso,
            as: "ass_meet_commitment",
            attributes: ["user_id", "reuniao_id", "solicitante", "tarefa_id"],
            include: [
              {
                model: database.Users,
                as: "ass_commitment_users",
                attributes: ["id", "name", "user_email"],
              },
              {
                model: database.Tarefa,
                as: "ass_commitment_task",
                attributes: [
                  "id",
                  "nome_ordem",
                  "responsavel_id",
                  "status_id",
                  "data_inicial",
                  "data_conclusao",
                  "prazo",
                  "dias_trabalhado",
                  "status_conclusao",
                ],
              },
            ],
          },
        ],
      });
  
      if (!mostrarReunioes || mostrarReunioes.length === 0) {
        return res.status(404).json({ message: "Nenhuma reunião encontrada." });
      }
  
      return res.status(200).json(mostrarReunioes);
    } catch (error) {
      console.error("Erro ao buscar reuniões:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
  
}

module.exports = CompromissoController;
