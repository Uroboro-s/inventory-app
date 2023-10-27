const  express = require('express');
const  router = express.Router();

const categoryController = require('../controllers/categoryController');

/* GET home page. */
router.get('/', categoryController.get_home_page);

module.exports = router;
