var mongoose = require('mongoose')

var InquirySchema = new mongoose.Schema({
  fullName: {type:String, default: ''},
  phone: {type:String, default: ''},
  email: {type:String, default: ''},
  subject: {type:String, default: ''},
  message: {type:String, default: ''},
  timestamp: {type:Date, default: Date.now}
})

module.exports = mongoose.model('InquirySchema', InquirySchema)