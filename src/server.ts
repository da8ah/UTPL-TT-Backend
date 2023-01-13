import app from './services/app/app';
import DBConn from './services/persistencia/adapters/DBConn';

DBConn.getInstance();

const port = app.get('port')

const server = app.listen(port, () => {
    console.log('Server on port', port);
});

export default server;