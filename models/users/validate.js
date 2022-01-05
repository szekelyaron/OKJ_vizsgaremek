const { body, validationResult } = require('express-validator');

exports.form = [

  // username
  body('felhasznalonev').trim().notEmpty().withMessage('Username required')
  .matches(/^[a-zA-Z0-9.]*$/).withMessage('Only Characters without white space are allowed')
  .isLength({min: 5}).withMessage('Usename must be minimum 5 character long'),
  // email
  body('email').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('Must be a valid email'),
  // password
  body('jelszo').trim().notEmpty().withMessage('Password required')
  .isLength({ min: 5 }).withMessage('Password must be minimum 5 character long')
  .matches(/(?=.*?[A-Z])/).withMessage('Legalább egy nagybetűt tartalmazzon')
  .matches(/(?=.*?[a-z])/).withMessage('Legalább egy kisbetűt tartalmazzon')
  .matches(/(?=.*?[0-9])/).withMessage('Legalább egy számot tartalmazzon')
  .not().matches(/^$|\s+/).withMessage('Nem tartalmazhat szóközt'),
  // confirm password
  body('password_again').custom((value, { req }) => {
       if (value !== req.body.jelszo || value == null || value == "") {
             throw new Error('A két jelszó nem megeggyező');
        }
        return true;
   })
]