var _ = require('underscore');
var data = require('./data');

module.exports = {
  _getResponse: _getResponse,
  _initialState: _initialState,
  _checkCriteria: _checkCriteria,
  _isTemp: _isTemp,
  _isCheckFootAttire: _isCheckFootAttire,
  _isCheckHeadAttire: _isCheckHeadAttire,
  _isLeavingHouse: _isLeavingHouse
};

//////////////
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
    return false;
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
