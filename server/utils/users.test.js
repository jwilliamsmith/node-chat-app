const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: 'Phil',
        room: 'Node'
      },
      {
        id: 2,
        name: 'Mary',
        room: 'Python'
      },
      {
        id: 3,
        name: 'Tom',
        room: 'Python'
      }
    ];
  });
  it('should add new users', () => {
    let users = new Users(),
        user = {id: '2', name: 'Topher', room: 'That 70s Show'},
        resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });
  it('should return Node name', () => {
    let userList = users.getUserList('Python');
    expect(userList).toEqual(['Mary', 'Tom']);
  });
  it('should remove user with valid id', () => {
    let removed = users.removeUser(1);
    expect(removed.name).toBe('Phil');
    expect(users.users.length).toBe(2);
  });
  it('should not remove user with invalid id', () => {
    let removed = users.removeUser(5);
    expect(removed).toNotExist();
    expect(users.users.length).toBe(3);
  });
  it('should get user with valid id', () => {
    let user = users.getUser(2);
    expect(user.name).toBe('Mary');
  });
  it('should not get user with invalid id', () => {
    let user = users.getUser(5);
    expect(user).toNotExist()
  });
});