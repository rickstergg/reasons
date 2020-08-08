import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-40px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);
  }

  to {
    opacity: 0;
    transform: translateY(40px);
  }
`;

const FontSize = css`
  font-size: 24px;

  @media (min-width: 768px) {
    font-size: 32px;
  }

  @media (min-width: 1024px) {
    font-size: 48px;
  }

  @media (min-width: 1224px) {
    font-size: 72px;
  }
`;

const Text = styled.div`
  ${FontSize}
  font-family: 'AnimalCrossing', Courier, sans-serif;
  margin: auto;
  text-align: center;
  width: 80%;
  display: ${props => props.visible ? 'block' : 'none' };
  -webkit-animation: ${props => props.fade ? fadeIn : fadeOut} 1s ease; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: ${props => props.fade ? fadeIn : fadeOut} 1s ease; /* Firefox < 16 */
      -ms-animation: ${props => props.fade ? fadeIn : fadeOut} 1s ease; /* Internet Explorer */
       -o-animation: ${props => props.fade ? fadeIn : fadeOut} 1s ease; /* Opera < 12.1 */
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
        setIndex(index => {
          index += 1;
          return reasons.length === index ? 0 : index;
        });
        setVisible(true);
        setFade(true);
      }

      if (counter === 9) {
        setTimeout(() => setVisible(false), 850);
        setFade(false);
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
