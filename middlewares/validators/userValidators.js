const {check, validationResult} = require('express-validator');

const validateCreateUser = [
    check('Username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Empty username!')
      .isLength({min: 3})
      .withMessage('Minimum 3 characters required!'),
  check('password')
      .not()
      .isEmpty()
      .withMessage('Password can not be empty!')
      .isLength({min: 8})
      .withMessage('Minimum 8 characters required!'),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];

module.exports = {
    //validateLoginUser,
    validateCreateUser
}