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
  display: ${props => props.visible ? 'block' : 'none' };
  -webkit-animation: ${props => props.fade ? fadeIn : fadeOut} 2s ease; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: ${props => props.fade ? fadeIn : fadeOut} 2s ease; /* Firefox < 16 */
      -ms-animation: ${props => props.fade ? fadeIn : fadeOut} 2s ease; /* Internet Explorer */
       -o-animation: ${props => props.fade ? fadeIn : fadeOut} 2s ease; /* Opera < 12.1 */
`;

function TextFader(props) {
  const { reasons } = props;
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [visible, setVisible] = useState(true);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    let interval = setInterval(() => {
      if (counter === 10) {
        console.log('setting index.');
        setIndex(index => {
          index += 1;
          return reasons.length === index ? 0 : index;
        });
      }

      if (counter === 8) {
        console.log('fadeOut!');
        setTimeout(() => setVisible(false), 1750);
        setFade(false);
      }

      if (counter === 1) {
        console.log('fadeIn!');
        setVisible(true);
        setFade(true);
      }

      setCounter(counter => counter % 10 + 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Text visible={visible} fade={fade}>{reasons[index]}</Text>
  )
}

export default TextFader;
