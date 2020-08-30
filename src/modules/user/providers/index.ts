import {container} from 'tsyringe';

import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/user/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
