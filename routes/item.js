const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

//GET the items list
router.get('/', itemController.get_item_list);

//GET the item detail page
router.get('/:item_id', itemController.get_item_detail);


module.exports = router;