import styled from "styled-components";

import { MaxWidthWrapper } from "./MaxWidthWrapper";

export const Quote = ({ by, source, children }) => {
  return (
    <MaxWidthWrapper maxWidth="500px">
      <figure>
        <QuoteContent>{children}</QuoteContent>
        <figcaption>
          <Author>
            <SourceLink href={source} target="_blank" rel="noreferrer noopener">
              {by}
            </SourceLink>
          </Author>
        </figcaption>
      </figure>
    </MaxWidthWrapper>
  );
};

const QuoteContent = styled.blockquote`
  margin: 0;
  background: hsl(0deg 0% 90%);
  padding: 16px 20px;
  border-radius: 8px;
  font-style: italic;

  &::before {
    content: "“";
  }

  &::after {
    content: "”";
  }
`;

const Author = styled.cite`
  display: block;
  text-align: right;
  margin-top: 8px;
`;

const SourceLink = styled.a`
  text-decoration: none;
  color: hsl(0deg 0% 35%);

  &::before {
    content: "—";
  }
`;
