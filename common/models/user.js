'use strict';

var path = require('path');

//Replace this address with your actual address
var senderAddress = 'info@quickcompany.com'; 

module.exports = function (User) {

    //send verification email after registration
    User.afterRemote('create', function (context, user, next) {
        var options = {
            type: 'email',
            to: user.email,
            from: senderAddress,
            subject: 'Thanks for registering.',
            template: path.resolve(__dirname, '../../server/views/verify.ejs'),
            redirect: '/verified',
            user: user
        };

        user.verify(options, function (err, response) {
            if (err) {
                User.deleteById(user.id);
                return next(err);
            }
            next()
        });
    });

    // //send password reset link when requested
    // User.on('reset', function (info) {
    //     debugger
    //     var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    //     var html = 'Click <a href="' + url + '?access_token=' +
    //         info.accessToken.id + '">here</a> to reset your password';

    //     User.app.models.Email.send({
    //         to: info.email,
    //         from: senderAddress,
    //         subject: 'Password reset',
    //         html: html
    //     }, function (err) {
    //         if (err) return console.log('> error sending password reset email');
    //         console.log('> sending password reset email to:', info.email);
    //     });
    // });

};
