const  express = require('express');
const  router = express.Router();
const Item = require('../models/item');

const categoryController = require('../controllers/categoryController');

/* GET categories listing. */
router.get('/', categoryController.get_category_list);

//GET category create form
router.get('/create', categoryController.get_category_create);

//POST category create form
router.post('/create', categoryController.post_category_create);

//GET category detail page
router.get('/:category_id', categoryController.get_category_detail);

//GET the update page for item
router.get('/:category_id/update', categoryController.get_category_update);

//POST the update page for item
router.post('/:category_id/update', categoryController.post_category_update);

//POST the item to delete
router.post('/:category_id/delete', categoryController.post_category_delete);


module.exports = router;
