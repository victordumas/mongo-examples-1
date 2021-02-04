const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPosts = require('../src/blogPosts');

describe('Middlaware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPosts({ title: 'Js is great', content: 'abc' });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe
      .remove()
      .then(() => BlogPosts.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
