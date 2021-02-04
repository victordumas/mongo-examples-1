const assert = require('assert');
const User = require('../src/user');

describe('Updating a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'joe', age: 20, likes: 0 });
    joe.save().then((user) => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance set and save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('instance update with update functino', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('a model calss can update', (done) => {
    assertName(User.update({ name: 'joe' }, { name: 'Alex' }), done);
  });

  it('a model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'joe' }, { name: 'Alex' }), done);
  });

  it('a model class can find a record with an Id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  it('a user can have their likes incremented by 1', (done) => {
    User.update({ name: 'joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
  });
});
