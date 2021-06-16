const User = require('../model/user');

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByverifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken })
}

const create = async (body) => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateTokenVerify = async (id, isVerified, verifyToken) => {
  return await User.updateOne({ _id: id }, { isVerified, verifyToken })
}

const getCurrentUser = async (id) => {
  const { name, email, subscription } = await User.findOne({ _id: id });
  return { name, email, subscription };
};

const updateSubscriptionsStatus = async (id, body) => {
  return await User.findOneAndUpdate({ _id: id }, { ...body }, { new: true });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar })
}



module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  getCurrentUser,
  updateSubscriptionsStatus,
  updateAvatar,
  findByverifyToken,
  updateTokenVerify
}
