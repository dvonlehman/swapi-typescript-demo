import React, { SyntheticEvent, SFC } from 'react';

export interface IMagicButtonProps {
  text: string;
  className?: string;
  onClick: (event: SyntheticEvent) => void;
}

const MagicButton: SFC<IMagicButtonProps> = props => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.text}
    </button>
  );
};

MagicButton.defaultProps = {
  className: 'magic',
};

export default MagicButton;
