import { generateProps } from 'styled-gen';
import styled from 'styled-components';

export const RichTextContent = styled.div`
  * + * {
    margin-top: 1rem;
  }

  * + h2 {
    margin-top: 4rem;
  }

  * + picture {
    margin-top: 2rem;
  }

  * + ul {
    margin-top: 3rem;
  }

  ul {
    list-style: disc;
    padding-left: 1.5rem;
  }

  ${generateProps};
`;
