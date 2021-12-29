import styled from "styled-components";

export const MaxWidthWrapper = ({ children, maxWidth }) => {
  return <Wrapper maxWidth={maxWidth}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  max-width: ${(props) => props.maxWidth};
  margin-inline: auto;
  padding-inline: 16px;
`;
