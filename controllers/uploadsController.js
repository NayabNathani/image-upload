const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudianry = require('cloudinary').v2
const fs = require('fs')

//upload picture local method i.e on your local server
// const uploadProductImage = async (req, res) => {

//     if(!req.files){
//         throw new CustomError.BadRequestError('No File Uploaded')
//     }

//     const productImage = req.files.image;

//     if(!productImage.mimetype.startsWith('image')){
//         throw new CustomError.BadRequestError('Image Files Only!')
//     }

//     const maxSize = 1024 * 1024 //1KB
//     if(productImage.size > maxSize){
//         throw new CustomError.BadRequestError('Max Image Size Should be 1MB')
//     }

//     const imagePath = path.join(
//         __dirname,
//         '../public/uploads/' + `${productImage.name}`
//     );

//     await productImage.mv(imagePath)

//     return res.status(StatusCodes.OK).send({ image: { src: `/uploads/${productImage.name}` } })
// }

const uploadProductImage = async (req, res) => {
    //console.log(req.files.image)
    const result = await cloudianry.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'file-upload',
        })
        fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}



module.exports = {
    uploadProductImage,
}