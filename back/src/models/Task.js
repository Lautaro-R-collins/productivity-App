const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
