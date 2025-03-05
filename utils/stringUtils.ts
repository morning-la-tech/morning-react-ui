export const normalizeString = (str: string) => {
  return (
    str &&
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  );
};

/**
 * Given a string, will capitalize first letter
 */
export const capitalizeStr = (str: string) => {
  return str.charAt(0).toUpperCase() + str.replace(/\.$/, '').slice(1);
};

/**
 * Given two strings, will return most recently added char
 */
export const newCharInString = (
  str1: string | null,
  str2: string | null,
): string => {
  if (str1 != null && str2 != null && str2.length > str1.length) {
    let i = 0;
    while (i < str1.length) {
      if (str1[i] != str2[i]) {
        return str2[i];
      }
      i++;
    }
    return str2[i];
  }
  return '';
};

export const stripHtml = (htmlString: string) => {
  return htmlString.replace(/<[^>]*>/g, '');
};

export const validateAndNormalizeUrl = (urlToValidate: string) => {
  if (!urlToValidate) {
    return '';
  }
  const hasValidScheme = /^(https?:\/\/|ftp:\/\/)/i.test(urlToValidate);
  if (!hasValidScheme) {
    urlToValidate = `https://${urlToValidate}`;
  }
  const pattern =
    /^(https?:\/\/|ftp:\/\/)([\w-]+(\.[\w-]+)+|localhost|[\d.]+)(:[\d]+)?(\/[\w .-]*)*\/?$/;
  if (pattern.test(urlToValidate)) {
    return urlToValidate;
  } else {
    return null;
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)\])$/i;
  return emailRegex.test(email);
};
