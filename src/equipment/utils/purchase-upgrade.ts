type purchaseUpgradeProps = {
  upgradeCost: number;
  upgradeEquipment: () => void;
  money: number;
  subtractMoney: (amount: number) => void;
};

export const purchaseUpgrade = ({
  upgradeCost,
  upgradeEquipment,
  money,
  subtractMoney,
}: purchaseUpgradeProps) => {
  if (money >= upgradeCost) {
    subtractMoney(upgradeCost);
    upgradeEquipment();
  }
};
