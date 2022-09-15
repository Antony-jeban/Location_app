const dotEnv = require("dotenv");
if (process.env.NODE_ENV !== "prod") {
  const configFile = `.env.${process.env.NODE_ENV?.trim()}`;

  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT || '3000',
  LOCATION_API_KEY: process.env.LOCATION_API_KEY,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
};
