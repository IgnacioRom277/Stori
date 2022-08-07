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

const allMail = async () => {
  const transporter = createTransp();
  const info = await transporter.sendMail({
    from: '"Stori Newsletter" <emailer.test.dev@gmail.com>',
    to: "ignaciorom27@gmail.com",
    subject: "¡El nuevo newsletter ya está aquí! Échale un vistazo...",
    attachments: [
      {
        filename: 'tapout.png',
        path: 'https://firebasestorage.googleapis.com/v0/b/stori-challenge-9a98c.appspot.com/o/newsletters%2Fcapture8bb5de0a-18b9-4352-a061-3f9fcaebd110?alt=media&token=d81df30c-0cfc-4915-bd03-49d38211c664'
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
      <form action="http://localhost:80/api/unsubscribe?userOId=62e9be8fe54981e10cdfe3de&newsletterOId=62eddf283573f9a87085dd57" method="post">
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
  });
  console.log('Mensaje enviado  :>> ', allMail.messageId);

  return;
}

exports.allMail = allMail;
