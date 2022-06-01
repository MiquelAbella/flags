import React, { useEffect, useState } from "react";
import { flags } from "../data/Flags.js";

import styles from "./Quiz.module.css";

export const Quiz = () => {
  const [score, setScore] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [randNums, setRandNums] = useState([
    Math.floor(Math.random() * flags.length),
    Math.floor(Math.random() * flags.length),
    Math.floor(Math.random() * flags.length),
    Math.floor(Math.random() * flags.length),
    Math.floor(Math.random() * flags.length),
  ]);

  const [correctAnswer, setCorrectAnswer] = useState(
    Math.floor(Math.random() * randNums.length)
  );

  const handleStartGame = () => {
    setScore(0);
    setCountdown(60);
    setIsGameStarted(true);
  };

  useEffect(() => {
    if (isGameStarted && countdown !== 0) {
      setTimeout(() => {
        setCountdown((count) => count - 1);
      }, 1000);
    } else if (isGameStarted) {
      setCountdown(0);
      setIsGameStarted(false);
    }
    console.log("hey");
  }, [countdown, isGameStarted]);

  const handleAnswer = (e) => {
    if (parseInt(e.target.getAttribute("index")) === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setTimeout(() => {
      setRandNums([
        Math.floor(Math.random() * flags.length),
        Math.floor(Math.random() * flags.length),
        Math.floor(Math.random() * flags.length),
        Math.floor(Math.random() * flags.length),
        Math.floor(Math.random() * flags.length),
      ]);

      setCorrectAnswer(Math.floor(Math.random() * randNums.length));
      setIsCorrect(null);
    }, 1000);
  };

  return (
    <div className={styles.flagsContainer}>
      {isCorrect === null && isGameStarted ? (
        <h1 className={styles.countryName}>
          {flags[randNums[correctAnswer]].name}
        </h1>
      ) : isCorrect ? (
        <h1 className={styles.countryName}>Yeik!</h1>
      ) : isCorrect !== null ? (
        <h1 className={styles.countryName}>Nope!</h1>
      ) : null}
      {isGameStarted ? (
        randNums.map((rand, idx) => {
          return (
            <img
            alt=''
              key={idx}
              onClick={handleAnswer}
              index={idx}
              className={styles.flag}
              src={flags[rand].image}
            />
          );
        })
      ) : (
        <button className={styles.startButton} onClick={handleStartGame}>
          START
        </button>
      )}
      {isGameStarted ? (
        <>
          <h1 className={styles.countdown}>{countdown}''</h1>
        </>
      ) : null}
      {score !== null ? <h1 className={styles.score}>Score: {score}</h1> : null}
    </div>
  );
};
