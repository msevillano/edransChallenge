const envVars = {
  "PORT": 3000,
  "JWT_SECRET": 'testSecret',
};

async function setupFunction() {
  process.env = Object.assign(envVars, process.env);
}

export default setupFunction;
