const database = require("../models");
const path = require("path");
const fs = require("fs");
const baseUrl = process.cwd() + "/src"; //__dirname + '.

class ReunioesControllers {
  static async cadastraReunioes(req, res) {
    const newMeet = req.body;
    // console.log("newMeet", newMeet);
    try {
      const newProject = await database.Reuniao.create(newMeet);
      return res.status(200).json(newProject);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async allReunioes(req, res) {
    try {
        const mostrarReunioes = await database.Reuniao.findAll({
            attributes: [
                "nome_reuniao",
                "data_reuniao",
                "horario_inicial",
                "duracao",
                "horario_final",
                "pauta",
                "compromissos_concluidos"
            ],
            include: [
                {
                    model: database.Projeto,
                    as: "ass_meet_project",
                    attributes: ["name", "descricao"],
                },
                {
                    model: database.Cronograma,
                    as: "ass_meet_cronograma",
                    attributes: ["nome_ordem"],
                },
                {
                    model: database.Tarefa,
                    as: "ass_meet_tarefa",
                    attributes: ["nome_tarefa"],
                },
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
                    model: database.Periodicidade,
                    as: "ass_meet_periodicidade",
                    attributes: ["periodicidade"],
                },
                {
                    model: database.Atas,
                    as: "ass_meet_register",
                    attributes: ["nome_ordem"],
                },
            ],
        });

        return res.status(200).json(mostrarReunioes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


  static async allReunioes(req, res) {
    try {
      const mostrarReunioes = await database.Reuniao.findAll({
        order: ["id"],
        attributes: [
          "nome_reuniao",
          "data_reuniao",
          "horario_inicial",
          "duracao",
          "horario_final",
          "pauta",
        ],
        include: [        
          {
            association: "ass_meet_task",
            where: (database.Reuniao.id = database.Tarefa.reuniao_id),
            attributes: ["nome_ordem"],
          },
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
            association: "ass_meet_periodicidade",
            where: (database.Reuniao.periodicidade = database.Periodicidade.id),
            attributes: ["periodicidade"],
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


  static async allPeriodicity(req, res) {
    try {
      const mostrarPeriodicidade = await database.Periodicidade.findAll({
        order: ["id"],
        attributes: ["id", "periodicidade"],
      });
      return res.status(200).json(mostrarPeriodicidade);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async umaReuniao(req, res) {
    const { id } = req.params;
    try {
      const mostraUmaReuniao = await database.Reuniao.findOne({
        order: [["data_reuniao", "DESC"]],
        where: { id: Number(id) },
        attributes: [
          "id",
          "nome_reuniao",
          "data_reuniao",
          "horario_inicial",
          "duracao",
          "horario_final",
          "pauta",
          'compromissos_concluidos'
        ],
        include: [
          {
            association: "ass_meet_project",
            where: (database.Reuniao.projeto_id = database.Reuniao.id),
            attributes: ["name", "descricao"],
          },
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
            association: "ass_meet_periodicidade",
            where: (database.Reuniao.periodicidade = database.Periodicidade.id),
            attributes: ["periodicidade"],
          },
          {
            association: "ass_meet_register",
            where: (database.Reuniao.id = database.Atas.reuniao_id),
            attributes: ["id", "ata"],
          },
        ],
      });
      return res.status(200).json(mostraUmaReuniao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async meetByProject(req, res) {
    const { id } = req.params;
    // console.log("id", id);
    try {
      const mostraUmaReuniao = await database.Reuniao.findAll({
        where: { projeto_id: id, ata_registrada: false },
        attributes: [
          "id",
          "nome_reuniao",
          "data_reuniao",
          "horario_inicial",
          "duracao",
          "horario_final",
          "pauta",
        ],
        include: [
          {
            association: "ass_meet_project",
            where: (database.Reuniao.projeto_id = database.Reuniao.id),
            attributes: ["name", "descricao"],
          },
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
            association: "ass_meet_periodicidade",
            where: (database.Reuniao.periodicidade = database.Periodicidade.id),
            attributes: ["periodicidade"],
          },
        ],
      });
      return res.status(200).json(mostraUmaReuniao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastraAta(req, res) {
    const novaAta = req.body;
    const { id } = req.params;   
    // console.log("novaAta", novaAta);  
      try {
        const anexarAta = await database.Atas.create({
          ata: novaAta.ata,
          reuniao_id: id,});
        await database.Reuniao.update(
          {
            ata_registrada: true,
          },
          {
            where: { id: Number(id) },
          }
        );
        // console.log("anexarAta", anexarAta);
        return res.status(200).json({ message: "Ata cadastrada com sucesso!" });
      } catch (error) {
        return res.status(500).json(error.message);
      }    
  }

  static async meetByRegister(req, res) {
    const { id } = req.params;
    // console.log("id", id);
    try {
      const mostraUmaReuniao = await database.Reuniao.findAll({
        order: [["id", "DESC"]],
        where: { projeto_id: id, ata_registrada: true },
        attributes: [
          "id",
          "nome_reuniao",
          "data_reuniao",
          "horario_inicial",
          "duracao",
          "horario_final",
          "pauta",
        ],
        include: [
          {
            association: "ass_meet_project",
            where: (database.Reuniao.projeto_id = database.Reuniao.id),
            attributes: ["name", "descricao"],
          },
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
            association: "ass_meet_periodicidade",
            where: (database.Reuniao.periodicidade = database.Periodicidade.id),
            attributes: ["periodicidade"],
          },
          {
            association: "ass_meet_register",
            where: (database.Reuniao.id = database.Atas.reuniao_id),
            attributes: ["id", "ata"],
          }
        ],
      });
      return res.status(200).json(mostraUmaReuniao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async ataId(req, res) {
    const { id } = req.params;
    try {
      const mostraUmaReuniao = await database.Atas.findOne({
        where: { id: Number(id) },
        attributes: [
          "id",
          "ata",
          "reuniao_id",          
        ],
        include: [          
          {
            association: "ass_register_meet",
            where: (database.Atas.reuniao_id = database.Reuniao.id ),
            attributes: ["id", "nome_reuniao","pauta"],
          },
        ],
      });
      return res.status(200).json(mostraUmaReuniao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async finalizarCompromisso(req, res) {
      const { id } = req.params;
      const atualizaReuniao = req.body;
      // console.log('atualizaReuniao', atualizaReuniao)
      try {
        await database.Reuniao.update(
          {
            compromissos_concluidos: atualizaReuniao.compromissos_concluidos
          },
          {
            where: { id: Number(id) },
          }
        );
        const compromissosAtualizado = await database.Reuniao.findOne({
          where: { id: Number(id) },
        });
        return res.status(200).json(compromissosAtualizado);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

  static async deletaReuniao(req, res) {
      const { id } = req.params;
      try {
        const deleted = await database.Reuniao.destroy({
          where: { id: Number(id) },
        });
        if (deleted) {
          return res
            .status(200)
            .json({ message: `Reunião com id ${id} excluido com sucesso.` });
        }
        throw new Error(`Reunião com id ${id} não encontrado`);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
}

module.exports = ReunioesControllers;
