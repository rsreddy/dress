module.exports = {
  response: response(),
  weather: weather()
};

function response() {
  return [
    {
      id: 1,
      description: 'Put on footwear',
      hot: 'sandals',
      cold: 'boots'
    },
    {
      id: 2,
      description: 'Put on headwear',
      hot: 'sun visor',
      cold: 'hat'
    },
    {
      id: 3,
      description: 'Put on socks',
      hot: 'fail',
      cold: 'socks'
    },
    {
      id: 4,
      description: 'Put on shirt',
      hot: 't-shirt',
      cold: 'shirt'
    },
    {
      id: 5,
      description: 'Put on jacket',
      hot: 'fail',
      cold: 'jacket'
    },
    {
      id: 6,
      description: 'Put on pants',
      hot: 'shorts',
      cold: 'pants'
    },
    {
      id: 7,
      description: 'Leave house',
      hot: 'leaving house',
      cold: 'leaving house'
    },
    {
      id: 8,
      description: 'Take off pajamas',
      hot: 'Removing PJs',
      cold: 'Removing PJs'
    }
  ];
}

function weather() {
  return {
    hot: 'hot',
    cold: 'cold'
  };
}
