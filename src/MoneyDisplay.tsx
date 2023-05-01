import { HStack, Text } from "@chakra-ui/react";
import { displayNumber } from "./utils";

export const MoneyDisplay: React.FC<{ money: number; color?: string }> = ({
  money,
  color,
}) => {
  //if it is a negative, we want to display it as a positive
  const isNegative = money < 0;
  money = Math.abs(money);
  const { amount, suffix } = displayNumber(money);
  return (
    <HStack
      sx={{
        "> *": {
          marginInlineStart: "0 !important",
        },
      }}
      justifyContent={"center"}
      w={"100%"}
      color={color}
    >
      {isNegative && <Text>-</Text>}
      <Text>$</Text>
      <Text>{amount}</Text>
      {suffix !== "" && <Text fontWeight={"bold"}>&nbsp;{suffix}</Text>}
    </HStack>
  );
};
