import React, { useState, useRef, useEffect } from 'react';
import { data } from '../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [congrats, setCongrats] = useState(false);

  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const checkAns = (ans) => {
    if (!lock) {
      setLock(true);
      if (question.ans === ans) {
        optionRefs[ans - 1].current.classList.add('correct');
        setScore(score + 1);
      } else {
        optionRefs[ans - 1].current.classList.add('wrong');
        optionRefs[question.ans - 1].current.classList.add('correct');
      }
    }
  };

  const handleNext = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      optionRefs.forEach(ref => {
        ref.current.classList.remove('correct', 'wrong');
      });
    }
  };

  useEffect(() => {
    if (score === data.length) {
      setCongrats(true);
    } else {
      setCongrats(false);
    }
  }, [score]);

  return (
    <>
      <div style={{ height: '100vh' }} className="container d-flex justify-content-center align-items-center flex-column">
        <div className='border ps-5 pe-5 pt-2 pb-4 pt-4 bg-light w-50'>
          <h1 className='text-center'>Quiz App</h1>
          <hr className='pb-2' />

          {!result && (
            <>
              <div>{index + 1}/ {data.length}</div>
              <h5>{index + 1}. {question.question}</h5>
              <div className='d-flex justify-content-center flex-column mt-4 pt-3'>
                <h6 onClick={() => checkAns(1)} ref={optionRefs[0]} className={`border rounded-4 p-3`}>{question.option1}</h6>
                <h6 onClick={() => checkAns(2)} ref={optionRefs[1]} className={`border rounded-4 p-3`}>{question.option2}</h6>
                <h6 onClick={() => checkAns(3)} ref={optionRefs[2]} className={`border rounded-4 p-3`}>{question.option3}</h6>
                <h6 onClick={() => checkAns(4)} ref={optionRefs[3]} className={`border rounded-4 p-3`}>{question.option4}</h6>
              </div>

              <div className='text-center mt-3'><button onClick={handleNext} className="btn btn-primary">Next</button></div>
            </>
          )}

          {result &&
            <div className='text-center'>
              <p>Quiz completed.</p>
              <p>Total Number of questions : {data.length}</p>
              <p>Your Score : {score}/{data.length}</p>
              {congrats &&
                <div className="text-success fs-3 fw-bolder">Congratulations!</div>
              }
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default Quiz;
