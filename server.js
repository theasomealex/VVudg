const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


//SERVICIO PARA TIEMPOS HORA Y FECHA
const moment = require('moment');
console.log(moment().format('DD/MM/YYYY'));

const authController = require('./controllers/authController');
const prueba = require('./controllers/pruebaController');
const user = require('./controllers/userController');
const time = require('./controllers/timeController');

/* Use environment defined port on 3000 */
const port = 3000;
// =====================================================================================================================

/* Create our Express router */
const router = express.Router();
// =====================================================================================================================

/* CONNECTION TO MONGO DB */
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/vvudg');

// =====================================================================================================================

/* USE THE BODY-PARSER PACKAGE IN OUR APPLICATION */
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());
// =====================================================================================================================

app.use('/vvudg', router);


router.route('/prueba')
  .get(prueba.pruebaGET)
  .post(prueba.pruebaPOST);

router.route('/prueba/:id')
  .get(prueba.pruebaGETBYID)
  .put(prueba.pruebaPUT)
  .delete(prueba.pruebaDELETE);

router.route('/user')
  .get(authController.isBasicAuthenticated, user.userGET)
  .post(authController.isBasicAuthenticated, user.userPOST);

router.route('/user/:id')
  .get(authController.isBasicAuthenticated, user.userGETBYID)
  .put(authController.isBasicAuthenticated, user.userPUT)
  .delete(authController.isBasicAuthenticated, user.userDELETE);

router.route('/auth')
  .get(authController.isBasicAuthenticated, user.authUser);

router.route('/time')
  .get(time.timeGET)
  .post(time.timePOST);

router.route('/time/:id')
  .get(time.timeGETBYID)
  .put(time.timePUT)
  .delete(time.timeDELETE);
app.listen(port, function () {
  console.log('VVudg listening on port : 3000');
});
