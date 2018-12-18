module.exports = {
    // 选项...
    devServer: {
        port: 3000, // 端口号
        proxy:{
            '/api': {
                // target: 'http://www.havalfl.com',
                // target: 'http://192.168.1.115:5010',
                target: 'http://weport.orafl.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''   //需要rewrite的,
                }
            },
        },

    },
};