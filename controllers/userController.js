const asyncHandler = require("../errorHandlers/asyncHandler")

exports.getUser = asyncHandler(async (req, res) => {
    await req.user.populate('exercises')
    res.json({
        user: req.user
    })
})