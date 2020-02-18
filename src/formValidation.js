import * as React from 'react';
import validator from 'validator';

export const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return <span className="form-error is-visible">This field is required.</span>;
  }
};

export const email = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="form-error is-visible">{value} is not a valid email.</span>;
  }
};

export const isEqual = (value, props, components) => {
  const bothUsed = components.password[0].isUsed && components.confirmPassword[0].isUsed;
  const bothChanged = components.password[0].isChanged && components.confirmPassword[0].isChanged;

  if (bothChanged && bothUsed && components.password[0].value !== components.confirmPassword[0].value) {
    return <span className="form-error is-visible">Passwords are not equal.</span>;
  }
};

export const IsYoutubeUrl = (value) => {
  if (value !== undefined || value !== '') {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=|\?v=)([^#]*).*/;
    var match = value.match(regExp);
    if(!match) {
      return <span className="form-error is-visible">{value} is not a valid youtube url.</span>;
    }
  }
}