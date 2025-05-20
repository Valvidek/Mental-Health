const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Todo хоосон байна' });

    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json({ message: 'Todo нэмэгдлээ', todo });
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
};
