const express = require('express');
const router = express.Router();
const contractsController = require('../controllers/contractsController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

router.post('/:id/fund', authMiddleware, roleMiddleware('employer'), contractsController.fundContract);
router.post('/:id/deliver', authMiddleware, roleMiddleware('freelancer'), contractsController.deliverContract);
router.post('/:id/approve', authMiddleware, roleMiddleware('employer'), contractsController.approveContract);
router.post('/:id/dispute', authMiddleware, contractsController.disputeContract);

module.exports = router;
