const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports =  model('User', userSchema);

/*
class User {

  initScheme() {
    schema.pre(
      "save",
      function(next) {
        let post = this;
        if (!post.isModified("email")) {
          return next();
        }
        post.slug = slugify(post.email, "_");
        console.log('set slug', post.slug);
        return next();
      },
      function(err) {
        next(err);
      }
    );
    schema.plugin(uniqueValidator);
    mongoose.model("users", schema);
  }

  getInstance(init = true) {
    init && this.initScheme();
    return mongoose.model("users");
  }
}
*/