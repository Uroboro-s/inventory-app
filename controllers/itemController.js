const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');


//Display the items list page
exports.get_item_list = asyncHandler( async (req, res, next) =>{
    const allItems = await Item.find().exec();

    res.render('item-list', {
        title: "Item List",
        item_list: allItems,
    });
});

//Display the item detail page
exports.get_item_detail = asyncHandler( async (req, res, next) =>{
    const item = await Item.findById(req.params.item_id).populate('category').exec();

    res.render('item-detail', {
        title: "Item Detail",
        item: item,
    });
});

//Display the item creation form
exports.get_item_create = asyncHandler( async (req, res, next) => {
    const allCategories = await Category.find().exec();

    res.render('item-form', {
        title: "Create Item",
        categories: allCategories, 
    });
});

//Handle the item creation form
exports.post_item_create = [
    body('name', 'Name is too long!')
    .trim()
    .isLength({max: 24})
    .escape(),

    body('description', 'Description is too long!')
    .trim()
    .isLength({max: 256})
    .escape(),
    
    asyncHandler ( async (req, res, next) => {
        const errors = validationResult(req);
        const allCategories = await Category.find().exec();

        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
        });

        if(!errors.isEmpty()) {
            res.render('item-form', {
                title: "Create Item",
                categories: allCategories,
                item: item,
                errors: errors.array(),
            });
            return ;
        } 

        const itemExists = await Item.findOne({name: item.name, category: item.category}).exec();

        if(itemExists) {
            res.render('item-form', {
                title: "Create Item",
                categories: allCategories,
                item: item,
                form_error: "Item already exists!",
            });
            return ;
        } else {
            await item.save();

            res.redirect(item.url);
        }
        
    })
];

exports.get_item_update = asyncHandler( async(req, res, next) =>{
   
    const item = await Item.findById(req.params.item_id).exec();
    const allCategories = await Category.find().exec();

    res.render('item-form', {
        title: "Update Item",
        item: item,
        categories: allCategories,
    });
});

exports.post_item_update = [
    body('name', 'Name is too long!')
    .trim()
    .isLength({max: 24})
    .escape(),

    body('description', 'Description is too long!')
    .trim()
    .isLength({max: 256})
    .escape(),
    
    asyncHandler ( async (req, res, next) => {
        const errors = validationResult(req);

        const allCategories = await Category.find().exec();

        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            _id: req.params.item_id,
        });

        if(!errors.isEmpty()) {
            res.render('item-form', {
                title: "Update Item",
                categories: allCategories,
                item: item,
                errors: errors.array(),
            });
            return ;
        } else {
            const updatedItem = await Item.findByIdAndUpdate(item._id, item, {});
            res.redirect(updatedItem.url);
        }
    })
];


exports.post_item_delete = asyncHandler( async (req, res, next) =>{
    console.log(req.params.item_id);
    await Item.findByIdAndDelete(req.params.item_id);
    res.redirect('/item');
});