var mongoose = require('mongoose')

var ProjectSchema = new mongoose.Schema({
  name: {type:String, default: ''},
  description: {type:String, default: ''},
  image: {type:String, default: ''},
  demo: {type:String, default: ''},
  tools: {type:Array, default:[]},
  month: {type:String, default: ''},
  year: {type:String, default: ''},
  github: {type:String, default: ''},
  timestamp: {type:Date, default: Date.now}
})

module.exports = mongoose.model('ProjectSchema', ProjectSchema)