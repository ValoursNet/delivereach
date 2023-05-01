type sellEquipmentProps = {
  sellPrice: number;
  decreaseEquipment: () => void;
  addMoney: (amount: number) => void;
};

export const sellEquipment = ({
  sellPrice,
  decreaseEquipment,
  addMoney,
}: sellEquipmentProps) => {
  addMoney(sellPrice);
  decreaseEquipment();
};
