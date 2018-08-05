import { css } from "react-emotion"

const styles = {}

styles.contentWindowCss = css`
  background-color: #191324;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 2rem;
  color: #fff;
  border-left: 1px solid #302b3a;

  & > div {
    padding-bottom: 95vh;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #82d8d8;
    margin-top: 1rem;
  }

  h1 {
    font-size: 4.2rem;
    position: relative;
    margin-bottom: 2.5rem;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: #e54b4b;
      left: 0;
      bottom: 0.2rem;
    }
  }

  h2 {
    font-size: 3.8rem;
  }

  h3 {
    font-size: 3.4rem;
  }

  h4 {
    font-size: 3rem;
  }

  h5 {
    font-size: 2.6rem;
  }

  h6 {
    font-size: 2.2rem;
  }

  p {
    margin-top: 0.3rem;
  }

  p + p,
  ul + p,
  ol + p {
    margin-top: 1.7rem;
  }

  p + h1,
  p + h2,
  p + h3,
  p + h4,
  p + h5,
  p + h6 {
    margin-top: 2rem;
  }

  a {
    color: #e54b4b;
  }

  ul,
  ol {
    list-style-type: none;
    margin: 0.7rem 0 0 0;
    padding: 0 0 0 2rem;
    padding-left: 2rem;
    counter-reset: list-item;

    li {
      margin: 0;
      padding: 0;
      counter-increment: list-item;

      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }

      &::before {
        margin-right: 1.5rem;
      }
    }
  }

  ul li::before {
    content: counter(list-item, disc);
  }

  ol li::before {
    content: counter(list-item, decimal) ".";
  }

  code {
    vertical-align: bottom;
  }
`

export default styles
