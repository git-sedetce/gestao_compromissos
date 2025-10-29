const database = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

class UserControllers {
  static async pegaUser(req, res) {
    try {
      /*
            const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN)
            if(!claims){
                return res.status(401).send({message: 'Usuário não autenticado!'})
            }*/
      const getUser = await database.Users.findAll({
        order: ["name"],
        attributes: [
          "id",
          "name",
          "user_name",
          "user_email",
          "user_active",
          "profile_id",
          "coord_id",
          "sexec_id",
        ],
        include: [
          {
            association: "ass_users_perfil",
            where: (database.Profile.id = database.Users.profile_id),
            attributes: ["name"],
          },
          {
            association: "ass_users_coord",
            where: (database.Coordenadorias.id = database.Users.coord_id),
            attributes: ["id", "coordenadoria", "sigla"],
          },
          {
            association: "ass_users_sexec",
            where: (database.Secretaria_Executivas.id =
              database.Users.sexec_id),
            attributes: ["id", "secretaria", "sigla"],
          },
        ],
      });
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error.message); //.json({message: 'Usuário não autenticado!'})
    }
  }

  static async pegaUserActive(req, res) {
    try {
      /*
            const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN)
            if(!claims){
                return res.status(401).send({message: 'Usuário não autenticado!'})
            }*/
      const getUser = await database.Users.findAll({
        order: ["name"],
        where: {user_active: true},
        attributes: [
          "id",
          "name",
          "user_name",
          "user_email",
          "user_active",          
        ]
        
      });
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error.message); //.json({message: 'Usuário não autenticado!'})
    }
  }

  static async pegaUsers(req, res) {
    try {
      /*const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, 'secret')
            if(!claims){
                return res.status(401).send({message: 'Usuário não autenticado!'})
            }*/
      const getUser = await database.Users.findAll({
        order: ["name"],
        attributes: ["name", "user_name", "user_email"],
        include: [
          {
            association: "ass_users_perfil",
            where: (database.Profile.id = database.Users.profile_id),
            attributes: ["name"],
          },
          {
            association: "ass_users_coord",
            where: (database.Coordenadorias.id = database.Users.coord_id),
            attributes: ["coordenadoria", "sigla"],
          },
          {
            association: "ass_users_sexec",
            where: (database.Secretaria_Executivas.id =
              database.Users.sexec_id),
            attributes: ["secretaria", "sigla"],
          },
        ],
      });
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error.message); //.json({message: 'Usuário não autenticado!'})
    }
  }

  static async pegaUmUser(req, res) {
    const { id } = req.params;
    try {
      const user = await database.Users.findOne({
        where: { id: Number(id) },
        attributes: ["name", "user_name", "user_email"],
        include: [
          {
            association: "ass_project_resp",
            where: (database.Projeto.responsavel_id = database.Users.id),
            attributes: ["name", "descricao", "data_inicio"],
            include: [
              {
                association: "ass_project_status",
                where: (database.Projeto.status_id = database.Status.id),
                attributes: ["name"],
              },
            ],
          },
          {
            association: "ass_project_create",
            where: (database.Projeto.craidoPor_id = database.Users.id),
            attributes: ["name", "descricao", "data_inicio"],
            include: [
              {
                association: "ass_project_status",
                where: (database.Projeto.status_id = database.Status.id),
                attributes: ["name"],
              },
            ],
          },
          {
            association: "ass_project_coord",
            where: (database.Projeto.coordenacao_id = database.Users.id),
            attributes: ["name", "descricao", "data_inicio"],
            include: [
              {
                association: "ass_project_status",
                where: (database.Projeto.status_id = database.Status.id),
                attributes: ["name"],
              },
            ],
          },
          {
            association: "ass_project_gerenc",
            where: (database.Projeto.gerente_id = database.Users.id),
            attributes: ["name", "descricao", "data_inicio"],
            include: [
              {
                association: "ass_project_status",
                where: (database.Projeto.status_id = database.Status.id),
                attributes: ["name"],
              },
            ],
          },
          {
            association: "ass_users_perfil",
            where: (database.Profile.id = database.Users.profile_id),
            attributes: ["name"],
          },
          {
            association: "ass_users_coord",
            where: (database.Coordenadorias.id = database.Users.coord_id),
            attributes: ["coordenadoria", "sigla"],
          },
          {
            association: "ass_users_sexec",
            where: (database.Secretaria_Executivas.id =
              database.Users.sexec_id),
            attributes: ["secretaria", "sigla"],
          },
        ],
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarUmUser(req, res) {
    const { id } = req.params;
    try {
      const user = await database.Users.findOne({
        where: { id: Number(id) },
        attributes: ["name"],
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  /*static async consultaUsuario(req, res){
        const { id } = req.params;
        try{
            const user = await database.Users.findOne({
                where: { id: Number(id) },
                attributes: ["name", "user_name", "user_email"],
                include: [
                    {
                        association: "ass_users_project",
                        where: database.Users_Projects.UserId = database.Users.id,
                        attributes: ["name"],
                        include: [
                            {
                                association: "ass_project_cronograma",
                                where: database.Users_Projects.ProjetoId = database.Cronograma.projeto_id,
                                attributes: ["nome_ordem", "data_inicial", "prazo", "data_conclusao"],
                                include: [
                                    {
                                        association: "ass_cronograma_status",
                                        where: database.Cronograma.status_id = database.Status.id,
                                        attributes: ["name"]
                                    },
                                    {
                                        association: "ass_cronograma_task",
                                        where: database.Cronograma.id = database.Tarefa.id,
                                        attributes: ["nome_tarefa", "data_inicial", "prazo", "data_conclusao"],
                                        include: [
                                            {
                                                association: "ass_task_status",
                                                where: database.Tarefa.status_id = database.Status.id,
                                                attributes: ["name"]
            
                                        }
                                    ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        association: "ass_users_perfil",
                        where: database.Profile.id = database.Users.profile_id,
                        attributes: ["name"]
                    },                   
                    
                ]
            })
            return res.status(200).json(user);
        }catch (error){
            return res.status(500).json(error.message)
        }

    }*/

  static async cadastraUser(req, res) {
    const novoUser = req.body;
    // console.log('novoUser', novoUser)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(novoUser.user_password, salt);
    novoUser.user_password = hashedPassword;
    /*const hashedConfirmPassword = await bcrypt.hash(novoUser.user_confirm_password, salt)
        novoUser.user_confirm_password = hashedConfirmPassword*/
    //const newUser =  [novoUser.name, novoUser.email, novoUser.password ]
    try {
      const criarUser = await database.Users.create({
        name: novoUser.name,
        user_name: novoUser.user_name,
        user_email: novoUser.user_email,
        user_password: novoUser.user_password,
        profile_id: 4,
        coord_id: novoUser.coord_id,
        sexec_id: novoUser.sexec_id,
        //user_confirm_password: novoUser.user_confirm_password
      });
      const result = await criarUser.save();
      const { password, ...data } = await result.toJSON();
      res.send(data);
      //return res.status(200).json(criarUser)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async verificaLogin(req, res) {
    const user = req.body;
    // console.log('user', user)
    try {
      const verificaUser = await database.Users.findOne({
        where: { user_email: user.user_email },
      });
      if (!verificaUser) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }
      if (!verificaUser.user_active) {
        return res
          .status(400)
          .send({ message: "Consulte o Administrador do sistema" });
      }
      if (
        !(await bcrypt.compare(
          req.body.user_password,
          verificaUser.user_password
        ))
      ) {
        return res.status(400).send({ message: "Crendenciais inválidos!" });
      }

      const token = jwt.sign(
        {
          _id: verificaUser.id,
          _profile_id: verificaUser.profile_id,
          _user_name: verificaUser.user_name,
          _sexec_id: verificaUser.sexec_id,
          _coord_id: verificaUser.coord_id,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: 24 * 60 * 60 * 1000 }
      );

      return res.json({ auth: true, token: token });

      /*res.cookie('jwt', token, {
                httpOnly:true,
                maxAge: 24*60*60*1000
            })*/
      res.send({ message: "Usuário logado com sucesso!" });
      //res.send(verificaUserEmail)
      //return res.status(200).json(verificaUserEmail)
    } catch (error) {
      res.send({ message: "Problemas ao realizar login!" });
      //return res.status(500).json(error.message)
    }
  }
  /*static async authenticatedUser(req, res){
        try{
            const token = req.headers['x-access-token']

            const claims = jwt.verify(token, process.env.ACCESS_TOKEN)

            if(!claims){
                return res.status(401).send({message: 'Usuário não autenticado!'})
            }

            const user = await database.Users.findOne({
                where: {id: claims._id}
            })

            const { password, ...data } = await user.toJSON()
            res.send(data)

        }catch(error){
            return res.status(401).send({message: 'Usuário não autenticado!'})

        }
        
    }*/

  static async resetPassword(req, res) {
    const user = req.body;
    // console.log('user', user)
    try {
      const verificaUser = await database.Users.findOne({
        where: { user_email: user.user_email },
      });
      if (!verificaUser) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }
      let newPassword = user.user_password;
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      newPassword = hashedNewPassword;
      // console.log('newPassword', newPassword)

      const novaSenha = await database.Users.update(
        { user_password: newPassword },
        { where: { user_email: user.user_email } }
      );

      //const  result = await novaSenha.save()
      //const { password, ...data } = await result.toJSON()
      res.send({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      //res.send(verificaUserEmail)
      return res.status(500).json(error.message);
    }
  }

  static async logout(req, res) {
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({ message: "Logout Success!" });
  }

  static async consultaEmail(req, res) {
    const { email } = req.params;
    try {
      const verificaEmail = await database.Users.findOne({
        where: { user_email: email },
        attributes: ["user_name", "user_email"],
      });
      if (verificaEmail === null) {
        return res
          .status(200)
          .json({ mensagem: `Email autorizado para cadastro` });
      } else {
        return res.status(200).json({ mensagem: `Email já cadastrado!` });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUsersByProfile(req, res) {
    const { id } = req.params;
    try {
      /*const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, 'secret')
            if(!claims){
                return res.status(401).send({message: 'Usuário não autenticado!'})
            }*/
      const getUser = await database.Users.findAll({
        order: ["id"],
        attributes: ["name", "user_name", "user_email"],
        where: { profile_id: id },
        include: [
          {
            association: "ass_users_perfil",
            where: (database.Profile.id = database.Users.profile_id),
            attributes: ["name"],
          },
        ],
      });
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error.message); //.json({message: 'Usuário não autenticado!'})
    }
  }

  static async atualizaUser(req, res) {
    const { id } = req.params;
    const user = req.body;
    // console.log('user', user)
    try {
      await database.Users.update(user, { where: { id: Number(id) } });
      const updateUser = await database.Users.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updateUser);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletaUsers(req, res) {
    const { id } = req.params;
    const apaga = req.body;
    try {
      await database.Users.destroy({ where: { id: Number(id) } });
      return res.status(200).json({
        mensagem: `O Usuario ${apaga.user_name} foi excluido com sucesso!!`,
      });
    } catch (erro) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUsersByProject(req, res) {
    const { id } = req.params;
    try {
      /*const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, 'secret')
            if(!claims){
                return res.status(401).send({message: 'Usuário não autenticado!'})
            }*/
      const getUser = await database.Users_Projects.findAll({
        order: ["id"],
        where: { ProjetoId: id },
        include: [
          {
            association: "ass_project_users",
            where: (database.Users_Projects.UserId = database.Users.id),
            attributes: ["name"],
          },
        ],
      });
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error.message); //.json({message: 'Usuário não autenticado!'})
    }
  }

  static async pegaUsersInd(req, res) {
    try {
      /*const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, 'secret')
            if(!claims){
                return res.status(401).send({message: 'Usuário não autenticado!'})
            }*/
      const getUser = await database.Users.findAll({
        order: ["name"],
        where: { sexec_id: 2, user_active: true },
        attributes: ["id", "name", "user_name", "user_email"],
        include: [
          {
            association: "ass_users_perfil",
            where: (database.Profile.id = database.Users.profile_id),
            attributes: ["name"],
          },
          {
            association: "ass_users_coord",
            where: (database.Coordenadorias.id = database.Users.coord_id),
            attributes: ["coordenadoria", "sigla"],
          },
          {
            association: "ass_users_sexec",
            where: (database.Secretaria_Executivas.id =
              database.Users.sexec_id),
            attributes: ["secretaria", "sigla"],
          },
        ],
      });
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error.message); //.json({message: 'Usuário não autenticado!'})
    }
  }

  static async pegaUsersCompromisso(req, res) {
    try {
      const getUser = await database.Compromisso.findAll({
        attributes: ["id","compromisso", "data_inicial", "prazo", "status_id"],
        where: {status_id: { [database.Sequelize.Op.ne]: 4 }},
        order: [["data_inicial", "ASC"]],
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
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error.message); //.json({message: 'Usuário não autenticado!'})
    }
  }

  static async pegaUsersCompromissoFinished(req, res) {
    // const resp_id = parseInt(req.params.resp_id, 10); 
    const resp_id = req.params;
    // console.log('id', resp_id.id)

    if (isNaN(resp_id.id)) {
    return res.status(400).json({ message: "O parâmetro 'resp_id' precisa ser um número válido." });
  }

    try {
      const getUser = await database.Compromisso.findAll({
        attributes: ["id","compromisso", "data_inicial", "prazo", "status_id"],
        where: { status_id: 4, responsavel_id: Number(resp_id.id) },
        order: [["data_inicial", "ASC"]],
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
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error.message); //.json({message: 'Usuário não autenticado!'})
    }
  }

  static async pegaCompromissoFinished(req, res) {   

    try {
      const getUser = await database.Compromisso.findAll({
        attributes: ["id","compromisso", "data_inicial", "prazo", "status_id"],
        where: { status_id: 4 },
        order: [["data_inicial", "ASC"]],
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
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error.message); //.json({message: 'Usuário não autenticado!'})
    }
  }

  static async pegaUsersCompromissobyId(req, res) {
    const { id } = req.params;
    try {
      const getUser = await database.Compromisso.findAll({
        attributes: ["id","compromisso", "data_inicial", "prazo", "status_id"],
        where: {status_id: { [database.Sequelize.Op.ne]: 4 }, responsavel_id: id},
        order: [["data_inicial", "ASC"]],
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
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error.message); //.json({message: 'Usuário não autenticado!'})
    }
  }
}

module.exports = UserControllers;
