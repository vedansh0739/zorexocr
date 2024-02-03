import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  resultsState,
  fileNamesState,
  answersState,
  scoresState,
  answerHeadingsState,
  queriesState,
  isLoadingState,
} from "./atoms";
import { useRecoilState } from "recoil";
import LoadingIndicator from "./LoadingIndicator";
import "../App.css";

import "./style1.css";
import FileUpload from "./FileUpload";

const ChatInterface = ({ onFilesSelected }) => {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [answers, setAnswers] = useRecoilState(answersState);
  const [scores, setAnswersScores] = useRecoilState(scoresState);
  const [answerHeadings, setAnswerHeadings] =
    useRecoilState(answerHeadingsState);
  const [queries, setQueries] = useRecoilState(queriesState);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleFileUpload = (event) => {
    const files = event.target.files;
    // 'files' is a FileList object that contains all the selected files.
    // You can iterate over this list to process or upload files.
  };
  const sendMessage = async () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      try {
        fetch("https://backend.zorex.xyz/rag/query/", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: inputValue }),
        })
          .then((response) => response.json())
          .then((data) => {
            setAnswers((answers) => [...answers, data.summaries[0]]);
            setAnswerHeadings((answerHeadings) => [
              ...answerHeadings,
              data.filenames[0],
            ]);
            setAnswersScores((scores)=>[...scores, data.scores[0]])
            setQueries((queries) => [...queries, inputValue]);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        console.log(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
      setInputValue("");
    }
  };
  const sendMessageOnlyIfEnter = async (event) => {
    if (event.key === "Enter") {
      await sendMessage();
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const results = useRecoilValue(resultsState);
  const fileNames = useRecoilValue(fileNamesState);
  return (
    <div
      style={{
        flex: 1,
        height: "99vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "10px",
          border: "0px solid grey",
          margin: "10px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
        }}
      >
        {isLoading && <LoadingIndicator />}
        {results.length > 0 && <h4>Summaries:</h4>}

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {results.map((result, index) => (
            <li
              key={index}
              style={{
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  fontSize: "small",
                  lineHeight: "2.1",
                  textAlign: "justify",
                  width: "100%",
                }}
              >
                <strong>{fileNames[index]}</strong>
              </div>

              <div
                style={{
                  fontSize: "small",
                  lineHeight: "2.1",
                  textAlign: "justify",
                  width: "100%",
                }}
              >
                {result}
              </div>
            </li>
          ))}
        </ul>

        {queries.length > 0 && <h4>Queries:</h4>}

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {answers.map((answer, index) => (
            <li
              key={index}
              style={{
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  fontSize: "small",
                  lineHeight: "2.1",
                  textAlign: "justify",
                  width: "100%",
                }}
              >
                <strong>{"Question"}</strong>
                <p>{queries[index]}</p>
              </div>

              <div
                style={{
                  fontSize: "small",
                  lineHeight: "2.1",
                  textAlign: "justify",
                  width: "100%",
                }}
              >
                <strong>{"Answer"}</strong>
                <p>
                  {"The most relevant document is " + answerHeadings[index]}
                </p>
                <p>Here is a summary of it:</p>
              </div>

              <div
                style={{
                  fontSize: "small",
                  lineHeight: "2.1",
                  textAlign: "justify",
                  width: "100%",
                }}
              >
                {answer}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          padding: "10px",
          border: "0px solid grey",
          margin: "10px",
          borderRadius: "10px",
          height: "25px", 
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        <input
          className="a2"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          style={{ flex: 1, marginRight: "10px" }}
          onKeyDown={sendMessageOnlyIfEnter}
        />
        <button className="smallbutton" onClick={sendMessage}>
          Search
        </button>
        {/*<FileUpload onFilesSelected= { onFilesSelected } />*/}
      </div>
    </div>
  );
};

export default ChatInterface;
