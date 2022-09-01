import userService from '../src/services/userService';

const USER_JOHN = {
  name: 'John',
  dob: '01/01/1990',
  address: '123 Main St',
  description: 'i am a coder',
};

// mock logger with jest
jest.mock('../src/loggers/logger');

// mock userRepos
jest.mock('../src/repository/userRepo', () => {
  const mockCreateUser = () => {
    return Promise.resolve({
      _id: '1',
      name: USER_JOHN.name,
      dob: USER_JOHN.dob,
      address: USER_JOHN.address,
      description: USER_JOHN.description,
    });
  };
  const mockUpdateUser = (id: string) => {
    if (id === '1') {
      return Promise.resolve({
        _id: '1',
        name: USER_JOHN.name,
        dob: USER_JOHN.dob,
        address: '456 Main St',
        description: USER_JOHN.description,
      });
    } else {
      return Promise.resolve(null);
    }
  };
  const mockGetOrDeleteUser = (id: string) => {
    if (id === '1') {
      return Promise.resolve({
        _id: '1',
        name: USER_JOHN.name,
        dob: USER_JOHN.dob,
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
      USER_JOHN.dob,
      USER_JOHN.address,
      USER_JOHN.description,
    );
    expect(user.name).toBe(USER_JOHN.name);
    expect(user.dob).toBe(USER_JOHN.dob);
    expect(user.address).toBe(USER_JOHN.address);
    expect(user.description).toBe(USER_JOHN.description);
  });

  it('updates user', async () => {
    const user = await userService.updateUser('1', {
      address: '456 Main St',
    });
    expect(user?.address).toBe('456 Main St');
  });

  it('gets user', async () => {
    const user = await userService.getUser('1');
    expect(user?.name).toBe(USER_JOHN.name);
    expect(user?.dob).toBe(USER_JOHN.dob);
    expect(user?.address).toBe(USER_JOHN.address);
    expect(user?.description).toBe(USER_JOHN.description);
  });

  it('deletes user', async () => {
    const user = await userService.deleteUser('1');
    expect(user?.name).toBe(USER_JOHN.name);
    expect(user?.dob).toBe(USER_JOHN.dob);
    expect(user?.address).toBe(USER_JOHN.address);
    expect(user?.description).toBe(USER_JOHN.description);
  });

  it('gets invalid user', async () => {
    expect(userService.getUser('2')).rejects.toThrowError();
  });

  it('deletes invalid user', async () => {
    expect(userService.deleteUser('2')).rejects.toThrowError();
  });

  it('updates invalid user', async () => {
    expect(
      userService.updateUser('2', {
        address: '456 Main St',
      }),
    ).rejects.toThrowError();
  });
});
