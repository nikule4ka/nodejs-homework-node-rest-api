const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
  constructor(env, sender) {
    this.sender = sender
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break

      case 'production':
        this.link = 'link production'
        break

      default:
        this.link = 'http://localhost:3000'
        break
    }
  }
  #createTemplateVerificationEmail(verifyToken, name) {
    const mailGenerator = new Mailgen({
      theme: 'cerberus',
      product: {
        name: 'Contacts System',
        link: this.link
      }
    })
    const email = {
      body: {
        name,
        intro:
          "Welcome to Contacts System! We're very excited to have you on board.",
        action: {
          instructions:
            'To get started with Contacts System, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`
          }
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help."
      }
    }
    return mailGenerator.generate(email)
  }
  async sendVerifyEmail(verifyToken, email, name) {
    const emailHtml = this.#createTemplateVerificationEmail(verifyToken, name)
    const msg = {
      to: email,
      subject: 'Verify your account',
      html: emailHtml
    }
    const result = await this.sender.send(msg)
    console.log(result)
  }
}

module.exports = EmailService
