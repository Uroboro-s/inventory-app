const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

const itemController = require('../controllers/itemController');

//GET the items list
router.get('/', itemController.get_item_list);

//GET the item creation form
router.get('/create', itemController.get_item_create);

//POST the item creation form
router.post('/create', itemController.post_item_create);

//GET the item detail page
router.get('/:item_id', itemController.get_item_detail);

//GET the update page for item
router.get('/:item_id/update', itemController.get_item_update);

//POST the update page for item
router.post('/:item_id/update', itemController.post_item_update);

//POST the item for delete
router.post('/:item_id/delete', itemController.post_item_delete);




module.exports = router;