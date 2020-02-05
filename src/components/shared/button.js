import React from "react";
import Button from "react-toolbox/lib/button/Button";


const ButtonComponent = ({onClickFunction,label}) => {
  const onClickFunctionHandler = () => {
    if (onClickFunction) {
      onClickFunction();
    }
  }
    return (
      <div>
        <Button
          className="button"
          label={label ? label : 'Tap here'}
          onClick={() => onClickFunctionHandler()}
          raised
          primary
        />
      </div>
    );
  }

export default ButtonComponent;
