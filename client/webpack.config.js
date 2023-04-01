const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
    return {
        mode: 'development',
        entry: {
            main: './src/js/index.js',
            install: './src/js/install.js',
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            // FIXME added indexedDB
            // Webpack plugin that generates our html file and injects our bundles.
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'Another Text Editor PWA',
            }),
            // //FIXME - added inject
            // new MiniCssExtractPlugin(),
            // Injects our custom service worker
            new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'src-sw.js',
            }),
            // Creates a manifest.json file.
            new WebpackPwaManifest({
                fingerprints: false,
                inject: true,
                name: 'Another Text Editor PWA',
                short_name: 'Text Editor',
                description:
                    'A text editor single-page application that runs in the browser, meets the PWA criteria, and features a number of data persistence techniques that serve as redundancy in case one of the options is not supported by the browser',
                background_color: '#225ca3',
                theme_color: '#225ca3',
                start_url: './',
                publicPath: './',
                icons: [
                    {
                        src: path.resolve('src/images/logo.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join('assets', 'icons'),
                    },
                ],
            }),
        ],

        // FIXME - added rules
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/transform-runtime',
                            ],
                        },
                    },
                },
            ],
        },
    };
};
