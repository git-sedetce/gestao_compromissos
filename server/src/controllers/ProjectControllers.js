const database = require("../models");
const base = require("../migrations/20240301171548-create-users-projects");
const { Op } = require('sequelize');

class ProjectControllers {
  static async cadastraProjetos(req, res) {
    const novoProjeto = req.body;
    // console.log("novoProjeto", novoProjeto);
    try {
      const newProject = await database.Projeto.create({
        name: novoProjeto.name,
        descricao: novoProjeto.descricao,
        data_inicio: novoProjeto.data_inicio,
        previsao_conclusao: novoProjeto.previsao_conclusao,
        status_id: novoProjeto.status_id,
        coord_id: novoProjeto.coord_id,
        sexec_id: novoProjeto.sexec_id,
        projeto_arquivado: false,
      });

      await database.Audit.create({
        user_id: novoProjeto.usuario_id,
        tipo_acao: `Criação de projeto`,
        acao: `Projeto ${novoProjeto.name} foi criado pelo usuário ${novoProjeto.usuario_id}.`,
      });
      return res.status(200).json(newProject);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async todosProjetos(req, res) {
    try {
      const mostrarProjetos = await database.Projeto.findAll({
        order: ["id"],
        attributes: [
          "id",
          "name",
          "descricao",
          "data_inicio",
          "previsao_conclusao",
        ],
        include: [
          {
            association: "ass_project_status",
            where: (database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_coordenadoria",
            where: (database.Coordenadorias.id = database.Projeto.coord_id),
            attributes: ["coordenadoria", "sigla"],
          },
          {
            association: "ass_project_sexec",
            where: (database.Secretaria_Executivas.id =
              database.Projeto.sexec_id),
            attributes: ["secretaria", "sigla"],
          },
        ],
      });
      return res.status(200).json(mostrarProjetos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async projetosCadastrados(req, res) {
    try {
      const mostrarProjetos = await database.Projeto.findAll({
        order: [["id", "ASC"]],
        attributes: ["id", "name"],
        where: {
          status_id: {
            [Op.ne]: 4, // Exclui registros onde status_id é igual a 4
          },
        },
      });
      return res.status(200).json(mostrarProjetos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async umProjeto(req, res) {
    const { id } = req.params;
    try {
      const mostraUmProjeto = await database.Projeto.findOne({
        where: { id: Number(id) },
        attributes: ["name", "descricao", "data_inicio", "previsao_conclusao"],
        include: [
          {
            association: "ass_project_create",
            where: (database.Projeto.criadoPor_id = database.Users.id),
            attributes: ["name", "user_email"],
          },
          {
            association: "ass_project_coord",
            where: (database.Projeto.coordenacao_id = database.Users.id),
            attributes: ["name", "user_email"],
          },
          {
            association: "ass_project_res",
            where: (database.Projeto.responsavel_id = database.Users.id),
            attributes: ["name", "user_email"],
          },
          {
            association: "ass_project_gerc",
            where: (database.Projeto.gerente_id = database.Users.id),
            attributes: ["name", "user_email"],
          },
          {
            association: "ass_project_status",
            where: (database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_coordenadoria",
            where: (database.Coordenadorias.id = database.Projeto.coord_id),
            attributes: ["coordenadoria", "sigla"],
          },
          {
            association: "ass_project_sexec",
            where: (database.Secretaria_Executivas.id =
              database.Projeto.sexec_id),
            attributes: ["secretaria", "sigla"],
          },
          {
            association: "ass_project_members",
            where: (database.Projeto.id = database.Users_Projects.ProjetoId),
            attributes: ["name"],
          },
        ],
      });
      return res.status(200).json(mostraUmProjeto);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async onlyProject(req, res) {
    const { id } = req.params;
    try {
      const mostraUmProjeto = await database.Projeto.findOne({
        where: { id: Number(id) },
        attributes: ["id", "name"],
      });
      return res.status(200).json(mostraUmProjeto);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async consultaProjeto(req, res) {
    const { id } = req.params;
    try {
      const mostraUmProjeto = await database.Projeto.findOne({
        where: { id: Number(id) },
        attributes: ["name", "descricao", "data_inicio", "previsao_conclusao"],
        include: [
          {
            association: "ass_project_status",
            where: (database.Projeto.status_id = database.Status.id),
            attributes: ["name"],
          },
          {
            association: "ass_project_tarefa",
            where: (database.Projeto.id = database.Tarefa.ProjetoId),
            attributes: [
              "nome_ordem",
              "data_inicial",
              "prazo",
              "data_conclusao",
            ],
            include: [
              {
                association: "ass_tarefa_status",
                where: (database.Tarefa.status_id = database.Status.id),
                attributes: ["name"],
              },
              {
                association: "ass_tarefa_task",
                where: (database.Tarefa.id = database.Tarefa.id),
                attributes: [
                  "nome_tarefa",
                  "data_inicial",
                  "prazo",
                  "data_conclusao",
                ],
                include: [
                  {
                    association: "ass_task_status",
                    where: (database.Tarefa.status_id = database.Status.id),
                    attributes: ["name"],
                  },
                ],
              },
            ],
          },
        ],
      });
      return res.status(200).json(mostraUmProjeto);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastraMembros(req, res) {
    const novosMembros = req.body; // Array de membros
    // console.log("novosMembros", novosMembros);

    if (!Array.isArray(novosMembros) || novosMembros.length === 0) {
      return res
        .status(400)
        .json({
          message:
            "O corpo da requisição deve ser um array com pelo menos um membro.",
        });
    }

    try {
      // Cria os registros em paralelo
      const membrosCriados = await Promise.all(
        novosMembros.map(async (membro) => {
          await database.Users_Projects.create({
            UserId: membro.user_id,
            ProjetoId: membro.projeto_id,
            ResponsabilidadeId: membro.nivel_responsabilidade, // Ajuste conforme o modelo
            st_partic: "sim", // Define o status como 'sim'
          });

          await database.Audit.create({
            user_id: membro.usuario,
            tipo_acao: `Cadastro de membros`,
            acao: `Membros foram cadastrados pelo usuário ${membro.nome_usuario}.`,
          });
        })
      );

      return res.status(200).json({
        message: `${membrosCriados.length} membros cadastrados com sucesso!`,
        membros: membrosCriados,
      });
    } catch (error) {
      console.error("Erro ao cadastrar membros:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async todosStatus(req, res) {
    try {
      const mostrarStatus = await database.Status.findAll({
        order: ["id"],
        attributes: ["id", "name"],
      });
      return res.status(200).json(mostrarStatus);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async consultaResp(req, res) {
    try {
      const mostrarResp = await database.Responsabilidade.findAll({
        order: ["id"],
        attributes: ["id", "tipo_responsabilidade"],
      });
      return res.status(200).json(mostrarResp);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getResp(req, res) {
    const { id } = req.params;
    try {
      const mostrarResp = await database.Responsabilidade.findOne({
        where: { id: Number(id) },
        attributes: ["tipo_responsabilidade"],
      });
      return res.status(200).json(mostrarResp);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getUsersProjects(req, res) {
    try {
      const usersProjects = await database.Users_Projects.findAll({
        include: [
          {
            model: database.Users,
            as: "ass_project_users",
            attributes: ["name"],
          },
          {
            model: database.Projeto,
            as: "ass_project_members",
            attributes: ["id", "name", "data_inicio", "previsao_conclusao","status_id", "updatedAt"],
            include: [
              {
                model: database.Status,
                as: "ass_project_status",
                attributes: ["name"],
              },
            ],
          },
          {
            model: database.Responsabilidade,
            as: "ass_project_resp",
          },
        ],
        where: {
          "$ass_project_resp.tipo_responsabilidade$": "Gerente",
        },
        order: [
          [
            { model: database.Projeto, as: "ass_project_members" },
            "previsao_conclusao",
            "DESC",
          ],
        ],
      });

      return res.status(200).json(usersProjects);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getUsersProjectById(req, res) {
    const { id } = req.params;
    try {
      const usersProjects = await database.Users_Projects.findAll({
        where: { ProjetoId: Number(id), st_partic: "sim" },
        attributes: ["id", "ProjetoId", "st_partic"],
        include: [
          {
            model: database.Projeto,
            as: "ass_project_members",
            attributes: ["id", "name"],
          },
          {
            model: database.Users,
            as: "ass_project_users",
            attributes: ["id", "name"],
          },
          {
            model: database.Responsabilidade,
            as: "ass_project_resp",
            attributes: ["id", "tipo_responsabilidade"],
          },
        ],
        order: [
          [
            { model: database.Projeto, as: "ass_project_members" },
            "previsao_conclusao",
            "DESC",
          ],
        ],
      });

      return res.status(200).json(usersProjects);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getUsersProjectByIdNot(req, res) {
    const { id } = req.params;
    try {
      const usersProjects = await database.Users_Projects.findAll({
        where: { ProjetoId: Number(id), st_partic: "nao" },
        attributes: ["id", "ProjetoId", "st_partic"],
        include: [
          {
            model: database.Projeto,
            as: "ass_project_members",
            attributes: ["id", "name"],
          },
          {
            model: database.Users,
            as: "ass_project_users",
            attributes: ["id", "name"],
          },
          {
            model: database.Responsabilidade,
            as: "ass_project_resp",
            attributes: ["id", "tipo_responsabilidade"],
          },
        ],
        order: [
          [
            { model: database.Projeto, as: "ass_project_members" },
            "previsao_conclusao",
            "DESC",
          ],
        ],
      });

      return res.status(200).json(usersProjects);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getUserProject(req, res) {
    const { id } = req.params;
    try {
      const usersProjects = await database.Users_Projects.findOne({
        where: { id: Number(id) },
        attributes: ["id", "ProjetoId", "st_partic"],
        include: [
          {
            model: database.Users,
            as: "ass_project_users",
            attributes: ["id", "name"],
          },
          {
            model: database.Projeto,
            as: "ass_project_members",
            attributes: ["id", "name"],
          },
        ]
      });

      return res.status(200).json(usersProjects);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async atualizaMembro(req, res) {
    const { id } = req.params;
    const atualizaMembro = req.body;
    try {
      await database.Users_Projects.update(
        {
          ResponsabilidadeId: atualizaMembro.responsabilidade_id,
          st_partic: atualizaMembro.st_partic,
        },
        {
          where: { id: Number(id) },
        }
      );
      const membroAtualizado = await database.Users_Projects.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(membroAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletaMembro(req, res) {
    const { id } = req.params;
    try {
      const deleted = await database.Users_Projects.destroy({
        where: { id: Number(id) },
      });
      if (deleted) {
        return res
          .status(200)
          .json({ message: `Membro com id ${id} excluido com sucesso.` });
      }
      throw new Error(`Membro com id ${id} não encontrado`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async projetoComCronogramasETarefas(req, res) {
    const { id } = req.params;
    try {
      const projeto = await database.Projeto.findOne({
        where: { id: Number(id) },
        attributes: [
          "id",
          "name",
          "descricao",
          "data_inicio",
          "previsao_conclusao",
        ],
        include: [
          {
            model: database.Tarefa,
            as: "ass_project_tarefa",
            attributes: [
              "id",
              "nome_ordem",
              "execucao",
              "data_inicial",
              "prazo",
              "data_conclusao",
              "responsavel_id",
            ],
            include: [
              {
                model: database.Status,
                as: "ass_tarefa_status",
                attributes: ["id", "name"],
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
                    attributes: ["id", "name"],
                  },
                  {
                    model: database.Users,
                    as: "ass_task_users",
                    attributes: ["name"],
                  },
                ],
              },
            ],
          },
          {
            model: database.Status,
            as: "ass_project_status",
            attributes: ["name"],
          },
        ],
        order: [
          [
            { model: database.Tarefa, as: "ass_project_tarefa" },
            "execucao",
            "ASC",
          ],
          [
            { model: database.Tarefa, as: "ass_project_tarefa" },
            { model: database.Sub_Tarefa, as: "ass_tarefa_task" },
            "execucao",
            "ASC",
          ],
        ],
      });

      return res.status(200).json(projeto);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async getProjetoDetalhes(req, res) {
    const { id } = req.params;
    try {
      const projectDetails = await database.Projeto.findByPk(Number(id), {
        attributes: ["id", "name", "descricao", "data_inicio", "previsao_conclusao", "coord_id", "sexec_id", "projeto_arquivado", "motivo_arquivado", "numero_programa", "valor"],
        include: [
          {
            model: database.Users_Projects,
            as: "ass_project",
            attributes: ["id"],
            separate: true,
            include: [
              {
                model: database.Users,
                as: "ass_project_users",
                attributes: ["id", "name"],
              },
              {
                model: database.Responsabilidade,
                as: "ass_project_resp",
                attributes: ["tipo_responsabilidade"],
              },
            ],
            order: [
              [
                { model: database.Users, as: "ass_project_users" },
                "profile_id",
                "ASC",
              ],
              [
                { model: database.Users, as: "ass_project_users" },
                "name",
                "ASC",
              ],
            ],
          },
          {
            model: database.Coordenadorias,
            as: "ass_project_coordenadoria",
            attributes: ["coordenadoria", "sigla"],
          },
          {
            model: database.Secretaria_Executivas,
            as: "ass_project_sexec",
            attributes: ["secretaria", "sigla"],
          },
          {
            model: database.Status,
            as: "ass_project_status",
            attributes: ["id", "name"],
          },
        ],
      });

      if (!projectDetails) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.status(200).json(projectDetails);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateProjectStatus(req, res) {
    const { id } = req.params;
    const { status_id } = req.body;
    try {
      const [updated] = await database.Projeto.update(
        { status_id },
        { where: { id: Number(id) } }
      );
      if (updated) {
        const updatedProject = await database.Projeto.findOne({
          where: { id: Number(id) },
          attributes: ["id", "name", "data_inicio"],
          include: [
            {
              model: database.Status,
              as: "ass_project_status",
              attributes: ["id", "name"],
            },
            {
              model: database.Users_Projects,
              as: "ass_project",
              attributes: ["id"],
              include: [
                {
                  model: database.Users,
                  as: "ass_project_users",
                  attributes: ["name"],
                },
                {
                  model: database.Responsabilidade,
                  as: "ass_project_resp",
                  attributes: ["tipo_responsabilidade"],
                },
              ],
            },
            {
              model: database.Coordenadorias,
              as: "ass_project_coordenadoria",
              attributes: ["coordenadoria", "sigla"],
            },
            {
              model: database.Secretaria_Executivas,
              as: "ass_project_sexec",
              attributes: ["secretaria", "sigla"],
            },
          ],
        });
        return res.status(200).json(updatedProject);
      }
      throw new Error("Project not found");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaProjeto(req, res) {
      const { id } = req.params;
      const atualiza = req.body;
      console.log('atualiza', atualiza)
      try {
        await database.Projeto.update(atualiza, {
          where: { id: Number(id) },
        });
        const projetoAtualizado = await database.Projeto.findOne({
          where: { id: Number(id) },
        });
        return res.status(200).json(projetoAtualizado);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

  static async arquivaProjeto(req, res) {
    const { id } = req.params;
    const arquiva = req.body;
    // console.log('arquiva', arquiva)
    try {
      await database.Projeto.update(
        {
          projeto_arquivado: true,
          motivo_arquivado: arquiva.justificativa,
          status_id: 5,
        }, // Valores a serem atualizados
        { where: { id: Number(id) } } // Condição
      );
      const projetoArquivado = await database.Projeto.findOne({
        where: { id: Number(id) },
      });

      await database.Audit.create({
        user_id: arquiva.user_id,
        tipo_acao: arquiva.tipo_acao,
        acao: `Projeto ${projetoArquivado.name} foi arquivado.`,
      });
      return res.status(200).json(projetoArquivado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // static async deletaProjeto(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const deleted = await database.Projeto.destroy({ where: { id: Number(id) } });
  //     if (deleted) {
  //       return res.status(200).json({ message: `Project with id ${id} deleted successfully.` });
  //     }
  //     throw new Error(`Project with id ${id} not found`);
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message });
  //   }
  // }
}

module.exports = ProjectControllers;
