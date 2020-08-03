import React, { useState, useEffect } from 'react';
import TextFader from './TextFader';
import styled from '@emotion/styled';

const Wrapper = styled.div`
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
  const [seen, setSeen] = useState([]);

  useEffect(() => {
    fetch('https://l0lluprag9.execute-api.us-east-1.amazonaws.com/prod', apiOptions)
    .then(res => res.json())
    .then(
      (result) => {
        const reasons = JSON.parse(result.body).reasons;
        setIsLoaded(true);
        setReasons(reasons);
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
