// Function to generate a random password
const generatePassword = () => {
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()";

  // Shuffle and randomly pick characters
  let password = "";
  for (let i = 0; i < 9; i++) {
    const allChars = lowerCase + upperCase + numbers;
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Insert a special character at the 6th position
  const specialChar =
    specialChars[Math.floor(Math.random() * specialChars.length)];
  password = password.slice(0, 5) + specialChar + password.slice(5);

  return password;
};
