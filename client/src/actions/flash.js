export const setFlash = (message, color) => {
  return { type: 'SET_FLASH', message, color };
};

export const clearFlash = () => {
  return { type: 'CLEAR_FLASH' };
};

export const runValidations = (validations, cb = () => {}) => {
  if(validations.every( validation => validation === true)){
    cb();
    return true;
  }
  return false;
}

export const validateFieldIsState= (fieldsObject, cb = () => {}) => dispatch => {
  let errors = [];
  let reg = /^(AL|Alabama|alabama|AK|Alaska|alaska|AZ|Arizona|arizona|AR|Arkansas|arkansas|CA|California|california|CO|Colorado|colorado|CT|Connecticut|connecticut|DE|Delaware|delaware|FL|Florida|florida|GA|Georgia|georgia|HI|Hawaii|hawaii|ID|Idaho|idaho|IL|Illinois|illinois|IN|Indiana|indiana|IA|Iowa|iowa|KS|Kansas|kansas|KY|Kentucky|kentucky|LA|Louisiana|louisiana|ME|Maine|maine|MD|Maryland|maryland|MA|Massachusetts|massachusetts|MI|Michigan|michigan|MN|Minnesota|minnesota|MS|Mississippi|mississippi|MO|Missouri|missouri|MT|Montana|montana|NE|Nebraska|nebraska|NV|Nevada|nevada|NH|New Hampshire|new hampshire|NJ|New Jersey|new jersey|NM|New Mexico|new mexico|NY|New York|new york|NC|North Carolina|new carolina|ND|North Dakota|north dakota|OH|Ohio|ohio|OK|Oklahoma|oklahoma|OR|Oregon|oregon|PA|Pennsylvania|pennsylvania|RI|Rhode Island|rhode island|SC|South Carolina|south carolina|SD|South Dakota|south dakota|TN|Tennessee|tennessee|TX|Texas|texas|UT|Utah|utah|VT|Vermont|vermont|VA|Virginia|virginia|WA|Washington|washington|WV|West Virginia|west virginia|WI|Wisconsin|wisconsin|WY|Wyoming|wyoming)$/;
  Object.keys(fieldsObject).forEach(key => {
    if(!reg.test(fieldsObject[key])){
      errors.push(`${key} is not a valid state.`)
    }
  });
  if(errors.length === 0){
    cb();
    return true;
  }
  dispatch(setFlash(errors.join('\n')));
  return false;
}

export const validateFieldIsZip= (fieldsObject, cb = () => {}) => dispatch => {
  let errors = [];
  let reg = /(^\d{5}(?:[\s]?[-\s][\s]?\d{4})?$)/;
  Object.keys(fieldsObject).forEach(key => {
    if(!reg.test(fieldsObject[key])){
      errors.push(`${key} is not a valid zip code.`)
    }
  });
  if(errors.length === 0){
    cb();
    return true;
  }
  dispatch(setFlash(errors.join('\n')));
  return false;
}

export const validateFieldIsPhone= (fieldsObject, cb = () => {}) => dispatch => {
  let errors = [];
  let reg = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  Object.keys(fieldsObject).forEach(key => {
    if(!reg.test(fieldsObject[key])){
      errors.push(`${key} is not a valid phone number.`)
    }
  });
  if(errors.length === 0){
    cb();
    return true;
  }
  dispatch(setFlash(errors.join('\n')));
  return false;
}



export const validatePasswordAndConfirmation = (password, passwordConfirmation, cb = () => {}) => dispatch => {
  let errors = [];
  if ( password !== passwordConfirmation ) {
    errors.push("Password and Confirmation don't match")
  }
  if ( errors.length === 0) {
    cb();
    return true;
  }
  dispatch(setFlash(errors.join('\n')));
  return false;
}