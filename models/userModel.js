const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  age: { type: Number, require: [true, 'A user must have age'] },
});

const User = mongoose.model('User', userSchema);

export default User;
