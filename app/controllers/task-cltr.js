const Task = require('../models/task');

const TaskCtrl = {};

TaskCtrl.create = async (req, res) => {
    try {
        const body = req.body;
        const task = new Task(body);
        // Assuming req.user.userId contains the user ID for the task
        task.userId = req.user.userId;
        await task.save();
        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

TaskCtrl.show = async (req, res) => {
    try {
        const task = await Task.findOne({ userId: req.user.userId });
        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

TaskCtrl.update = async (req, res) => {
    try {
        const body = req.body;
        const task = await Task.findOneAndUpdate({ userId: req.user.userId }, body, { new: true });
        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

module.exports = TaskCtrl;
