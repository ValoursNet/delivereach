type purchaseEquipmentProps = {
  buyPrice: number;
  increaseEquipment: () => void;
  money: number;
  subtractMoney: (amount: number) => void;
};

export const purchaseEquipment = ({
  buyPrice,
  increaseEquipment,
  money,
  subtractMoney,
}: purchaseEquipmentProps) => {
  if (money >= buyPrice) {
    subtractMoney(buyPrice);
    increaseEquipment();
  }
};
