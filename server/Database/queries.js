var db = require('./mysql');
var async = require('async');

var getPrimaryDataOnProduct = (productId, callback) => {
  return db.query(
    `
      SELECT *
      FROM primary_info
      LEFT JOIN features
      ON primary_info.productId = features.productId
      WHERE primary_info.productId = ${productId}
      `,
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
};

var sku = (styleId, callback) => {
  return db.query(
    `SELECT *
    FROM sku
    WHERE style_id = ${styleId}
    `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null,result)
      }
    }
  );
};

var url = (styleId, callback) => {
  return db.query(
    `SELECT *
    FROM producturl
    WHERE style_id = ${styleId}
    `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, result);
      }
    }
  );
};

var styleQuery = function(styleId, callback) {
  let skus = {};
  let photos = [];
  let num = styleId
  let red = {
    one: function(callback) {
      sku(num, (err, results) => {
        for (let i = 0; i < results.length; i++) {
          skus[results[i].id] = {};
          skus[results[i].id].quantity = results[i].quantity;
          skus[results[i].id].size = results[i].size || null;
        }
        callback(null, skus)
      })
    },
    two: function(callback) {
      url(num, (err, results) => {
        var url;
        for (let i = 0; i < results.length; i++) {
          url = {};
          url.thumbnail_url = results[i].thumbnail_url;
          url.url = results[i].image_url;
          photos.push(url)
        }
        callback(null, photos)
      })
    }
  }
  return async.parallel(red)
};

var styleCall = function(productId, callback) {
  return db.query(
    `SELECT *
    FROM styles
    WHERE productId = ${productId}
    `,
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
};

var getRelatedProducts = (productId, callback) => {
  return db.query(
    `SELECT *
    FROM related
    WHERE productId = ${productId}
    `,
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
};

module.exports = {
  getPrimaryDataOnProduct,
  styleQuery,
  getRelatedProducts,
  styleCall,
};
