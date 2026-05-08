const express = require('express');
const router = express.Router();
const CommunityMessage = require('../models/CommunityMessage');
const { auth } = require('../middleware/auth');

// Get recent messages
router.get('/messages', auth, async (req, res) => {
  try {
    const { limit = 50, before } = req.query;
    const query = { status: { $ne: 'hidden' } };
    
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }

    const messages = await CommunityMessage.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('sender', 'name digitalId profileImage');

    res.json({
      success: true,
      messages: messages.reverse() // Send in chronological order
    });
  } catch (error) {
    console.error('Error fetching community messages:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

// Report a message
router.post('/report/:messageId', auth, async (req, res) => {
  try {
    const message = await CommunityMessage.findById(req.params.messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    if (message.reportedBy.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: 'You have already reported this message' });
    }

    message.reportedBy.push(req.user._id);
    message.isReported = true;
    
    // Auto-hide if reported by many users (e.g., 5)
    if (message.reportedBy.length >= 5) {
      message.status = 'flagged';
    }

    await message.save();
    res.json({ success: true, message: 'Message reported successfully' });
  } catch (error) {
    console.error('Error reporting message:', error);
    res.status(500).json({ success: false, message: 'Failed to report message' });
  }
});

// Search messages
router.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ success: false, message: 'Search query required' });

    const messages = await CommunityMessage.find({
      $text: { $search: q },
      status: { $ne: 'hidden' }
    })
    .sort({ score: { $meta: 'textScore' } })
    .populate('sender', 'name digitalId profileImage')
    .limit(20);

    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error searching messages:', error);
    res.status(500).json({ success: false, message: 'Search failed' });
  }
});

module.exports = router;
