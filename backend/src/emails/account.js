const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "mannguyen.dev@gmail.com",
        subject: "Cảm ơn bạn đã tham gia!",
        html: `<h1>Chào mừng bạn đến với YumiCake!. Hãy tận dụng những ưu đãi hấp dẫn đang chờ bạn!</h1><p>Truy cập ngay: <a href="https://yumicake-frontend.netlify.app/">link<a></p>`,
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "mannguyen.dev@gmail.com",
        subject: "Thật tiếc khi bạn rời khỏi!",
        html: `<h1>Hi vọng bạn có thể quay lại, ${name}. Chào tạm biệt!</h1>`,
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
};
