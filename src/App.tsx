import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { GameScreen } from "./Gamescreen";
import { TickProvider } from "./contexts/TickContext";
import { JourneyProvider } from "./contexts/JourneyContext";
import { Startscreen } from "./Startscreen";
import { useGameSettingsContext } from "./contexts/GameSettingsContext";
import EquipmentProvider from "./contexts/EquipmentContext";

function App() {
  const { gameStarted } = useGameSettingsContext();

  return (
    <ChakraProvider>
      <div style={{
        // This is the size limit on embeded games (LD, itch.io, etc.)
        // Comment out to test full screen
        width: 948,
        height: 533
      }}>
      {/* TODO: Unflip this for release */}
      {gameStarted ? (
        <TickProvider>
          <JourneyProvider>
            <EquipmentProvider>
              <GameScreen />
            </EquipmentProvider>
          </JourneyProvider>
        </TickProvider>
      ) : (
        <Startscreen />
      )}
      </div>
    </ChakraProvider>
  );
}

export default App;
