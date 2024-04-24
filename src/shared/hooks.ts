import React from "react";
import { Keyboard } from "react-native";

export function useKeyboardVisible(): boolean {
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    // Function to handle keyboard did show
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => {
        setKeyboardVisible(true); // Set state to true when keyboard is shown
      }
    );

    // Function to handle keyboard did hide
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        setKeyboardVisible(false); // Set state to false when keyboard is hidden
      }
    );

    // Cleanup function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return keyboardVisible;
}
