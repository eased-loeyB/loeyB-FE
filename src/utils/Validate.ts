export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => {
  const regex = /.{8,}/; // at least 8 letters
  return regex.test(String(password).toLowerCase());
};

export const isImage = (fileName: string) =>
  !!['PNG', 'JPG', 'JPEG', 'HEIC'].find(i =>
    fileName.toUpperCase().includes(i),
  );

export const isPDF = (fileName: string) =>
  !!['PDF'].find(i => fileName.toUpperCase().includes(i));

export const isVideo = (fileName: string) =>
  !!['MP4', 'MOV'].find(i => fileName.toUpperCase().includes(i));

export const secureUrl = (url: string) => url.includes('connect?fileId=');

export const validateUserName = (userName: string) => {
  if (userName.length === 0 || userName.length > 30) {
    return false;
  }
  return !containsSpecialChars(userName);
};

export const containsSpecialChars = (str: string) => {
  const specialChars = /[`!@#$%^&*()\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
};
