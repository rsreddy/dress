var router = require('express').Router();
var four0four = require('./utils/404')();
var _ = require('underscore');
var data = require('./data');
var services = require('./services');
var models = require('./models');


router.post('/attire', attire);
router.get('/:temperature', temperature);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////
function attire(req, res, next) {
  var inOutfit = [];
  var outfit = {};
  var responses = [];
  var i = '';
  var temperature = '';
  var attire = '';
  var error = [];

  inOutfit = req.body.outfit;
  try {
    if (inOutfit[0].toLowerCase() === data.weather.hot || inOutfit[0].toLowerCase() === data.weather.cold) {
      temperature = inOutfit[0].toLowerCase();
      responses.push(inOutfit[0].toUpperCase());
      if (_initialState(inOutfit[1])) {
        for (i = 1; i <= inOutfit.length - 1; i++) {
          //for each - check the criteria
          if(_checkCriteria(inOutfit[i], inOutfit[i-1], inOutfit[i+1], temperature) && _getResponse(inOutfit[inOutfit.length - 1], temperature) === 'leaving house') {
            attire = _getResponse(inOutfit[i], temperature);
            console.log('Attire = ' + attire);
            responses.push(attire);
          }//end if for valid criteria
        }//end for
        outfit = { data: responses };
        res.status(200).send(outfit);
      } // end if for [1]
    } //end if for [0]
  } catch (e) {
    console.log('not cool' + e);
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

function _initialState(element) {
  var filtered = [];

  filtered = _.filter(data.response, function (obj) {
    return (obj.description.match(/off pajamas/i));
  });

  if (element === filtered[0].id) {
    return true;
  } else {
    return false;
  }
}

function _getResponse(element, temperatureType) {
  var id = '';
  id = _.find(data.response, function (obj) {
    return obj.id === element;
  });
  if (id) {
    return id[temperatureType];
  } else {
    return null;
  }
}

function _checkCriteria(current, prev, next, temperatureType) {
  if ( (_isTemp(current, temperatureType)) && (_isCheckFootAttire(current, prev, next, temperatureType)) && (_isCheckHeadAttire(current, prev, next, temperatureType)) && (_isLeavingHouse(current, prev, next, temperatureType)) ){
    return true;
  } else {
    console.log('_isTemp = ' + _isTemp(current, temperatureType));
    console.log('_isFootCheckAttire = ' + _isCheckFootAttire(current, prev, next, temperatureType));
    console.log('_isHeadCheckAttire = ' + _isCheckHeadAttire(current, prev, next, temperatureType));
    console.log('_isLeavingHouse = ' + _isLeavingHouse(current, prev, next, temperatureType) );
    //stop processing and return error array
  }
}

function _isTemp(current, temperatureType) {
  if (_getResponse(current, temperatureType) === 'fail') {
    return false;
  } else {
    return true;
  }
}

function _isCheckFootAttire(current, prev, next, temperatureType) {
  if ( (temperatureType === data.weather.cold) && (_getResponse(current, temperatureType) === 'boots') && (_getResponse(prev, temperatureType) !== 'socks') ) {
    return false;
  } else if ( (temperatureType === data.weather.cold) && (_getResponse(current, temperatureType) === 'boots') && (_getResponse(prev, temperatureType) !== 'pants') ) {
    return false;
  }
  return true;

}

function _isCheckHeadAttire(current, prev, next, temperatureType) {
  if ( (temperatureType === data.weather.hot) && (_getResponse(current, temperatureType) === 'sun visor') && (_getResponse(prev, temperatureType) !== 't-shirt') ) {
    return false;
  } else if ( (temperatureType === data.weather.cold) && (_getResponse(current, temperatureType) === 'hat') && (_getResponse(prev, temperatureType) !== 'shirt') ) {
    return false;
  }
  return true;

}

function _isLeavingHouse(current, prev, next, temperatureType) {
  if (_getResponse(current, temperatureType) === _getResponse(prev, temperatureType) ) {
    return false;
  }
  return true;
}
