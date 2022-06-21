import React from 'react';

import styles from './FormInput.module.scss';

function FormInput(props) {
  const formInputClasses = props.error
    ? `${styles['form-group']} ${styles.invalid}`
    : `${styles['form-group']}`;

  return (
    <div className={formInputClasses}>
      {props.loading && <span>Uploading...</span>}
      <label htmlFor={props.htmlFor}>{props.label}</label>
      {props.textarea === true ? (
        <textarea
          name={props.name}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          cols={props.cols}
          rows={props.rows}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        ></textarea>
      ) : (
        <input
          disabled={props.disabled}
          name={props.name}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      )}
      {props.error && (
        <div className={styles['invalid-massage']}>{props.errorMassage}</div>
      )}
    </div>
  );
}

export default FormInput;
