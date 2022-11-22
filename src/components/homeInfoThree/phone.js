import React, { useState, useEffect } from "react";
import "./styles.css";

const Phone = ({ inViewport, forwardedRef, finished, onFinished }) => {
  const messages = [
    {
      author: "David",
      message: "I'm so bored rn. Wanna play a duel with me?",
    },
    {
      author: "Jeffrey",
      message: "Sure, I'm down",
    },
    {
      author: "Jeffrey",
      message: "Send a link",
    },
    {
      author: "David",
      message: "Ok",
    },
    {
      author: "David",
      message: "https://www.cpduels.com/play/637cf18f5fe4f66d0b152238",
      highlight: true
    },
    {
      author: "Jeffrey",
      message: "Alright I joined.",
    },
    {
      author: "Jeffrey",
      message: "U ready?",
    },
    {
      author: "David",
      message: "Yeah let's go",
    },
    {
      author: "Leo",
      message: "I'll play whoever wins!",
    },
    {
      author: "Rico",
      message: "Yo this website's dope!!!",
    }
  ];

  const [animating, setAnimating] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [newMessages, setNewMessages] = useState(finished ? messages : []);
  const [typingIndicator, setTypingIndicator] = useState(null);

  useEffect(() => {
    const animate = async () => {
      setAnimating(true);
      await sleep(5000);
      for (let i = 0; i < messages.length; i++) {
        await sleep(500);
        setTypingIndicator(messages[i].author);
        await sleep(2500);
        setTypingIndicator(null);
        setNewMessages(messages.slice(0, i + 1));
      }
      setAnimating(false);
      onFinished();
    };
    if (inViewport && !animating && !finished) {
      animate();
    }
  }, [finished, inViewport, animating]);

  return (
    <div class="phone" ref={forwardedRef}>
      <div class="phone-inner">
        <div class="phone-front-camera"></div>
        <div class="phone-screen-top">
          <div class="phone-screen-left-arrow"></div>
          <div class="phone-screen-header">Programming Club</div>
        </div>
        <div class="phone-screen-middle">
          <div class="phone-screen-content">
            <div class="phone-screen-content-message">
              <div class="author">Leo</div>
              <div class="message">
                @Jeffrey @David Yo guys how's the website going?
              </div>
            </div>
            <div class="phone-screen-content-message">
              <div class="author">David</div>
              <div class="message">The website's almost finished!</div>
            </div>
            <div class="phone-screen-content-message">
              <div class="author">Leo</div>
              <div class="message">Wow there's a dark mode now? So cool!</div>
            </div>
            <div class="phone-screen-content-message">
              <div class="author">David</div>
              <div class="message">
                Yes, it's dark by default, but you can change it to light if you
                prefer.
              </div>
            </div>
            <div class="phone-screen-content-message">
              <div class="author">Jeffrey</div>
              <div class="message">
                I'm almost done with the backend. Just got updateSubmissions()
                to work...
              </div>
            </div>
            <div class="phone-screen-content-message">
              <div class="author">David</div>
              <div class="message">
                Cool. I'm just adding some finishing touches to the home page.
                Making this fake phone thing with CSS is kind of hard.
              </div>
            </div>
            <div class="phone-screen-content-message">
              <div class="author">Jeffrey</div>
              <div class="message">
                I think you should use it to convey that you can duel with
                friends.
              </div>
            </div>
            {newMessages.length ? (
              <>
                <div class="new-message-bar"></div>
                {newMessages.map((message) => (
                <div class="phone-screen-content-message">
                  <div class="author">{message.author}</div>
                  <div class={`message ${message.highlight ? "highlight" : ""}`}>{message.message}</div>
                </div>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div class="phone-screen-bottom">
          <div class="phone-screen-input-section">
            <div class="phone-screen-input-area">
              <span>Message</span>
              <div class="phone-screen-send-button">↑</div>
            </div>
          </div>
          <div class="phone-screen-typing-indicator">
            {typingIndicator ? (
              <>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <span>{typingIndicator} is typing</span>
              </>
            ) : (
              ""
            )}
          </div>
          <div class="phone-screen-bottom-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
