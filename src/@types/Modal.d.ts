declare namespace Modal {
  interface ModalProduct {
    isBottomModal?: boolean;
    heightPercentage?: boolean;
    children?: React.ReactNode;
    selectProduct?: Home.ResponseSubMenu | null;
    onSaveFavoriteHandle?: (item: Home.ResponseSubMenu) => void;
    onBackButtonPress?: () => void;
    onBackdropPress?: () => void;
    isVisible: boolean;
    useNativeDriver?: boolean;
    hideFavoriteBtn?: boolean;
    onRemoveFavorite?: (item: Home.ResponseSubMenu) => void;
  }
}
