const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

router.get('/', jobsController.listJobs);
router.post('/', authMiddleware, roleMiddleware('employer'), jobsController.createJob);
router.get('/:id', jobsController.getJob);
router.post('/:id/proposals', authMiddleware, roleMiddleware('freelancer'), jobsController.createProposal);
router.put('/:id/proposals/:proposalId/accept', authMiddleware, roleMiddleware('employer'), jobsController.acceptProposal);

module.exports = router;
