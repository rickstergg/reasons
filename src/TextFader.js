import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Text = styled.div`
  -webkit-animation: ${props => props.visible ? fadeIn : fadeOut} 2s ease; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: ${props => props.visible ? fadeIn : fadeOut} 2s ease; /* Firefox < 16 */
      -ms-animation: ${props => props.visible ? fadeIn : fadeOut} 2s ease; /* Internet Explorer */
       -o-animation: ${props => props.visible ? fadeIn : fadeOut} 2s ease; /* Opera < 12.1 */
`;

function TextFader(props) {
  const { reasons } = props;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setIndex(index => {
        index += 1;
        return reasons.length === index ? 0 : index;
      });
      setVisible(visible => !visible);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <Text visible={visible}>{reasons[index]}</Text>
  )
}

export default TextFader;
