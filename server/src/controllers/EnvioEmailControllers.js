const database = require("../models");
const { Sequelize } = require("sequelize");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "172.26.2.26", // relay.etice.ce.gov.br
  port: 25,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

async function enviarEmail(destinatario, compromisso) {
  try {
    const info = await transporter.sendMail({
      from: "gestaodeprojetos@sde.ce.gov.br",
      to: destinatario,
      subject: "Atualização de Compromisso",
      html: `
      <p>O compromisso <strong>"${compromisso}"</strong> ainda está pendente.</p>
      <p>Por favor, atualize o status do compromisso através diretamente no sistema <a href="https:www.gestaoprojetos.sde.ce.gov.br">Gestão de projetos</a></p>
      `,
    });

    console.log(`E-mail enviado para ${destinatario}:`, info.messageId);
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${destinatario}:`, error);
  }
}

async function monitorarCompromissos() {
  while (true) {
    try {
      const compromissosPendentes = await database.Compromisso.findAll({
        where: { status_id: { [Sequelize.Op.ne]: 4 } },
        attributes: ["id", "compromisso"],
        include: [
          {
            model: database.Users,
            as: "ass_commitment_users",
            attributes: ["name", "user_email"],
          },
        ],
      });

      await Promise.all(
        compromissosPendentes.map(async (compromisso) => {
          const user = compromisso.ass_commitment_users;

          if (user?.user_email) {
            // console.log("user.user_email", user.user_email);
            await enviarEmail(user.user_email, compromisso.compromisso);
          } else {
            console.warn(
              `Compromisso sem usuário ou email associado: ID ${compromisso.id || "desconhecido"}`
            );
          }
        })
      );

      console.log(
        `Verificação concluída. Total de compromissos pendentes: ${compromissosPendentes.length}`
      );
    } catch (error) {
      console.error("Erro ao monitorar compromissos:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 7 * 24 * 60 * 60 * 1000)); // Espera 1 semana
  }
}

module.exports = {
  monitorarCompromissos,
};
