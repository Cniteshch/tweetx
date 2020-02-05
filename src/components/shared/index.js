import React from "react"; 

export const MyTextField = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
     <div>
        <label>
          {label}
          <input {...field} {...props} />
        </label>
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
    </div>
    );
  };