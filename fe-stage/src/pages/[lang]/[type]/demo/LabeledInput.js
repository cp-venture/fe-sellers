import PropTypes from 'prop-types';
import * as React from 'react';
import clsx from 'clsx';

export function LabeledInput({
  disabled,
  label,
  name,
  onChange,
  placeholder,
  value,
}) {

  return (
    <div>
      <label  title={label}>
        {label}
      </label>
      <input
        aria-label={label}

        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}
LabeledInput.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};

export function InputRow({children}) {
  return <div>{children}</div>;
}
