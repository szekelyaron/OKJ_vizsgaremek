exports.getIndex = (req, res, next) => {
    res.render('kezdolap', {
        pageTitle: 'CarScope',
        path: '/',
    });
};

exports.getBejelentkezes = (req, res, next) => {
    res.render('bejelentkezes', {
        pageTitle: 'Bejelentkezés',
        path: '/bejelentkezes'
    });
};

exports.getRegisztracio = (req, res, next) => {
    res.render('regisztracio', {
        pageTitle: 'Regisztáció',
        path: '/regisztracio',
        //errorCode: '',
    });
};

exports.getFooldal = (req, res, next) => {
    res.render('fooldal', {
        pageTitle: 'Főoldal',
        path: '/fooldal',
        //errorCode: '',
    });
};

exports.getSugo = (req, res, next) => {
    res.render('sugo', {
        pageTitle: 'Súgó',
        path: '/sugo',
        //errorCode: '',
    });
};

exports.getContactus = (req, res, next) => {
    res.render('contactus', {
        pageTitle: 'Contactus',
        path: '/contactus',
        //errorCode: '',
    });
};