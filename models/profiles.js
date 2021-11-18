const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profile = new Schema({
    profile_id: {type:String , default:''},
    link: {type:String, default:''},
    name: {type:String, default:''},
    address: {type:Array ,default:''},
    avt_imgs: {type:Array, default:''},
    imgs:{type:Array, default:''},
    posts: [
      {
        author_id: String,
        time : String,
        content: String,
        link : String,
        img_links : Array,
      }
    ],
    friends: {type:Array, default:''}
  });
module.exports = mongoose.model('profile', profile);