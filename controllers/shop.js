const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  console.log(req.session.isLoggedIn === true)
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  console.log('user : ', req.user);
  if (!req.user) {

    res.status(404).render('404', {
      pageTitle: 'getCart Error',
      path: '/404',
      isAuthenticated: req.session.isLoggedIn
    });
    res.end();
    console.log('getCart Error!!!');

  } else {
    console.log('getCart!!')
    console.log(req.user.populated('cart.items.productId'))
    // user is defined in app.js at the stage
    if (req.user.populated('cart.items.productId') === undefined ) {

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: [],
        isAuthenticated: req.session.isLoggedIn
      });

    } else {
      req.user
        .populate('cart.items.productId')
        .exec(function (err, user) {


          const products = user.cart.items;
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            isAuthenticated: req.session.isLoggedIn
          });
        })
        .catch(err => console.log(err));
    }
  }
  // execPopulate() has now been removed:
  // https://stackoverflow.com/questions/67157818/why-is-execpopulate-method-required-in-mongoose-for-populating-an-existing-docum

  // .execPopulate()
  // .then(user => {
  //   const products = user.cart.items;
  //   res.render('shop/cart', {
  //     path: '/cart',
  //     pageTitle: 'Your Cart',
  //     products: products,
  //     isAuthenticated: req.session.isLoggedIn
  //   });
  // })
  // .catch(err => console.log(err));

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};
