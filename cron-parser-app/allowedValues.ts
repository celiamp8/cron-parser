interface ValuesInterface {
  [key: string]: {
    [numKey: string]: number
  };
}

const values: ValuesInterface = {
  'minutes': {
    'min_val': 0,
    'max_val': 59
  },
  'hours': {
    'min_val': 0,
    'max_val': 23
  },
  'dayMonth': {
    'min_val': 1,
    'max_val': 31
  },
  'month': {
    'min_val': 1,
    'max_val': 12
  },
  'dayWeek': {
    'min_val': 1,
    'max_val': 7
  }
};

export default values;