const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/population')
  .then(() => console.log('Connected on MongoDB'))
  .catch(()=>console.log('Error to connect on mongoose'));

  const AuthorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  });

  const Author = mongoose.model('Author', AuthorSchema);

  const Course = mongoose.model('Course', new  mongoose.Schema({
    name: String,
    author: AuthorSchema // Subdocuments
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Author'
    // }

  }));

  async function createAuthor(name, bio, website) {
    const author = new Author({
     name,
     bio,
     website
    }) 
    const result =  await author.save();
    console.log(result);

  }

  async function createCourse(name, author) {
    const course = new Course({
      name,
      author
    })
    const result = await course.save()
      .then(() => {
        console.log('Success');
      })
      .catch((err) => {
        console.log('erro', err);
      });
    console.log(result);
  }

  async function listCourses() {
    const course = await Course.find()
      .populate('author', 'name -_id')
      .select('name author');

  }
  async function updateCourse(courseId) {
    const course = await Course.findById(courseId);
    course.author.name = 'Junior Garcia';
    course.save()
    .then(() => {
      console.log('Success');
    }).catch((err) => {
      console.log(err);
    });
    
  }

  //  createAuthor('Junior', 'Estudante', 'Tumblr.com');

  //  createCourse('NodeJs', new Author({name: 'Antonio'}));

  // listCourses();
  updateCourse('5f6be7fdcf08953992c0cc66');