const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profile = new Schema({
  profile_id: { type: String, default: '' },
  ngaysinh: { type: String, default: 'Không Xác Định' },
  gioitinh: { type: String, default: 'Không Xác Định' },
  link: { type: String, default: '' },
  name: { type: String, default: '' },
  address: { type: Array, default: ['Chờ Cập Nhật'] },
  avt_imgs: { type: Array, default: ['Chờ Cập Nhật'] },
  imgs: { type: Array, default: ['Chờ Cập Nhật'] },
  page: { type: Array, default: ['Chờ Cập Nhật'] },
  posts: [
    {
      author: { type: String, default: '' },
      time: { type: String, default: '' },
      content: { type: String, default: '' },
      link: { type: String, default: '' }
    }
  ],
  friends: { type: Array, default: [] },
  ngaytao: { type: String, default: new Date().toDateString() },
  check: { type: Boolean, default: false }
});
module.exports = mongoose.model('profile', profile);