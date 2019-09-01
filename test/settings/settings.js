const envVars = {
  "PORT": 3000
};

async function setupFunction() {
  process.env = Object.assign(envVars, process.env);
}

export default setupFunction;
