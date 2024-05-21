export type TokenType = {
  jwtToken: string;
  accessToken: string;
  refreshToken: string;
};

export type AuthenticationType = {
  user?: User;
  isLoading: boolean;
  userSignUp: (value: User, callback: VoidFunction) => void;
  userSignIn: (value: User, callback: VoidFunction) => void;
  userSignOut: (callback: VoidFunction) => void;
  userForgotPassword: (value: User, callback: VoidFunction) => void;
  userResetPassword: (
    value: string,
    jwtToken: string,
    callback: VoidFunction
  ) => void;
};
