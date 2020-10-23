var express = require('express')
var router = express.Router();
const products = require('./Controllers/products.js')

router.get('/products/:product_id', products.productInformation)
router.get('/products/:product_id/styles', products.productStyles)
router.get('/products/:product_id/related', products.relatedProducts)

module.exports = router;