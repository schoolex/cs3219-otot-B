import userService from '../src/services/userService';

const USER_JOHN = {
  name: 'John',
  age: '21',
  address: '123 Main St',
  description: 'i am a coder',
};

const USER_ID1 = '63229182f28d4c39f4c26e07'
const USER_ID2 = '6325c84f9494fc50cd1e0c4c'

// mock logger with jest
jest.mock('../src/loggers/logger');

// mock userRepos
jest.mock('../src/repository/userRepo', () => {
  const mockCreateUser = () => {
    return Promise.resolve({
      _id: USER_ID1,
      name: USER_JOHN.name,
      age: USER_JOHN.age,
      address: USER_JOHN.address,
      description: USER_JOHN.description,
    });
  };
  const mockUpdateUser = (id: string) => {
    if (id === USER_ID1) {
      return Promise.resolve({
        _id: USER_ID1,
        name: USER_JOHN.name,
        age: USER_JOHN.age,
        address: '456 Main St',
        description: USER_JOHN.description,
      });
    } else {
      return Promise.resolve(null);
    }
  };
  const mockGetOrDeleteUser = (id: string) => {
    if (id === USER_ID1) {
      return Promise.resolve({
        _id: USER_ID1,
        name: USER_JOHN.name,
        age: USER_JOHN.age,
        address: USER_JOHN.address,
        description: USER_JOHN.description,
      });
    } else {
      return Promise.resolve(null);
    }
  };
  return {
    createUser: jest.fn(mockCreateUser),
    updateUser: jest.fn(mockUpdateUser),
    getUser: jest.fn(mockGetOrDeleteUser),
    deleteUser: jest.fn(mockGetOrDeleteUser),
  };
});

describe('Simple expression tests', () => {
  it('adds user', async () => {
    const user = await userService.createUser(
      USER_JOHN.name,
      USER_JOHN.age,
      USER_JOHN.address,
      USER_JOHN.description,
    );
    expect(user.name).toBe(USER_JOHN.name);
    expect(user.age).toBe(USER_JOHN.age);
    expect(user.address).toBe(USER_JOHN.address);
    expect(user.description).toBe(USER_JOHN.description);
  });

  it('updates user', async () => {
    const user = await userService.updateUser(USER_ID1, {
      address: '456 Main St',
    });
    expect(user?.address).toBe('456 Main St');
  });

  it('gets user', async () => {
    const user = await userService.getUser(USER_ID1);
    expect(user?.name).toBe(USER_JOHN.name);
    expect(user?.age).toBe(USER_JOHN.age);
    expect(user?.address).toBe(USER_JOHN.address);
    expect(user?.description).toBe(USER_JOHN.description);
  });

  it('deletes user', async () => {
    const user = await userService.deleteUser(USER_ID1);
    expect(user?.name).toBe(USER_JOHN.name);
    expect(user?.age).toBe(USER_JOHN.age);
    expect(user?.address).toBe(USER_JOHN.address);
    expect(user?.description).toBe(USER_JOHN.description);
  });

  it('gets invalid user', async () => {
    expect(userService.getUser(USER_ID2)).rejects.toThrowError();
  });

  it('deletes invalid user', async () => {
    expect(userService.deleteUser(USER_ID2)).rejects.toThrowError();
  });

  it('updates invalid user', async () => {
    expect(
      userService.updateUser(USER_ID2, {
        address: '456 Main St',
      }),
    ).rejects.toThrowError();
  });
});
