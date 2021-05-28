const { Schema, model } = require('mongoose')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact']
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    favorite: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      }
    },
    toObject: { virtuals: true }
  }
)

contactSchema.virtual('info').get(function () {
  return `This is contact ${this.phone} of ${this.name}'s`
})

const Contact = model('contact', contactSchema)

module.exports = Contact
