import authReducer from '../../reducers/auth';

describe('authReducer', () => {
  it('should return default auth state', () => {
    expect(authReducer(undefined,{})).toEqual({});
  });
  it('should set state when called with LOGIN action', () => {
    const uid = 'abc';
    const state = authReducer({}, {
      type: 'LOGIN',
      uid
    });
    expect(state).toEqual({uid});
  });
  it('should reset state on LOGOUT action', () => {
    const uid = 'abc';
    const state = authReducer({uid}, {
      type: 'LOGOUT'
    });
    expect(state).toEqual({});
  })
})
