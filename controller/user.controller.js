const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = { 

    create: function (req, res, next) {
        console.log(req.body)
        userModel.findOne({ email: req.body.email }, ((user) => {
            console.log(user, "message")

            //return json clé:valeur
            const userModel1 = new userModel(req.body);
            userModel1.save(function (err, result) {
                if (err) {
                    res.json({ status: "error", message: "error added user", data: null });
                }
                else {

                    result.populate("Orders").execPopulate(function (err, item) {
                        res.json({ status: "success", message: "User added successfully!!!", data: item });

                    });
                }
            });

        }))


    },

    update: function (req, res, next) {
        console.log(req.body)
        userModel.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "User updated successfully!!!", data: result });

        });
    },


    delete: function (req, res, next) {

        console.log(req.body)
        userModel.findOneAndDelete({ _id: req.body.id }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "User deleted successfully!!!", data: result });

        });

    },

    login: function (req, res, next) {
        console.log(req.body)
        userModel.findOne({ email: req.body.email }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                console.log(userInfo)
                if (userInfo != undefined) {
                    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                        res.json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });
                    } else {
                        res.json({ status: "error", message: "Invalid password!!!", data: null });

                    }
                } else {

                    res.json({ status: "error", message: "Invalid email!!!", data: null });

                }
            }
        });
    },



    find: function (req, res, next) {
        console.log(req.body)
        userModel.find({}).populate("order").exec(function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Users found successfully!!!", data: result });

        });

    },
    findById: function (req, res, next) {
        console.log(req.body)
        userModel.find({ _id: req.params.id }).populate("order").exec(function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Users found successfully!!!", data: result });

        });
    }
}
