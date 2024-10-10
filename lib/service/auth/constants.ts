export const accessTokenConfig = {
  expiration: 60 * 60 * 24, // 1 day
  name: 'accessToken',
} as const;

export const protectedRoutes = ['/archive', '/posts'] as const;
