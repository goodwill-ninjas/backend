export interface JwtPayload {
  iss: string;
  context: {
    user: {
      userId: number;
      displayName: string;
    };
  };
}
