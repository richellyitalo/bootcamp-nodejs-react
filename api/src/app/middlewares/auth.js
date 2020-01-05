import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Não autenticado!' });
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    // const verify = promisify(jwt.verify); // cria função promise
    // const decoded = verify(token, authConfig.secret)
    //   .then(res1 => console.log('deu bom', res1))
    //   .catch(err => console.log('deu ruim', err));
  } catch (err) {
    // console.log(err.message);
    return res.status(401).json({ error: 'Token inválido' });
  }

  return next();
};
