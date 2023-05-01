import { createContext, useEffect, useState } from "react";

type TickContextType = {
  tick: number;
  money: number;
  addMoney: (amount: number) => void;
  subtractMoney: (amount: number) => void;
};

export const TickContext = createContext<TickContextType>(
  {} as TickContextType
);

// Only change this value if you want to change the speed of the game
export const TICKS_PER_SECOND = 1;

const getInterval = (ticksPerSecond: number) => {
  return 1000 / ticksPerSecond;
};

const INTERVAL = getInterval(TICKS_PER_SECOND);

export const TickProvider = ({ children }: { children: React.ReactNode }) => {
  const [tick, setTick] = useState(0);
  const [money, setMoney] = useState(10);

  useEffect(() => {
    setInterval(() => {
      setTick((tick) => tick + 1);
    }, INTERVAL);
  }, []);

  const addMoney = (amount: number) => {
    setMoney((prevMoney) => prevMoney + amount);
  };

  const subtractMoney = (amount: number) => {
    setMoney((prevMoney) => prevMoney - amount);
  };

  const value = {
    tick,
    money,
    addMoney,
    subtractMoney,
  };

  return <TickContext.Provider value={value}>{children}</TickContext.Provider>;
};
