const Item = require('../models/item');

const asyncHandler = require('express-async-handler');
const { body, validationResults } = require('express-validator');


exports.get_item_list = asyncHandler( async (req, res, next) =>{
    const allItems = await Item.find().exec();

    res.render('item-list', {
        title: "Item List",
        item_list: allItems,
    });
});

exports.get_item_detail = asyncHandler( async (req, res, next) =>{
    const item = await Item.findById(req.params.item_id).populate('category').exec();

    res.render('item-detail', {
        title: "Item Detail",
        item: item,
    });
})