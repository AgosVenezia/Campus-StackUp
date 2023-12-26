window.passport = new window.immutable.passport.Passport({
    baseConfig: new window.immutable.config.ImmutableConfiguration({
      environment: window.immutable.config.Environment.SANDBOX,
    }),
    //clientId: 'enter-client-id',
    clientId: 'ibowjbCrcbQcvrSsELr6oY2zHV011eY6',
    //redirectUri: 'redirect-url',
    redirectUri: 'https://sensible-seriously-mastiff.ngrok-free.app',
    //logoutRedirectUri: 'logout-url',
    logoutRedirectUri: 'https://sensible-seriously-mastiff.ngrok-free.app/logout.html',
    audience: 'platform_api',
    scope: 'openid offline_access email transact'
  });

