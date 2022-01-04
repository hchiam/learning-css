import styled from "styled-components/macro";

import { MaxWidthWrapper } from "./MaxWidthWrapper";

export const Quote = ({ by, source, emphasize, children }) => {
  return (
    <MaxWidthWrapper maxWidth="500px">
      <figure>
        <QuoteContent emphasize={emphasize}>{children}</QuoteContent>
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
  color: hsl(0deg 0% 0%);
  padding: 16px 20px;
  border-radius: 8px;
  font-weight: ${props => props.emphasize && 'bold'};
    /* if false, it won't write this line; you won't get font-weight: false; */
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
  color: hsl(0deg 0% 75%);

  &::before {
    content: "—";
  }
`;
