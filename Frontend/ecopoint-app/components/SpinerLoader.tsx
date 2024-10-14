import React from "react";
import styled from "styled-components/native"; // Usa 'styled-components/native' para React Native
import { ActivityIndicator } from "react-native"; // Componente nativo para carga

export function SpinnerLoader() {
  return (
    <Container>
      <ActivityIndicator color="#FFF140" size="large" />{" "}
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

export default SpinnerLoader;
