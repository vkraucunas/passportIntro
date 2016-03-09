module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/passport_intro'
  },

  production: {
    client: 'pg',
    connection: 'postgres://'
  }
};
