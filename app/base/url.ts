/**
 *
 * @param {string} name
 * @returns {string | null}
 */
export function getQueryParamByName(name: string) {
  const urlParams = new URLSearchParams(window.location.search);
  const value: string | null = urlParams.get(name);

  return value;
}

export function getDomainName(): string {
  const { hostname } = window.location;

  return hostname.substring(hostname.lastIndexOf('.', hostname.lastIndexOf('.') - 1) + 1);
}
