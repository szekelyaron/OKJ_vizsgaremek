const { body, validationResult } = require('express-validator');

exports.form = [

  // username
  body('felhasznalonev').trim().notEmpty().withMessage('Felhasználónév szükséges')
  .matches(/^[a-zA-Z0-9.]*$/).withMessage('Csak a karakterek elfogadottak szóköz nélkül')
  .isLength({min: 5}).withMessage('A felhasználónévnek legalább 5 karakter hosszúnak kell lennie'),
  // email
  body('email').notEmpty().withMessage('Email cím szükséges').normalizeEmail().isEmail().withMessage('Érvényes Email-nek kell lennie'),
  // password
  body('jelszo').trim().notEmpty().withMessage('Jelszó szükséges')
  .isLength({ min: 5 }).withMessage('A jelszónak legalább 5 karakter hosszúnak kell lennie')
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