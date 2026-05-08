const mongoose = require('mongoose');

const communityMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  messageType: {
    type: String,
    enum: ['text', 'tip', 'safety_update', 'help_request', 'crowd_update'],
    default: 'text'
  },
  isReported: {
    type: Boolean,
    default: false
  },
  reportedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['active', 'hidden', 'flagged'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster searching and chronological ordering
communityMessageSchema.index({ createdAt: -1 });
communityMessageSchema.index({ content: 'text' });

module.exports = mongoose.model('CommunityMessage', communityMessageSchema);
