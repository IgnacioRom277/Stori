const nodemailer = require('nodemailer');

const createTransp = () => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'emailer.test.dev@gmail.com',
      pass: 'vpgujxfczxskderm',
    }
  });

  return transport;
}

const allMail = async (recipients, newsletter) => {
  const transporter = createTransp();

  // recipients.forEach((recipient, newsletter) => {
    console.log('recipients AllMail :>> ', recipients);
  for(let recipient of recipients) {
    const msg = {
      from: '"Stori Newsletter" <emailer.test.dev@gmail.com>',
      subject: `¡${recipient.name}! El nuevo newsletter ya está aquí. Échale un vistazo...`,
      attachments: [
        {
          filename: newsletter.filename,
          path: newsletter.url
        },
      ],
      html: `
        <div style="width: 900px; margin: auto;">
          <span
            style="
                display: table-row;
                width: 600px;
                text-align: center;
                background: #dfdddd79;
              "
          >
            <span
              style="
                  display: table-row;
                  min-width: 600px;
                  min-height: 250px;
                  height: 250px;
                "
            >
              <img
                style="border-radius: 40px"
                src="https://www.storicard.com/static/images/stori_iconoOG_small.png"
                alt="stori_logo"
              />
            </span>
            <span
              style="
                  display: table-row;
                  min-width: 600px;
                  min-height: 250px;
                  height: 250px;
                "
            >
              <p
                style="
                  font-family: 'Graphik Web', Helvetica, sans-serif;
                  font-size: 3.6em;
                  line-height: 1.25em;
                  font-weight: 500;
                  font-style: normal;
                  color: #111324;
                  width: 100%;
                  margin: 16px 0;
                  padding: 0;
                  text-align: center;
                ">
                ${recipient.name}
              </p>
              <h3
                style="
                    font-family: 'Graphik Web', Helvetica, sans-serif;
                    font-size: 3.6em;
                    line-height: 1.25em;
                    font-weight: 500;
                    font-style: normal;
                    color: #111324;
                    width: 100%;
                    margin: 0 auto 14px;
                    padding: 0;
                    text-align: center;
                  "
              >
                ¡Las novedades de este mes ya llegaron!
              </h3>
              <p
                style="
                    font-size: 1.8em;
                    line-height: 1.5em;
                    color: #111324;
                    padding: 0;
                    margin: 0 auto 1.25em;
                    text-align: center;
                  "
              >
                Adjunto podrás encontrar nuestros newsletter más recientes
              </p>
            </span>
            <span
              style="
                  display: table-row;
                  min-width: 600px;
                  min-height: 250px;
                  height: 250px;
                  text-align: center;
                  width: 600px;
                  background: rgb(0, 120, 136);
                  padding-top: 50px;
                "
            >
              <h3
                style="
                    font-family: 'Graphik Web', Helvetica, sans-serif;
                    font-size: 2.5em;
                    line-height: 1.25em;
                    font-weight: 500;
                    font-style: normal;
                    color: #fff;
                    width: 100%;
                    margin: 0 auto 14px;
                    padding-top: 25px;
                    text-align: center;
                  "
              >
                ¿No quieres recibir las últimas noticias?
              </h3>
              <p
                style="
                    font-size: 1.8em;
                    line-height: 1.5em;
                    color: #fff;
                    padding: 0;
                    margin: 0 auto 1.25em;
                    text-align: center;
                  "
              >
                Puedes anular tu suscripción cuando quieras
              </p>
               <form action="http://localhost:80/api/unsubscribe?userOId=${recipient.id}&newsletterOId=${newsletter.id}" method="post">
                <button
                  style="
                      font-size: 1.3em;
                      text-align: center;
                      color: #fc5fc2;
                      background: white;
                      border: 3px solid #ff9fdc;
                      padding: 8px;
                      border-radius: 10px;
                      cursor: pointer;
                    "
                  type="hidden"
                >
                  Anular suscripción
                </button>
              </form>
            </span>
          </span>
        </div>
        `
    }
    
    msg.to = recipient.email;
    const info = await transporter.sendMail(msg);
    console.log('Mensaje enviado  :>> ', info, allMail.messageId);
  }

  return;
}

exports.allMail = allMail;
