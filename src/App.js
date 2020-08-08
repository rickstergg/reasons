import React, { useState, useEffect } from 'react';
import TextFader from './TextFader';
import styled from '@emotion/styled';
import { shuffle } from './utils/shuffle';
import { getApiUrl } from './utils/api';

const Wrapper = styled.div`
  background-color: black;
  color: white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const apiOptions = {
  method: 'GET',
  mode: 'cors',
}

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    fetch(getApiUrl(), apiOptions)
    .then(res => res.json())
    .then(
      (result) => {
        const reasons = JSON.parse(result.body).reasons;
        setIsLoaded(true);
        setReasons(shuffle(reasons));
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, []);

  if (error) {
    return <Wrapper>Error: {JSON.stringify(error)}</Wrapper>;
  } else if (!isLoaded) {
    return <Wrapper>Loading...</Wrapper>;
  } else {
    return (
      <Wrapper>
        <TextFader reasons={reasons} />
      </Wrapper>
    );
  }
}

export default App;
