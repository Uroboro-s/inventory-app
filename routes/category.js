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




module.exports = router;
