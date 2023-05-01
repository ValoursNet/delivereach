import { HStack, Box, Text } from "@chakra-ui/react";
import { Theme } from "./theme";
import { useContext } from "react";
import { useGameSettingsContext } from "./contexts/GameSettingsContext";
import { JourneyContext } from "./contexts/JourneyContext";
import { displayNumber } from "./utils";
import { SpeakerIcon, SpeakerOffIcon } from "./icons/Icons";

export const TopBar = () => {
  const { muted, toggleMute, companyName } = useGameSettingsContext();
  const { journeysDone } = useContext(JourneyContext);
  const { amount, suffix } = displayNumber(journeysDone);
  const DeliveriesMade = () => {
    return (
      <Text>
        {amount}
        {suffix} Deliveries Made
      </Text>
    );
  };
  return (
    <HStack
      w={"100%"}
      justifyContent={"space-between"}
      p={Theme.BorderAndPaddingWidth}
    >
      <HStack gap={Theme.BorderAndPaddingWidth}>
        <Box
          backgroundColor={Theme.ButtonBackgroundColor}
          p={Theme.BorderAndPaddingWidth}
          border={`${Theme.BorderAndPaddingWidth} solid`}
          borderColor={Theme.UIBorderColor}
          cursor={"pointer"}
          onClick={toggleMute}
        >
          {muted ? <SpeakerOffIcon /> : <SpeakerIcon />}
        </Box>
        <Box
          backgroundColor={Theme.ButtonBackgroundColor}
          p={Theme.BorderAndPaddingWidth}
          border={`${Theme.BorderAndPaddingWidth} solid`}
          borderColor={Theme.UIBorderColor}
        >
          <Text color={Theme.ButtonTextColor}>{companyName.toUpperCase()}</Text>
        </Box>
      </HStack>

      <HStack
        backgroundColor={Theme.ButtonBackgroundColor}
        color={Theme.ButtonTextColor}
        p={Theme.BorderAndPaddingWidth}
        border={`${Theme.BorderAndPaddingWidth} solid`}
        borderColor={Theme.UIBorderColor}
      >
        <DeliveriesMade />
      </HStack>
    </HStack>
  );
};
