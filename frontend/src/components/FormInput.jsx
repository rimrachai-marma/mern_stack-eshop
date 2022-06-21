import React from 'react';
import styles from './FormInput.module.scss';

const FormInput = (props) => {
  const formInputClasses = props.error
    ? `${styles['form-group']} ${styles.invalid}`
    : `${styles['form-group']}`;

  return (
    <div className={formInputClasses}>
      {props.error && (
        <div className={styles['invalid-massage']}>{props.errorMassage}</div>
      )}
      <input
        name={props.name}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
      <label>{props.label}</label>
    </div>
  );
};

export default FormInput;
