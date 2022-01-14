import styled from "styled-components/macro";

export const Breadcrumbs = ({ children }) => {
  return (
    <BreadcrumbWrapper>
      <Crumb href="/">Home</Crumb>
      <Crumb href="/living">Living Room</Crumb>
      <Crumb href="/living/couch">Couches</Crumb>
      <Crumb href="/living/couch/sectional" isCurrentPage={true}>
        Sectionals
      </Crumb>
    </BreadcrumbWrapper>
  );
};

const BreadcrumbWrapper = ({ children }) => {
  return (
    <StyledBreadcrumbWrapper aria-label="breadcrumbs">
      {children}
    </StyledBreadcrumbWrapper>
  );
};

const StyledBreadcrumbWrapper = styled.nav`
  background: white;
  padding: 3px 0;
  margin-block: 3px;
  width: fit-content;
`;

const Crumb = ({ children, href, isCurrentPage }) => {
  return (
    <>
      <Separator tabIndex={-1} aria-hidden="true">
        {" "}
        &gt;{" "}
      </Separator>
      <StyledCrumb href={href} aria-current={isCurrentPage && "page"}>
        {children}
      </StyledCrumb>
    </>
  );
};

const Separator = styled.span`
  background: white;
  color: black;
  &:first-of-type {
    display: none;
  }
`;

const StyledCrumb = styled.a`
  margin-inline: 1px;
  background: white;
  color: blue;
  padding: 3px;
  border-radius: 7px;
  text-decoration: none !important;
  transition: background 0.2s, color 0.2s;

  &:hover,
  &:focus,
  &[aria-current="page"] {
    background: #333 !important;
    color: white !important;
  }

  &[aria-current="page"] {
    text-decoration: underline !important;
    color: lime !important;
  }
`;
