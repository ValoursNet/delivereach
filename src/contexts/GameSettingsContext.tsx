import { createContext, useContext, useState } from "react";

export type Tier = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type GameSettingsContextType = {
  gameStarted: boolean;
  toggleGameStarted: () => void;
  muted: boolean;
  toggleMute: () => void;
  showTutorial: boolean;
  setShowTutorial: (show: boolean) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  currentTier: Tier;
  increaseTier: () => void;
  unlockedSea: boolean;
  unlockSea: () => void;
  unlockedAir: boolean;
  unlockAir: () => void;
};

const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
  undefined
);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [companyName, setCompanyName] = useState("Delivereach");
  const [currentTier, setCurrentTier] = useState<Tier>(0);
  const [unlockedSea, setUnlockedSea] = useState(false);
  const [unlockedAir, setUnlockedAir] = useState(false);

  const toggleMute = () => {
    setMuted((muted) => !muted);
  };

  const toggleGameStarted = () => {
    setGameStarted((started) => !started);
  };

  const increaseTier = () => {
    if (currentTier < 9) {
      setCurrentTier((tier) => (tier + 1) as Tier);
    }
  };

  const unlockSea = () => {
    setUnlockedSea(true);
  };

  const unlockAir = () => {
    setUnlockedAir(true);
  };

  const value = {
    gameStarted,
    toggleGameStarted,
    muted,
    toggleMute,
    showTutorial,
    setShowTutorial,
    companyName,
    setCompanyName,
    currentTier,
    increaseTier,
    unlockedSea,
    unlockSea,
    unlockedAir,
    unlockAir,
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};

const useGameSettingsContext = () => {
  const context = useContext(GameSettingsContext);
  if (!context) {
    throw new Error(
      "useGameSettingsContext must be used within a GameSettingsContextProvider"
    );
  }
  return context;
};

export { GameProvider as default, useGameSettingsContext };
