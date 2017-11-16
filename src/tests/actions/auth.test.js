import * as authActions from '../../actions/auth';

describe('auth actions', () => {
  it('should generate action for login with uid', () => {
    const uid = 'abc';
    expect(authActions.login(uid)).toEqual({
      type: 'LOGIN',
      uid
    });
  });
  it('should generate action for logout', () => {
    expect(authActions.logout()).toEqual({
      type: 'LOGOUT'
    });
  });
})
