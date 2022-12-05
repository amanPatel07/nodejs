const asyncCatch = require('./../utils/asyncErrorHandler');
const APIFeature = require('./../utils/apiFeatures');

/**
 * @param {Car, Review, User} Model 
 * @description Find the documents related to the model. 
 * @returns 
 */
exports.getAllDoc = Model => asyncCatch(async (req, res, next) => {
    let filter = {};
    if (req.params.carId) filter = { car: req.params.carId };
    const feature = new APIFeature(Model.find(filter), req.query)
        .filter()
        .sort()
        .paginate();
    const doc = await feature.query;
    res.status(200)
        .json({
            status: 200,
            data: doc
        });
});

/**
 * @param {Car, Review, User} Model 
 * @param {Object} populateOption The populate object.
 * @param {String} selectOption The select query.
 * @description Find the document by the id related to the model.
 * @returns 
 */
exports.getDoc = (Model, populateOption, selectOption) => asyncCatch(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if(populateOption) query = query.populate(populateOption);
    if(selectOption) query = query.select(selectOption);
    const doc = await query;
    if (!doc) {
        return next(new ErrorHandler(`Cannot find the id`, 404));
    }
    res.status(200)
        .json({
            status: 200,
            data: doc
        });
});

/**
 * @param {Car,Review,User} Model 
 * @description Create a new document related to the model
 * @returns 
 */
exports.createDoc = Model => asyncCatch(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (!doc) {
        return next(new ErrorHandler(`Failed to create a document`, 404))
    }
    res.status(200)
        .json({
            status: 200,
            data: doc
        });
});

/**
 * @param {Car,Review,User} Model 
 * @description Update thee document related to the model
 * @returns 
 */
exports.updateOne = Model => asyncCatch(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!doc) {
        return next(new ErrorHandler(`Cannot find the id`, 404));
    }
    res.status(200)
        .json({
            status: 200,
            data: doc
        });
});

/** 
 * @param {Car,Review,User} Model
 * @description Delete the document related to the model. 
 * @returns 
 */
exports.deleteOne = Model => asyncCatch(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new ErrorHandler(`Cannot find the id`, 404))
    }
    res.status(200)
        .json({
            status: "Deleted",
        })

});