import logger from '../logger/logger';
import _ from 'lodash';

export default (app) => {
    app.use((err, req, res, next) => {
        logger.error(_.pick(err, 'message', 'stack'));
        return res.status(500).send('Something failed.');
    });
}