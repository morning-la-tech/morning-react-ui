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
<<<<<<< HEAD

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
=======
>>>>>>> fb899a2 (Text area & Modal changement)
