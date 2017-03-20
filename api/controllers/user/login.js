module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    username: {
      example: 'sgress454',
      required: true,
      description: 'The username of the user to log in.'
    }
  },


  exits: {

    notFound: {
      responseType: 'notFound'
    }

  },


  fn: function (inputs, exits, env) {

    // If there's already a user logged in, just send the
    if (env.req.session.userId) {
      return exits.success({ id: env.req.session.userId });
    }

    // Attempt to find a user with the specified username.
    User.findOne({username: inputs.username})
    .exec(function(err, user) {
      if (err) {return exits.error(err);}

      // If no such user exists, return a 404.  The client will respond by attempting to
      // create the user.
      if (!user) {return exits.notFound(); }

      // Set the user ID in the session.
      env.req.session.userId = user.id;

      // Return the logged-in user info through the `success` exit.
      return exits.success(user);

    });


  }


};
