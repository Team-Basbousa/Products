const products = require('./../Database/queries');

var productInformation = (req, res) => {
  var returnedObject = {};
  var features = [];

  products.getPrimaryDataOnProduct(req.params.product_id, (err, data) => {
    let feature = {};
    returnedObject.id = data[0].productId;
    returnedObject.name = data[0].name;
    returnedObject.slogan = data[0].slogan;
    returnedObject.description = data[0].description;
    returnedObject.category = data[0].category;
    returnedObject.default_price = data[0].default_price;

    for (let i = 0; i < data.length; i++) {
      var datas = data[i];
      feature = {};
      feature.feature = datas.feature;
      feature.value = datas.value;
      features.push(feature);
    }
    returnedObject.features = features;
    res.status(200).send(returnedObject);
  });
};

var productStyles = (req, res) => {
  products.styleCall(req.params.product_id, (err, result) => {
    var returnedObject = {};
    returnedObject.product_id = req.params.product_id;
    returnedObject.results = [];
    for (let i = 0; i < result.length; i++) {
      let item = {};
      item.style_id = result[i].style_id;
      item.name = result[i].name;
      item.original_price = result[i].original_price;
      item.default = result[i].default_style;
      products.styleQuery(result[i].style_id).then((req) => {
        item.photo = req.two;
        item.sku = req.one;
        returnedObject.results.push(item);
        if (i === result.length - 1) {
          res.send(returnedObject)
        }
      });
    }
  });
};

var relatedProducts = (req, res) => {
  var returnedArray = [];
  products.getRelatedProducts(req.params.product_id, (err, data) => {
    for (let i = 0; i < data.length; i++) {
      returnedArray.push(data[i].related_product_id);
    }
    res.status(200).send(returnedArray);
  });
};

module.exports = { productInformation, productStyles, relatedProducts };
