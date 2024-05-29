import React, { useState, useRef, useEffect } from 'react';
import { data } from '../assets/data';
import quizLogo from '../assets/quizLogo.png'

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [congrats, setCongrats] = useState(false);
  

  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (score === data.length) {
      setCongrats(true);
    } else {
      setCongrats(false);
    }
  }, [score]);

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

  const handleReset = () =>{
    window.location.reload();
  }

  return (
    <>
      <div style={{ height: '100vh' }} className="container d-flex justify-content-center align-items-center flex-column">
        <div className='border ps-5 pe-5 pt-2 pb-4 pt-4 bg-light w-50 border rounded-4'>
          <h1 className='text-center space-mono-bold-italic pt-3 ps-3 pe-3 pb-2  bg-light'><img height={'60px'} width={'60px'} src={quizLogo} alt="" />uiz App</h1>
          <hr />

          {!result && (
            <>
              <h5 className='pt-3'>{index + 1}. {question.question}</h5>
              <div style={{cursor:'pointer'}} className='d-flex justify-content-center flex-column mt-4 pt-3'>
                <h6 onClick={() => checkAns(1)} ref={optionRefs[0]} className={`border rounded-4 p-3`}>A. {question.option1}</h6>
                <h6 onClick={() => checkAns(2)} ref={optionRefs[1]} className={`border rounded-4 p-3`}>B. {question.option2}</h6>
                <h6 onClick={() => checkAns(3)} ref={optionRefs[2]} className={`border rounded-4 p-3`}>C. {question.option3}</h6>
                <h6 onClick={() => checkAns(4)} ref={optionRefs[3]} className={`border rounded-4 p-3`}>D. {question.option4}</h6>
              </div>

              <div  className='text-center mt-3'><button style={{cursor:'default'}} onClick={handleNext} className="btn btn-primary ps-4 pe-4"><i className="fa-solid fa-forward"></i></button></div>
              <div style={{fontSize:'14px'}} className='text-center mt-4'>{index + 1} of {data.length} questions</div>
            </>
          )}

          {result &&
            <div className='text-center'>
              <p className=' fs-5 pt-3'>Quiz completed!!!</p>
              <p>Total Number of questions : {data.length}</p>
              <p className='fs-4 fw-bolder text-success'>Your Score : {score}/{data.length}</p>

              {congrats &&
                <div style={{fontSize:'60px'}} className="text-warning p-4 fw-bolder satisfy-regular">Congratulations!</div>
              }

<div  className='text-center mt-4'><button style={{cursor:'default'}} onClick={handleReset} className="btn btn-primary  ps-4 pe-4"><i className="fa-solid fa-rotate-right "></i></button></div>

            </div>
          }
        </div>
      </div>
    </>
  );
}

export default Quiz;
