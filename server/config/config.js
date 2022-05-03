// config file with third party providers credentials

import dotenv from 'dotenv';

dotenv.config();

const config = {
    'name': process.env.APP_NAME,
    'env': process.env.APP_ENV,
};

export default config;