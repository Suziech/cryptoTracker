import { useState } from "react";
import React from "react";
import styled from "styled-components";

interface ContainerProps {
  $bgColor: string;
  $borderColor: string;
}

interface CircleProps {
  $bgColor: string;
  $borderColor?: string;
  text?: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props: CircleProps) => props.$bgColor};
  border-radius: 100px;
  border: 5px solid ${(props: CircleProps) => props.$borderColor};
`;

function Circle({
  $bgColor,
  $borderColor,
  text = "Default text",
}: CircleProps) {
  return (
    <Container $bgColor={$bgColor} $borderColor={$borderColor ?? $bgColor}>
      {text}
    </Container>
  );
}

export default Circle;

// interface PlayerShape {
//   name: string;
//   age: string;
// }
// const sayHello = (playerObj: PlayerShape) =>
//   `Hello ${playerObj.name} you are ${playerObj.age}`;

// sayHello({ name: "seulki", age: "12" });
// sayHello({ name: "suzie", age: "11" });
