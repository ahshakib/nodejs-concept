import dotenv from "dotenv";
import express from "express";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5050;

const mailerSend = new MailerSend({
    apiKey: process.env.API_KEY,
});

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.get("/send-mail", async (req, res) => {
    try {
        const sentFrom = new Sender(
            "MS_JshEqb@trial-z3m5jgrz1eoldpyo.mlsender.net",
            "Aftab Shakib",
        );

        const recipients = [
            new Recipient("aftabshakib0@gmail.com"),
        ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("This is a testing email")
            .setHtml("<strong>Hi, this is a testing email. How are you? I am fine.</strong>");

        const result = await mailerSend.email.send(emailParams);
        if(result) {
            res.send("Email sent successfully");
        } else {
            res.send("Failed to send email");
        }
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
