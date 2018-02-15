const pkg = require('../package.json');

module.exports = () => ({
    plugins: [
        require('autoprefixer')({
            browsers: pkg.browserslist,
            flexbox: 'no-2009',
        }),
    ],
});