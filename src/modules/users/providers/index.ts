import { container } from 'tsyringe';

import IHashProvider from './HashProvider/interfaces/IHashProvider';
import BcryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
