exports.getIndex = (req, res, next) => {
    res.render('kezdolap', {
        pageTitle: 'CarScope',
        path: '/',
    });
};

exports.getBejelentkezes = (req, res, next) => {
    res.render('bejelentkezes', {
        pageTitle: 'Bejelentkezes',
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