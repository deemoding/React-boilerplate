import React from 'react';
import showdown from "showdown";
import logo from './logo.svg';
import readme from "../README.md";
import './App.css';

class App extends React.PureComponent {
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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React脚手架使用样例</h1>
        </header>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  }
}

export default App;
