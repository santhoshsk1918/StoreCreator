const express = require('express');
const router = express.Router();
const authentication = require("../services/Security/authentication");
const shopService = require("../services/shopService");
const formidable = require('formidable');
var fs = require('fs-extra');

router.get("/shopList", authentication.authenticate, function(req, res) {
    const getShopListPromise = shopService.getShopList(req.loggedInUser._id);
    getShopListPromise.then((resp) => {
        res.send(resp);
        res.end();
    }).catch((err) => {
        console.error("Error in shopList", err);
        res.status(500);
        res.end()
    })
})

router.post("/createShop", authentication.authenticate, function(req, res) {
    const form = new formidable.IncomingForm();
    const saveImagePromise = saveImage(req, form);
    saveImagePromise.then((resp) => {
        let user = req.loggedInUser;
        return shopService.saveShop(resp, user);
    }).then((resp) => {
        res.send(resp);
        res.end();
    }).catch((err) => {
        res.status(500);
        res.end();
    })

})


function saveImage(req, form) {
    return new Promise((resolve, reject) => {
        let fld;
        form.parse(req, function(err, fields, files) {
            fld = fields;
        });

        form.on('error', function(err) {
            if (this.openedFiles[0].name == "") {
                resolve(fld);
            } else {
                let temp_path = this.openedFiles[0].path;
                fs.unlink(temp_path, function(err) {
                    if (err) {
                        console.error("Error unlinking tempfile")
                    }
                    reject(err)
                })
            }
        });

        form.on('end', function(fields, files) {
            if (this.openedFiles[0].name == "") {
                fld.savedFilePath = "";
                resolve(fld);
            } else {

                const temp_path = this.openedFiles[0].path;
                const file_name = this.openedFiles[0].name;

                const new_location = config.file_path;
                let savingFileName = new Date().getTime() + file_name;
                fs.copy(temp_path, new_location + file_name, function(err) {
                    if (err) {
                        reject(err)
                    } else {
                        fs.rename(new_location + file_name, new_location + savingFileName, function(err) {
                            if (!err) {
                                fld.savedFilePath = savingFileName;
                                resolve(fld)
                            } else {
                                reject(err)
                            }
                        });
                        fs.unlink(temp_path, function(err) {
                            if (err) {
                                console.error(err);
                            } else {}
                        });
                    }
                });
            }
        });
    });
}


module.exports = router;
