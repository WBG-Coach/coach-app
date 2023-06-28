import React, {
  useRef,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {Dimensions} from 'react-native';

type ContextStateDispatches = {
  setBottomSheetContent: (content: React.ReactNode) => void;
};

type ContextState = ContextStateDispatches;

type ProviderProps = {
  children: ReactNode;
};

const BottomSheetContext = createContext<ContextState>({} as ContextState);

function BottomSheetProvider({children}: ProviderProps) {
  const {height} = Dimensions.get('window');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactNode>();

  useEffect(() => {
    if (bottomSheetContent) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [bottomSheetContent]);

  const {
    animatedSnapPoints,
    handleContentLayout,
    animatedHandleHeight,
    animatedContentHeight,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

  const renderBackdrop = useCallback(
    (props: any) =>
      bottomSheetContent ? (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ) : (
        <></>
      ),
    [bottomSheetContent],
  );

  return (
    <BottomSheetContext.Provider value={{setBottomSheetContent}}>
      {children}
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        snapPoints={animatedSnapPoints}
        backdropComponent={renderBackdrop}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backgroundStyle={{backgroundColor: '#F9FAFB'}}
        onClose={() => setBottomSheetContent(undefined)}>
        <BottomSheetScrollView
          onLayout={handleContentLayout}
          style={{maxHeight: height * 0.9}}>
          {bottomSheetContent}
        </BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
}

function useBottomSheetProvider(): ContextState {
  const context = useContext(BottomSheetContext);

  return context;
}

export {BottomSheetProvider, useBottomSheetProvider};
