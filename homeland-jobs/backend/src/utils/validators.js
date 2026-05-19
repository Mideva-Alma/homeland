function validateRegister(data) {
  let errors = {};
  if (!data.name || data.name.trim() === '') errors.name = 'Name is required';
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Valid email required';
  if (!data.phone || !/^(07\d{8}|2547\d{8})$/.test(data.phone)) errors.phone = 'Valid Kenyan phone required';
  if (!data.password || data.password.length < 8 || !/[A-Z]/.test(data.password) || !/\d/.test(data.password)) errors.password = 'Password must be 8+ chars, 1 number, 1 uppercase';
  if (!data.role || !['freelancer','employer'].includes(data.role)) errors.role = 'Role must be freelancer or employer';
  return { errors, valid: Object.keys(errors).length === 0 };
}

function validateLogin(data) {
  let errors = {};
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Valid email required';
  if (!data.password) errors.password = 'Password required';
  return { errors, valid: Object.keys(errors).length === 0 };
}

module.exports = { validateRegister, validateLogin };
