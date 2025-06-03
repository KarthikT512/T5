"use client";

import { useEffect } from "react";

const Chatbot = ({ setCursorVariant }) => {
  useEffect(() => {
    // Create and configure the Chatbase script element
    const chatbaseScript = document.createElement("script");
    chatbaseScript.type = "text/javascript";
    chatbaseScript.async = true;
    chatbaseScript.text = `(function(){
      if(!window.chatbase || window.chatbase("getState") !== "initialized"){
        window.chatbase = (...arguments) => {
          if(!window.chatbase.q){
            window.chatbase.q = [];
          }
          window.chatbase.q.push(arguments);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if(prop === "q"){
              return target.q;
            }
            return (...args) => target(prop, ...args);
          }
        });
      }
      const onLoad = function(){
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "J2byVpChtFDbwqPrvaLtK";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };
      if(document.readyState === "complete"){
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();`;

    // Append the script to the document body
    document.body.appendChild(chatbaseScript);

    // Cleanup: remove the script on unmount
    return () => {
      document.body.removeChild(chatbaseScript);
    };
  }, []);

  return null;
};

export default Chatbot;
