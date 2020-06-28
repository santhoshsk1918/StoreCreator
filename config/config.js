const config = {
    "qa": {
        "mongodbUrl": "mongodb://localhost/myShop?maxPoolSize=1100",
        "secret_string": "SomeSecretString",
        "file_path": "/Users/santhoshkashyap/Desktop/personal/updloaded/"
    },
    "local": {
        "mongodbUrl": "mongodb://localhost/myShop?maxPoolSize=1100",
        "secret_string": "SomeSecretString",
        "file_path": "/Users/santhoshkashyap/Desktop/personal/updloaded/"
    }
}

module.exports = config[process.NODE_ENV || "local"]