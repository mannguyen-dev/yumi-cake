const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "mannguyensp@gmail.com",
        subject: "Thanks for join in!",
        text: `Welcome to the app, ${name}! Let me know how to get along with the app`,
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "mannguyensp@gmail.com",
        subject: "Sorry to see you go!",
        html: `<h1>Hope you come back, ${name}. Goodbye!<h1>`,
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
};
