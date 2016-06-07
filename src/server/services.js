var four0four = require('./utils/404')();
var data = require('./data');
var helpers = require('./helpers');

module.exports = {
  attire: attire,
  temperature: temperature
};

//////////////
function attire(req, res, next) {
  var inOutfit = [];
  var outfit = {};
  var responses = [];
  var i = '';
  var temperature = '';
  var attire = '';
  var error = [];
  var abort = false;

  inOutfit = req.body.outfit;
  try {
    if (inOutfit[0].toLowerCase() === data.weather.hot ||
        inOutfit[0].toLowerCase() === data.weather.cold) {
      temperature = inOutfit[0].toLowerCase();
      responses.push(inOutfit[0].toUpperCase());
      if (helpers._initialState(inOutfit[1])) {
        for (i = 1; i <= inOutfit.length - 1 && !abort; i++) {
          if (helpers._checkCriteria(inOutfit[i], inOutfit[i-1], inOutfit[i+1], temperature) &&
             (helpers._getResponse(inOutfit[inOutfit.length - 1],
                temperature) === 'leaving house')) {
            attire = helpers._getResponse(inOutfit[i], temperature);
            responses.push(attire);
          } else {
            responses.push('fail');
            abort = true;
          }
        }
      } else {
        responses.push('fail');
      }
      outfit = { data: responses };
      console.log(outfit);
      res.status(200).send(outfit);
    }
  } catch (e) {
    console.log(e);
    four0four.send404(req, res, 'NOT FOUND') ;
  }
}

function temperature(req, res, next) {
  var tempType = req.params.temperature;
  var obj = '';
  var respData = [];
  var i = '';
  var copyObj = {};

  for (i = 0; i <= data.response.length - 1; i ++) {
    obj = data.response[i];
    if (tempType === data.weather.hot) {
      copyObj = Object.assign({}, obj);
      delete copyObj.cold;
      respData.push(copyObj);
    } else if (tempType === data.weather.cold) {
      copyObj = Object.assign({}, obj);
      delete copyObj.hot;
      respData.push(copyObj);
    }
    // } else {
    //   four0four.send404(req, res, 'NOT FOUND') ;
    // }
  }
  res.status(200).send(respData);
}
