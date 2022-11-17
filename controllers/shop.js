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
// the reason why I got this populate().exec() is not a function.. 
// is that await was not defined in here
exports.getCart = async (req, res, next) => {
  console.log('user : ', req.user.cart.items);
  if (!req.user) {

    res.status(404).render('404', {
      pageTitle: 'getCart Error',
      path: '/404',
      isAuthenticated: req.session.isLoggedIn
    });
    res.end();
    console.log('getCart Error!!!');

  } else {

    // unless you populate the user record, populated will always return undefined 
    // if (req.user.populated('cart.items.productId') === undefined ) {
    /*
    var test = undefined;
    test = await req.user.
      populate('cart.items.productId');

    console.log("Populated cart items : ", test.cart.items);
    console.log("Populated? :", test.populated('cart.items.productId'));
    */
    // exec is not supposed to be used in here. 
    // test.cart.items.exec(async data => console.log("exec test : ", await data))

    await req.user.
      populate('cart.items.productId').
      then(user => {
        console.log("then test : ", user);
        const products = user.cart.items;
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products,
          isAuthenticated: req.session.isLoggedIn
        });
      }).
      catch(err => console.log(err));
  }
};
  // execPopulate() has now been removed:
  // https://stackoverflow.com/questions/67157818/why-is-execpopulate-method-required-in-mongoose-for-populating-an-existing-docum

  // execPopulate 는 chainable한 populate를 실행하고자 할 때 사용되었던 method로 확인됨
  // exec에 내가 집착한 이유는... 딱히 명확한 근거가 있어서 했던것이 아닌듯
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

exports.postOrder = async (req, res, next) => {
  await req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
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
