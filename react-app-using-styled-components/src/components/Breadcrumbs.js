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
      <ol>{children}</ol>
    </StyledBreadcrumbWrapper>
  );
};

const StyledBreadcrumbWrapper = styled.nav`
  background: white;
  padding: 3px 0;
  margin-block: 3px;
  width: fit-content;
  ol {
    list-style: none;
    background: white;
    color: black !important;
    display: flex;
    padding: 0;
  }
`;

const Crumb = ({ children, href, isCurrentPage }) => {
  return (
    <CrumbWrapper>
      <Separator tabIndex={-1} aria-hidden="true">
        {" "}
        &gt;{" "}
      </Separator>
      <StyledCrumb href={href} aria-current={isCurrentPage && "page"}>
        {children}
      </StyledCrumb>
    </CrumbWrapper>
  );
};

const CrumbWrapper = styled.li`
  background: white;
  &:first-of-type span {
    display: none;
  }
`;

const Separator = styled.span`
  background: white;
  color: black;
`;

const StyledCrumb = styled.a`
  margin-inline: 1px;
  background: white;
  color: blue;
  padding: 3px;
  border-radius: 7px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;

  &:hover,
  &:focus,
  &[aria-current="page"] {
    background: #333 !important;
    color: white !important;
  }

  &[aria-current="page"] {
    text-decoration: revert;
    color: lime !important;
  }
`;
