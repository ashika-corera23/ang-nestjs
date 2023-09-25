import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_PASSWORD;

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
    //   service: 'gmail', // e.g., 'gmail'
      host: 'smtp.gmail.com', // Set the SMTP server host
      port: 465, // Use port 587 for STARTTLS // Set the port for SSL/TLS (or 587 for STARTTLS) 465
      secure: true, 
      debug: true,
      auth: {
        user: process.env.GMAIL_USER,// 'ashikafrancis19@gmail.com',
        pass: process.env.GMAIL_PASSWORD, //'Everista@10',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.GMAIL_USER,//'ashikafrancis19@gmail.com' ,//holx aaxp xrph nkhh
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      // console.log('Gmail User:', gmailUser);
      //   console.log('Gmail Password:', gmailPassword);

    }
  }
}
