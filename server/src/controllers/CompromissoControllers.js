const database = require("../models");
const { Sequelize } = require("sequelize");
const nodemailer = require("nodemailer");

class CompromissoController {
  static async cadastraCompromisso(req, res) {
    const novosCompromissos = req.body;
    // console.log("novosCompromissos", novosCompromissos);

    if (!Array.isArray(novosCompromissos) || novosCompromissos.length === 0) {
      return res.status(400).json({
        message:
          "O corpo da requisição deve ser um array com pelo menos um compromisso.",
      });
    }

    try {
      const newTask = await Promise.all(
        novosCompromissos.map(async (compromisso) => {
          const commitment = await database.Compromisso.create(
            {
              compromisso: compromisso.compromisso,
              data_inicial: compromisso.data_inicial,
              // data_inicial: compromisso.data_inicial
              //   ? new Date(compromisso.data_inicial)
              //   : null,
              prazo: compromisso.prazo,
              responsavel_id: compromisso.responsavel_id,
              status_id: compromisso.status_id,
              reuniao_id: compromisso.reuniao_id,
              coord_id: compromisso.coord_id,
              sexec_id: compromisso.sexec_id,
            },
            { returning: true }
          );

          // console.log("commitment", commitment);

          await database.Audit.create({
            user_id: compromisso.usuario,
            tipo_acao: `Cadastro de tarefas`,
            acao: `Tarefa ${compromisso.compromisso} cadastrada pelo usuário ${compromisso.nome_usuario}.`,
          });

          const pegarEmailResp = await database.Users.findOne({
            where: { id: Number(compromisso.responsavel_id) },
            attributes: ["user_email"],
          });

          const enviarEmail = pegarEmailResp.user_email;
          // Configurar e enviar e-mail
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
            subject: "Atribuição de Compromisso",
            html: `
            <picture>
              <img src="../../storage/imgs/Logo-SDE---Horizontal.png" style="30%;">
            </picture>
           <h3>Atribuição de Compromisso Nº ${compromisso.reuniao_id}.${commitment.id}</h3>
           <p>Foi atribuida o compromisso <b>${compromisso.reuniao_id}.${commitment.id} de ${compromisso.compromisso}</b></p>
           <p>Conforme foi discutido na reunião ${compromisso.nome_reuniao}, com prazo de ${compromisso.prazo} dias, após conclui-la acesse o sistema de <a href="https://www.gestaoprojetos.sde.ce.gov.br/commitment/acompanhamento">Gestão de projetos</a> e marque como realizada.</p>
           <picture>
              <img src="../../storage/imgs/rodape.png" style="50%;">
            </picture>`,
          };

          // await transporter.sendMail(mailOptions);
          // console.log("E-mail enviado com sucesso!");

          // return commitment;
          // console.log("mailOptions", mailOptions);
          var emailRetorno = null;
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.warn(error);
              emailRetorno = error;
            } else {
              // console.log("Email sent: " + info.response);
              emailRetorno = {
                messagem: "email enviado com sucesso!",
                info: info.response,
              };
            }
          });
        })
      );

      const mensagem =
        newTask.length === 1
          ? "1 compromisso cadastrado"
          : `${newTask.length} compromissos cadastrados`;

      return res.status(200).json({
        message: `${mensagem} com sucesso!`,
        compromissos: newTask,
      });
    } catch (error) {
      console.error("Erro ao cadastrar compromissos:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async getUsersMeet(req, res) {
    const { id } = req.params;
    try {
      const usersProjects = await database.Compromisso.findAll({
        where: { reuniao_id: Number(id) },
        attributes: [
          "id",
          "compromisso",
          "data_inicial",
          "prazo",
          "data_conclusao",
          "arquivo",
          "reuniao_id",
        ],
        include: [
          {
            model: database.Users,
            as: "ass_commitment_users",
            attributes: ["id", "name"],
            include: [
              {
                model: database.Coordenadorias,
                as: "ass_users_coord",
                attributes: ["coordenadoria", "sigla"],
              },
              {
                model: database.Secretaria_Executivas,
                as: "ass_users_sexec",
                attributes: ["secretaria", "sigla"],
              },
            ],
          },
          {
            model: database.Status,
            as: "ass_commitment_status",
            attributes: ["id", "name"],
          },
        ],
        order: [
          [
            { model: database.Users, as: "ass_commitment_users" },
            "name",
            "ASC",
          ],
        ],
      });

      return res.status(200).json(usersProjects);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async commitmentById(req, res) {
    const { id } = req.params;
    try {
      const commitment = await database.Compromisso.findAll({
        where: { reuniao_id: Number(id) },
        attributes: [
          "id",
          "compromisso",
          "data_inicial",
          "prazo",
          "data_conclusao",
          "arquivo",
          "reuniao_id",
        ],
        include: [
          {
            model: database.Users,
            as: "ass_commitment_users",
            attributes: ["id", "name"],
            include: [
              {
                model: database.Coordenadorias,
                as: "ass_users_coord",
                attributes: ["coordenadoria", "sigla"],
              },
              {
                model: database.Secretaria_Executivas,
                as: "ass_users_sexec",
                attributes: ["secretaria", "sigla"],
              },
            ],
          },
          {
            model: database.Status,
            as: "ass_commitment_status",
            attributes: ["id", "name"],
          },
        ],
        order: [
          [
            { model: database.Users, as: "ass_commitment_users" },
            "name",
            "ASC",
          ],
        ],
      });

      return res.status(200).json(commitment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async exportCommitment(req, res) {
    const { id } = req.params;
    try {
      const commitment = await database.Reportar.findAll({
        where: { compromisso_id: Number(id) },
        order: [["id", "ASC"]],
        attributes: [
          "id",
          "situacao",
          "compromisso_id",
          "createdAt"         
        ],
        include: [
          {
            model: database.Compromisso,
            as: "ass_report_commitment",
            attributes: ["id", "compromisso"],
            include: [
              {
                model: database.Users,
                as: "ass_commitment_users",
                attributes: ["id", "name"],
              }
            ],
          },          
        ],        
      });

      return res.status(200).json(commitment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async allMeet(req, res) {
    try {
      const mostrarReunioes = await database.Reuniao.findAll({
        where: { projeto_id: null },
        order: [["data_reuniao", "DESC"]],
        attributes: [
          "id",
          "nome_reuniao",
          "data_reuniao",
          "horario_inicial",
          "duracao",
          "horario_final",
          "pauta",
          "compromissos_concluidos",
        ],
        include: [
          {
            association: "ass_meet_coord",
            where: (database.Reuniao.coord_id =
              database.Coordenadorias.coord_id),
            attributes: ["coordenadoria", "sigla"],
          },
          {
            association: "ass_meet_sexec",
            where: (database.Reuniao.sexec_id =
              database.Secretaria_Executivas.id),
            attributes: ["secretaria", "sigla"],
          },
          {
            association: "ass_meet_register",
            where: (database.Reuniao.id = database.Atas.reuniao_id),
            attributes: ["id", "ata"],
          },
        ],
      });
      return res.status(200).json(mostrarReunioes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async meetByIdCommitment(req, res) {
    const { id } = req.params;
    try {
      const mostrarReunioes = await database.Reuniao.findOne({
        where: { id: Number(id) },
        // order: [["data_reuniao", "DESC"]],
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
            model: database.Compromisso,
            as: "ass_meet_commitment",
            attributes: [
              "id",
              "compromisso",
              "data_inicial",
              "prazo",
              "data_conclusao",
              "arquivo",
            ],
            include: [
              {
                model: database.Users,
                as: "ass_commitment_users",
                attributes: ["id", "name"],
              },
              {
                model: database.Status,
                as: "ass_commitment_status",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        // order: [
        //   [
        //     { model: database.Users, as: "ass_commitment_users" },
        //     "name",
        //     "ASC",
        //   ],
        // ],
      });

      return res.status(200).json(mostrarReunioes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deletaCompromisso(req, res) {
    const { id } = req.params;
    try {
      const deleted = await database.Compromisso.destroy({
        where: { id: Number(id) },
      });
      if (deleted) {
        return res
          .status(200)
          .json({ message: `Compromisso com id ${id} excluido com sucesso.` });
      }
      throw new Error(`Compromisso com id ${id} não encontrado`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async atualizaCompromissoById(req, res) {
    const { id } = req.params;
    const atualiza = req.body;
    try {
      await database.Compromisso.update(atualiza, {
        where: { id: Number(id) },
      });
      const compromissoAtualizado = await database.Compromisso.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(compromissoAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastraSituacao(req, res) {
    const newStatus = req.body;
    // console.log('newStatus', newStatus);
    var enviarEmail = [
      "marcella.souza@sde.ce.gov.br"
    ];
    try {
      const novoRegistro = await database.Reportar.create(newStatus);

      const commitment = await database.Compromisso.findOne({
        where: { id: Number(newStatus.compromisso_id) },
        attributes: ["id", "compromisso", "status_id"],
        include: [
          {
            model: database.Users,
            as: "ass_commitment_users",
            attributes: ["id", "name"],
            include: [
              {
                model: database.Coordenadorias,
                as: "ass_users_coord",
                attributes: ["coordenadoria", "sigla"],
              },
              {
                model: database.Secretaria_Executivas,
                as: "ass_users_sexec",
                attributes: ["secretaria", "sigla"],
              },
            ],
          },
          {
            model: database.Status,
            as: "ass_commitment_status",
            attributes: ["id", "name"],
          },
        ],
      });

      if (commitment.status_id == 1) {
        await database.Compromisso.update(
          { status_id: 2 },
          {
            where: { id: Number(newStatus.compromisso_id) },
          }
        );
      }

      var transporter = nodemailer.createTransport({
        host: "172.26.2.26", //relay.etice.ce.gov.br
        port: 25,
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      });

      var mailOptions = {
        from: "gestaodeprojetos@sde.ce.gov.br",
        to: enviarEmail,
        subject: "Atividade no Compromisso",
        html: `<h3>Atividade no Compromisso!!</h3><p>${commitment.ass_commitment_users.name} fez uma atualização no compromisso ${commitment.compromisso}.`,
      };
      //   console.log("mailOptions", mailOptions);
      var emailRetorno = null;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          //console.log(error);
          emailRetorno = error;
        } else {
          //   console.log("Email enviado: " + info.response);
          emailRetorno = {
            messagem: "Email enviado com sucesso!",
            info: info.response,
          };
        }
      });

      // console.log("commitment", commitment);
      return res.status(200).json(novoRegistro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async situacoes(req, res) {
    try {
      const compromissosReport = await database.Compromisso.findAll({});
      return res.status(200).json(compromissosReport);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async situacaoId(req, res) {
    const { id } = req.params;
    try {
      const compromissoReport = await database.Reportar.findAll({
        where: { compromisso_id: Number(id) },
      });
      return res.status(200).json(compromissoReport);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async enviarEmail(req, res) {
    const { id } = req.params;
    try {
      const getUserCommitment = await database.Compromisso.findOne({
        attributes: ["id", "compromisso", "data_inicial", "prazo"],
        where: { id: Number(id) },
        include: [
          {
            model: database.Users,
            as: "ass_commitment_users",
            attributes: ["name", "user_email"],
          },
          {
            model: database.Status,
            as: "ass_commitment_status",
            attributes: ["name"],
          },
          {
            model: database.Reuniao,
            as: "ass_commitment_meet",
            attributes: ["id", "nome_reuniao", "data_reuniao"],
          },
        ],
      });

      // console.log('getUserCommitment', getUserCommitment)

      if (!getUserCommitment) {
        return res.status(404).json({ message: "Compromisso não encontrado." });
      }

      const userEmail = getUserCommitment.ass_commitment_users.user_email;

      // console.log('userEmail', userEmail)

      if (!userEmail) {
        return res
          .status(400)
          .json({ message: "Usuário não possui e-mail cadastrado." });
      }

      const transporter = nodemailer.createTransport({
        host: "172.26.2.26",
        port: 25,
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: "gestaodeprojetos@sde.ce.gov.br",
        to: userEmail,
        subject: `Compromisso da reunião ${getUserCommitment.ass_commitment_meet.nome_reuniao}`,
        html: `<h3>Lembrete de Compromisso</h3><p>Gostaríamos de lembrá-lo do compromisso assumido na reunião <strong>${getUserCommitment.ass_commitment_meet.nome_reuniao}</strong>. Você se comprometeu com a seguinte atividade: <strong>${getUserCommitment.compromisso}</strong>. O compromisso teve início em <strong>${getUserCommitment.data_inicial}</strong> e possui um prazo de <strong>${getUserCommitment.prazo}</strong> dias.</p>`,
      };

      var emailRetorno = null;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.warn(error);
          emailRetorno = error;
        } else {
          console.log("Email enviado: " + info.response);
          emailRetorno = {
            messagem: "Email enviado com sucesso!",
            info: info.response,
          };
        }
      });
      return res.status(200).json(getUserCommitment);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = CompromissoController;
