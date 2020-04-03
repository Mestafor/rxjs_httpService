module.exports = {
    entry: "./main",
    output: {
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                use: ["ts-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
}