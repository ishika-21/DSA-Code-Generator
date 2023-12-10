import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [userInputLang, setUserInputLang] = useState('');

  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput, userInputLang }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const onUserChangedTextLang = (event) => {
    setUserInputLang(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | aakritiroshan</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate solutions for problems</h1>
          </div>
          <div className="header-subtitle">
            <h2>Just paste the question that you're having a problem with ;)</h2>
          </div>
        </div>

        <div className="prompt-container-exp">
          <textarea
            placeholder="Write your preferred programming language"
            className="prompt-box"
            value={userInputLang}
            onChange={onUserChangedTextLang}
          />
        </div>

        <div className="prompt-container">
          <textarea
            placeholder="Write here!"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <button
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </button>
          </div>

          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Solution</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.linkedin.com/in/aakritiroshan2002/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>Made by:Ishika Chaudhary</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
