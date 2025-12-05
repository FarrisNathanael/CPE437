// proto/src/styles/headings.css.ts
import { css } from "lit";

const styles = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-headings, system-ui, sans-serif);
    font-weight: 600;
    line-height: 1.2;
    margin: 0 0 0.5rem;
    color: var(--color-text, #111);
  }

  h1 { font-size: clamp(2rem, 3vw, 2.5rem); }
  h2 { font-size: clamp(1.6rem, 2.4vw, 2rem); }
  h3 { font-size: clamp(1.3rem, 2vw, 1.6rem); }
`;

export default { styles };