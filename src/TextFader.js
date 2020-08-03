import React from 'react';

function TextFader(props) {
  const { reasons } = props;
  return (
    <div>{reasons[0]}</div>
  )
}

export default TextFader;
