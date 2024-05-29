export default () => ({
  database: {
    connectionString: process.env.MONOG_URL,
  },
  port: process.env.PORT,
});
