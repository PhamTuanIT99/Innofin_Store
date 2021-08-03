const ENV = {
  dev: {
    apiUrl: 'https://portal-dev.innofin.vn',
    oAuthConfig: {
      issuer: 'https://portal-dev.innofin.vn',
      clientId: 'FinCCP_App',
      clientSecret: '1q2w3E*',
      scope: 'offline_access FinCCP',
      lockoutEnabled: true,
      sendConfirmationEmail: true,
    },
    localization: {
      defaultResourceName: 'FinCCP',
    },
    trackerHost: 'https://gps-dev.innofin.vn',
  },
  prod: {
    apiUrl: 'https://portal-dev.innofin.vn',
    oAuthConfig: {
      issuer: 'https://portal-dev.innofin.vn',
      clientId: 'FinCCP_App',
      clientSecret: '1q2w3e*',
      scope: 'offline_access FinCCP',
      lockoutEnabled: true,
      sendConfirmationEmail: true,
    },
    localization: {
      defaultResourceName: 'FinCCP',
    },
    trackerHost: 'https://gps-dev.innofin.vn',
  },
};

export const getEnvVars = () => {
  // eslint-disable-next-line no-undef
  return __DEV__ ? ENV.dev : ENV.prod;
};
