const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/population")
  .then(() => console.log("Connected on MongoDB"))
  .catch(() => console.log("Error to connect on mongoose"));

const AuthorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", AuthorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [AuthorSchema], // Array of Subdocuments
    // authors: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Author'
    // }
  })
);

async function createAuthor(name, bio, website) {
  const authors = new Author({
    name,
    bio,
    website,
  });
  const result = await authors.save();
  console.log(result);
}

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });
  const result = await course
    .save()
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log("erro", err);
    });
  console.log(result);
}

async function listCourses() {
  const course = await Course.find()
    .populate("authors", "name -_id")
    .select("name authors");
}
async function updateCourse(courseId) {
  const course = await Course.findById(courseId);
  course.authors.name = "Junior Garcia";
  course
    .save()
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  // .then(() => {console.log('ok'); })
  // .catch((err) => { console.log(err);});
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorid) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorid);
  author.remove();
  course.save();
}

//  createAuthor('Junior', 'Estudante', 'Tumblr.com');

//  createCourse('NodeJs', [
//   new Author({name: 'Antonio'}),
//   new Author({name: 'Jose'}),
//   new Author({name: 'Garcia'})
//  ]);

addAuthor("5f6bed8c3c217c3da39ffd71", new Author({ name: "Francisca" }));
// removeAuthor('5f6bed8c3c217c3da39ffd71', '5f6bf1e8492b45422aedef6b');
// id from course            // id from author
// listCourses();
// updateCourse('5f6be7fdcf08953992c0cc66');
