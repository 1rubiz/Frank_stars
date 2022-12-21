const mongoose = require('mongoose');
const BlogSchema = mongoose.Schema({
	topic: {required: true,
		type: String},
	body: {
		required: true,
		type: String
	},
	date: {
		required: true,
		type: String
	}
});
const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;