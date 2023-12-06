import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';

type Props = ModalProps | Modal.ModalProduct;

const ModalGlobal: React.FC<Props> = props => {
  const scrollRef = React.useRef<any>({scrollTo: null});
  const [scrollOffset, setScrollOffset] = React.useState<number | null>(null);
  const devHeight = Dimensions.get('screen').height * 0.7;
  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p: any) => {
    scrollRef.current.scrollTo(p);
  };

  return (
    <Modal
      scrollOffset={scrollOffset || 0}
      scrollTo={handleScrollTo}
      style={styles.modal}
      {...props}>
      <View style={[styles.scrollableModal, {height: devHeight}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}>
          <View
            style={[
              styles.scrollableModalContent1,
              {minHeight: devHeight + 100},
            ]}>
            {props.children}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 500,
  },
  scrollableModalContent1: {
    backgroundColor: 'white',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
});

export default ModalGlobal;
