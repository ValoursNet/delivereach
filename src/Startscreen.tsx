import { Button, VStack, Box } from "@chakra-ui/react";
import { useGameSettingsContext } from "./contexts/GameSettingsContext";
import { Theme } from "./theme";

export const Startscreen = () => {
  const { toggleGameStarted } = useGameSettingsContext();
  return (
    <VStack
      h={"100%"}
      justifyContent={"center"}
      spacing={10}
      backgroundColor={"#112633"}
      color={Theme.ButtonTextColor}
    >
      <VStack>
        <Box mb={0}>
          <img src={"./logo.png"} style={{height:"400px"}} />
        </Box>
      </VStack>
      <Button
        backgroundColor={Theme.ButtonBackgroundColor}
        color={Theme.ButtonTextColor}
        _hover={{
          backgroundColor: Theme.UIBorderColor,
        }}
        onClick={toggleGameStarted}
        size={"lg"}
      >
        START
      </Button>
    </VStack>
  );
};
