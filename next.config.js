module.exports = {
    async rewrites() {
        console.log('Setting redirect')
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/:path*'
            }
        ]
    }
}
