import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {Dimensions} from 'react-native';

type ContextStateValues = {};

type ContextStateDispatchs = {
  setBottomSheetContent: (content: React.ReactNode) => void;
};

type ContextState = [ContextStateValues, ContextStateDispatchs];

type ProviderProps = {
  children: ReactNode;
};

const BottomSheetContext = createContext<ContextState>({} as ContextState);

function BottomSheetProvider({children}: ProviderProps) {
  const {height} = Dimensions.get('window');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [BottomSheetContent, setBottomSheetContent] =
    useState<React.ReactNode>();

  useEffect(() => {
    if (BottomSheetContent) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [BottomSheetContent]);

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const handleSheetChanges = useCallback(() => {}, []);

  const providerValues = {} as ContextStateValues;
  const providerDispatchs = {
    setBottomSheetContent,
  } as ContextStateDispatchs;

  const renderBackdrop = useCallback(
    (props: any) =>
      BottomSheetContent ? (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ) : (
        <></>
      ),
    [BottomSheetContent],
  );

  return (
    <BottomSheetContext.Provider value={[providerValues, providerDispatchs]}>
      {children}
      <BottomSheet
        backgroundStyle={{backgroundColor: '#F9FAFB'}}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        onClose={() => setBottomSheetContent(undefined)}
        backdropComponent={renderBackdrop}>
        <BottomSheetScrollView
          onLayout={handleContentLayout}
          style={{maxHeight: height * 0.9}}>
          {BottomSheetContent}
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
