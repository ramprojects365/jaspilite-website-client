import 'zone.js/dist/zone-node';

import { createProxyMiddleware } from 'http-proxy-middleware';
declare var require;

import * as express from 'express';
import {join} from 'path';


// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');

//We need comment the below line before we go to production.
app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));


// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
//app.set('views', DIST_FOLDER, 'browser');
app.set('views', join(DIST_FOLDER, 'browser'));


app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// Example Express Rest API endpoints
app.get('/api/**', (req, res) => { 
 res.status(404).send('data requests are not supported');
});

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});