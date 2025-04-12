module.exports = {
    apps: [
        {
            name: "next-core-app",
            script: "server.js",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
}