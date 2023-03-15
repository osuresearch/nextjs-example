


export function useShibboleth() {
  if (typeof window !== 'undefined') {
    throw new Error('This only works on the server at the moment');
  }

  // TODO: SAML bs.
  // See: https://github.com/nextauthjs/next-auth/issues/311
}
