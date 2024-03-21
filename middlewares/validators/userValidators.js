const {check, validationResult} = require('express-validator');

const validateCreateUser = [
    check('Username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Empty username!')
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required!')
      .escape(),
  check('password')
      .not()
      .isEmpty()
      .withMessage('Password can not be empty!')
      .isLength({min: 8})
      .withMessage('Minimum 8 characters required!')
      .escape(),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];

  const validateMessage = [
    check('message')
      .not()
      .isEmpty()
      .withMessage('Cant send empty message')
      .escape(),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];

module.exports = {
    validateCreateUser,
    validateMessage
}