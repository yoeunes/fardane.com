module.exports = {
    plugins: [
        require('postcss-import'),
        require('@tailwindcss/postcss'),
        require('cssnano')(),
        require('autoprefixer'),
    ],
}
