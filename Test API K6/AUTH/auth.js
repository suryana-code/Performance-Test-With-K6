import { options as registerOptions, default as registerScript } from './register.js';
import { options as logoutOptions, default as logoutScript } from './logout.js';
import { options as loginOptions, default as loginScript } from './login.js';
import { group } from 'k6';

export const options = {
    // vus: 5,
    duration: '2s',
};

export default function () {
    group('Register Test', registerScript);
    group('Logout Test', logoutScript);
    group('Login Test', loginScript);
}
