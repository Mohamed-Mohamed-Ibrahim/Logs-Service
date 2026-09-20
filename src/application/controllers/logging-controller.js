const express = require('express');
const router = express.Router();
const { loggingService } = require('../../domain/services/logging-service');
const { Log } = require('../../domain/entities/log');

router.post('/', (req, res) => {
    const {
        level,
        message
    } = req.body;

    const log = new Log({ level, message, timestamp: new Date() });
    loggingService.recordLog(log);

    res.json({ message: 'Log successfully created' });
});
    
module.exports = router;