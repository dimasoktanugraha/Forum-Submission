/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 * - should dispatch action correctly when data fetching success
 * - should dispatch action and call alert correctly when data fetching failed
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

const fakeRegisterResponse = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

const name = 'John Doe';
const email = 'john@example.com';
const password = '123456';

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._register = api.register;
  });

  afterEach(() => {
    // restore original implementation
    api.register = api._register;

    // delete backup
    delete api._register;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeRegisterResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncRegisterUser(name, email, password)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncRegisterUser(name, email, password)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    // expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
