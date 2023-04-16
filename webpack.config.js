const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключите к проекту mini-css-extract-plugin

module.exports = {
    // указали первое место, куда заглянет webpack, — файл index.js в папке src
    entry: { main: './src/pages/index.js' },
    // указали в какой файл будет собираться весь js и дали ему имя 
    output: {
        // переписали точку выхода, используя утилиту path 
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development', // добавили режим разработчика
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true // сайт будет открываться сам при запуске npm run dev
    },
    module: {
        rules: [ // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
                exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
            },

            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, // добавили правило для обработки файлов
                type: 'asset/resource' // регулярное выражение, которое ищет все файлы с такими расширениями
            },
            {

                test: /\.css$/, // применять это правило только к CSS-файлам


                use: [MiniCssExtractPlugin.loader, { // при обработке этих файлов нужно использовать
                    loader: 'css-loader', // MiniCssExtractPlugin.loader и css-loader

                    options: { importLoaders: 1 } // добавьте объект options
                },
                    // Добавьте postcss-loader
                    'postcss-loader'
                ]
            },
        ]
    },

    plugins: [ // добавили массив
        new HtmlWebpackPlugin({
            template: './src/pages/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(), // использовали плагин
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ]
}