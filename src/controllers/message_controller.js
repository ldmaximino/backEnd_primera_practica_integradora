import MessageDaoMongoDB from '../daos/mongodb/message_dao.js';
const messageDao = new MessageDaoMongoDB();

export const getAllMessages = async (req, res,next) => {
    try {
      const messages = await messageDao.getAllMessages();
      return res.status(201).json(messages);
    } catch(error) {
      next(error);
    }
}

export const createMessage = async (req, res,next) => {
    try {
      const message = await messageDao.createMessage(req.body);
      return res.status(201).json(message);
    } catch (error) {
      next(error);
    }
}
