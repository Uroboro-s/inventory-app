const category = require('../models/category');
const Category = require('../models/category');
const Item = require('../models/item');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');


//Display the home page
exports.get_home_page = asyncHandler( async(req, res, next) => {

    const [allItems, allCategories] = await Promise.all([
        Item.countDocuments({}).exec(),
        Category.countDocuments({}).exec(),
    ]);

    res.render('index', {
        title: "Inventory Application",
        item_count: allItems,
        category_count: allCategories,
    });
});


//Display the category list page
exports.get_category_list = asyncHandler( async (req, res, next) =>{
    const allCategories = await Category.find().exec();

    res.render('category-list', {
        title: "Category List",
        category_list: allCategories,
    });
});


//Display the category detail page
exports.get_category_detail = asyncHandler( async(req, res, next) => {
    const category = await Category.findById(req.params.category_id).exec();
    const allItemsinCategory = await Item.find({category: req.params.category_id}).exec();


    res.render('category-detail', {
        title: "Category Detail",
        category: category,
        items_in_category: allItemsinCategory,
    });
});

//Display category creation form
exports.get_category_create = asyncHandler( async(req, res, next) => {
    res.render('category-form', {
        title: "Create Category",
    });
});


//Handle the category creation form
exports.post_category_create = [
    body('name', 'Name is too long!')
    .trim()
    .isLength({max: 24})
    .escape(),

    body('description')
    .trim()
    .isLength({max: 256})
    .withMessage('Description is too long!')
    .escape(),

    asyncHandler( async(req, res, next) =>{
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
            description: req.body.description,
        });
        
        if(!errors.isEmpty()) {
            res.render('category-form', {
                title: "Create Category",
                category: category,
                errors: errors.array(),
            });
            return ;
        }

        const categoryExists = await Category.findOne({name: category.name}).exec();

        console.log(category);
        if(categoryExists) {
            res.render('category-form', {
                title: "Create Category",
                category: category,
                form_error: "Category already exists!"
            });
            return ;
        } else {
            await category.save();
            res.redirect(category.url);
        }
    })
];

exports.get_category_update = asyncHandler( async (req, res, next) => {
    const category = await Category.findById(req.params.category_id).exec();

    res.render('category-form', {
        title: "Update Category",
        category: category,
    });
});

exports.post_category_update = [
    body('name', 'Name is too long!')
    .trim()
    .isLength({max: 24})
    .escape(),

    body('description')
    .trim()
    .isLength({max: 256})
    .withMessage('Description is too long!')
    .escape(),

    asyncHandler( async(req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            _id: req.params.category_id,
        });

        if(!errors.isEmpty()) {
            res.render('category-form', {
                title: "Update Category",
                category: category,
                errors: errors.array(),
            });
            return ;
        } else {
            const updatedCategory = await Category.findByIdAndUpdate(category._id, category, {});
            res.redirect(updatedCategory.url);
        }
    }),
];

exports.post_category_delete = asyncHandler( async (req, res, next) =>{
    console.log(req.params.category_id);
    const category = await Category.findById(req.params.category_id).exec();
    const itemsWithGivenCategory = await Item.find({category: req.params.category_id}).exec();

    if(itemsWithGivenCategory.length > 0) {
        res.render('category-delete', {
            title: "Delete items to continue",
            category: category,
            delete_items: itemsWithGivenCategory,
        });
    } else {
        console.log(category);
        await Category.findByIdAndDelete(req.params.category_id);
        res.redirect('/category');
    }
});