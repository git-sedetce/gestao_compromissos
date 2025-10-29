const database = require("../models");
const dayjs = require("dayjs");
const { Sequelize, DataTypes, Op, literal } = require("sequelize");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "172.26.2.26", //relay.etice.ce.gov.br
  port: 25,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

// Função para enviar e-mail
async function enviarEmail(listaCompromissos) {
    const destinatario = [
      "germano.gurgel@sde.ce.gov.br",
      "rennys.frota@sde.ce.gov.br",
    ];
  
    const linhas = listaCompromissos.map(compromisso => `
      <tr>
        <td>${compromisso.compromisso}</td>
        <td>${compromisso.ass_commitment_users.name}</td>
        <td>${compromisso.ass_commitment_users.user_email}</td>
        <td>${dayjs(compromisso.data_inicial).format("DD/MM/YYYY")}</td>
        <td>${compromisso.prazo}</td>
        <td>${compromisso.ass_commitment_meet?.nome_reuniao || ""}</td>
        <td>${dayjs(compromisso.ass_commitment_meet?.data_reuniao).format("DD/MM/YYYY") || ""}</td>
        <td>${compromisso.ass_commitment_status.name}</td>
      </tr>
    `).join("");
  
    const htmlBody = `
      <p>Segue abaixo os compromissos da semana:</p>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Compromisso</th>
            <th>Responsável</th>
            <th>Email do Responsável</th>
            <th>Data de Início</th>
            <th>Prazo</th>
            <th>Reunião</th>
            <th>Data da Reunião</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${linhas}
        </tbody>
      </table>
    `;
  
    try {
      let info = await transporter.sendMail({
        from: "gestaodeprojetos@sde.ce.gov.br",
        to: destinatario,
        subject: "Compromissos da Semana",
        html: htmlBody,
      });
  
      console.log(`E-mail enviado para ${destinatario}:`, info.messageId);
    } catch (error) {
      console.error(`Erro ao enviar e-mail para ${destinatario}:`, error);
    }
  }
  

// Função para monitorar compromissos
async function listarCompromissos() {
  while (true) {
    try {
      const inicioSemana = dayjs().startOf("week").add(1, "day").toDate(); // segunda-feira
      const fimSemana = dayjs().endOf("week").add(1, "day").toDate(); // domingo

      const listaCompromissos = await database.Compromisso.findAll({
        where: {
          status_id: { [Op.ne]: 4 },
          // data_inicial + prazo entre início e fim da semana
          [Op.and]: [
            literal(
              `(data_inicial + INTERVAL '1 day' * prazo) BETWEEN '${inicioSemana.toISOString()}' AND '${fimSemana.toISOString()}'`
            ),
          ],
        },
        attributes: ["compromisso", "data_inicial", "prazo"],

        include: [
          {
            model: database.Users,
            as: "ass_commitment_users",
            attributes: ["name", "user_email"],
          },
          {
            model: database.Reuniao,
            as: "ass_commitment_meet",
            attributes: ["nome_reuniao", "data_reuniao"],
          },
          {
            model: database.Status,
            as: "ass_commitment_status",
            attributes: ["name"],
          },
        ],
      });

    //   console.log("listaCompromissos", listaCompromissos);

      if (listaCompromissos.length > 0) {
        await enviarEmail(listaCompromissos);
      }
      console.log(
        `Verificação concluída. Total de compromissos pendentes: ${listaCompromissos.length}`
      );
    } catch (error) {
      console.error("Erro ao monitorar compromissos:", error);
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 7 * 24 * 60 * 60 * 1000)
    ); // Espera 1 dia antes de verificar novamente
  }
}

// Iniciar monitoramento
module.exports = {
  listarCompromissos,
};
