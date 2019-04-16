import React from 'react';
import { Row, message } from "antd";
import showdown from "showdown";
import logo from './logo.svg';
import readme from "../README.md";
import style from './App.less';
import "./githubCss.css";

class App extends React.PureComponent {
  componentDidMount() {
    setTimeout(() => {
      message.success("This boilerplate is so cool!", 300);
    }, 500);
  }

  render() {
    // 默认option配置
    const options = {
      omitExtraWLInCodeBlocks: true,
      noHeaderId: true,
      parseImgDimensions: true,
      simplifiedAutoLink: true,
      excludeTrailingPunctuationFromURLs: true,
      literalMidWordUnderscores: true,
      tables: true,
      tasklists: true,
      strikethrough: true
    };
    const converter = new showdown.Converter(options);
    const htmlContent = converter.makeHtml(readme);
    /* eslint-disable react/no-danger */
    return (
      <Row className={style.App}>
        <header className={style["App-header"]}>
          <img src={logo} className={style["App-logo"]} alt="logo" />
          <h1 className={style["App-title"]}>React脚手架使用样例</h1>
        </header>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </Row>
    );
  }
}

export default App;
