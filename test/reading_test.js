const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zack;

  beforeEach((done) => {
    alex = new User({ name: 'alex' });
    joe = new User({ name: 'joe' });
    maria = new User({ name: 'maria' });
    zack = new User({ name: 'zack' });

    Promise.all([joe.save(), alex.save(), maria.save(), zack.save()]).then(() => done());
  });

  it('find all the users with a nmae of joe', (done) => {
    User.find({ name: 'joe' }).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === 'joe');
      done();
    });
  });

  it('can skip and limit the result set ', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'joe');
        assert(users[1].name === 'maria');
        done();
      });
  });
});
