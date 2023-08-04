import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function sendEmail({to, url, text}
    : {to:string, url:string, text: string}): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOption = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'sdsoft | next-auth-v4',
        html: html({url, text})
    }

    console.log({mailOption});

    const result = await transporter.sendMail(mailOption);
    console.log({result});
    return result;
}

function html({url, text}: {url: string, text: string}): string {
    return `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size:110%">
        <h2>verify mail</h2>
        <p>Congratulations! You are almost set to start using next-auth-v4. 
        Just click the button below to validate your email address.
        </p>
        <a href=${url} style="background:crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;" >${text}</a>
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
	    <div>${url}</div>
    </div>
    `;
}

