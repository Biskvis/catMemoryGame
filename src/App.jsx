import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import './App.css';

function App() {
  
  const [memList, setMemList] = useState([]);
  const [turn, setTurn] = useState(false);
  const [turnId, setTurnId] = useState('');
  const [prevImg, setPrevImg] = useState(0);
  const [won, setWon] = useState(false);
  const [reset, setReset] = useState(false)
  const [count, setCount] = useState(0)


  useEffect(() => {
    const blank = [];
    for (let i = 1; i <= 6; i++) {
      blank.push({ isVisible: false, imgId: i.toString() });
      blank.push({ isVisible: false, imgId: i.toString() });
    }
    blank.sort(() => Math.random() - 0.5)
    setMemList(blank);
  }, [reset]);

  useEffect(() => {
    if(memList.length > 0 && memList.every(v => v.isVisible === true)) {
      console.log('You won!');
      setWon(true)
    }
  }, [memList]);
  

  function handleClick(index) {
  
    if (won) return;
    if (memList[index].isVisible) return; 
    setCount(prevCount => prevCount +1)

    if (turn) {
      if (memList[index].imgId === turnId) {
        
        visible(index);
        setTurn(false);
        setTurnId('');
      } else {
        
          visible(index);
          setTurn(false);
          setTurnId('');
              
          setTimeout(() => {
            visible(prevImg);
            visible(index)
        }, 1000) 
      }
    } else {
     
      visible(index);
      setPrevImg(index);
      setTurnId(memList[index].imgId);
      setTurn(true);
    }
  }
  
  function visible(index) {
    setMemList(prevState => prevState.map((v, i) => {
      return i === index ? { ...v, isVisible: !v.isVisible } : v;
    }));
  }

  function resetGame() {
    setWon(false);
    setPrevImg('');
    setTurn(false);
    setTurnId('');
    setReset(prevState => !prevState);
    setCount(0)
  }

  const gen = memList.map((v, index) =>
    <div
      key={index}
      className='md:m-4 m-1  bg-yellow-200 rounded-full w-20 h-20 md:w-40  md:h-40 hover:bg-yellow-500'
      onClick={() => handleClick(index)}
    >
      {v.isVisible && <span className='text-center'>
        <img
          className='w-max p-2 animate-bounce'
          src={`./cat${v.imgId}.png`}
          alt={`cat${v.imgId}`}
        />
      </span>}
    </div>
  );
    
  return (
    <>{ !won ? <h1 className='p-4 text-center font-bold text-4xl'> Cat Memory game</h1> :
      <h1 className='p-4 text-center font-bold text-4xl text-red-600'>YOU WON</h1> }
      <div className='grid place-content-center'>
        <div className='grid grid-rows-3 grid-cols-4'>
          {gen}
          {won && <Confetti
              width={1500}
              height={1000}
          />
          }
        </div>
        {count > 0 && <div className='p-4 text-2xl'> {!won ? `Moves: ${count}` : `You won in ${count} moves`}</div> 
          }
        <button
          className='p-2 mt-4 bg-red-500 rounded-lg text-center font-bold text-white hover:text-black hover:'
          onClick={resetGame} 
         >New game</button>
      </div>
    </>
  );
}

export default App;
