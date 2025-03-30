const process = require('node:process')
const Encore = require('@symfony/webpack-encore')

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev')
}

Encore
    .setOutputPath('dist/')
    .setPublicPath('/dist')

    // Clean up the output directory before building
    .cleanupOutputBeforeBuild()
    .disableSingleRuntimeChunk()

    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    // Enable notifications on build completion/errors
    .enableBuildNotifications()

    // enables the Symfony UX Stimulus bridge (used in assets/js/stimulus.js)
    .enableStimulusBridge('./_assets/controllers.json')

    // Enable scss and postcss support for styling
    .enablePostCssLoader()

    .configureManifestPlugin((options) => {
        options.fileName = '../_data/manifest.json'
    })

    .configureWatchOptions(options => {
        options.ignored = [
            '**/_site/dist/**',  // Make sure it’s not watching dist
            '**/node_modules/**',
        ];
    })
    .addEntry('main', './_assets/main.js')

    .copyFiles({
        from: './_assets/images',
        to: 'images/[path][name].[ext]',
    })

module.exports = Encore.getWebpackConfig()
