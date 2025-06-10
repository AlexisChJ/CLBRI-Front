export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPassword = (password: string): boolean => {
  // Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  return passwordRegex.test(password.trim());
};

// Nuevas validaciones para registro
export const isAlphanumeric = (value: string): boolean => /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value.trim());
export const isAddress = (value: string): boolean => /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s#.,-]+$/.test(value.trim());
export const isNumeric = (value: string): boolean => /^\d+$/.test(value.trim());
export const isAlphanumericToken = (value: string): boolean =>
  /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/.test(value.trim());

