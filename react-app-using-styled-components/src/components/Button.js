import styled from "styled-components/macro";

export const Button = ({ children, type, ...rest }) => {
  return (
    <StyledButton type={type} rest={rest}>
      {children}
    </StyledButton>
  );
};

export const ButtonType = Object.freeze({
  BASE: Symbol("base"),
  PRIMARY: Symbol("primary"),
});

const StyledButton = ({ children, type, ...rest }) => {
  switch (type) {
    case ButtonType.PRIMARY:
      return <PrimaryButton rest={rest}>{children}</PrimaryButton>;
    case ButtonType.BASE:
    default:
      return <BaseButton rest={rest}>{children}</BaseButton>;
  }
};

export const BaseButton = styled.button`
  font-size: 21px;
`;

// example of styled-components style composition: styled(SomeOtherStyle)``;
export const PrimaryButton = styled(BaseButton)`
  background: blue;
  color: white;
`;
