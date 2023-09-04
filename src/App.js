import React, { useState, useRef } from "react";
import { View, TextInput, Text } from "react-native";

const CreditCardInput = () => {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const inputRef = useRef(null);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [keyPressed, setKeyPressed] = useState("");
  const [currentCursorPosition, setCurrentCursorPosition] = useState(1);

  const formatCreditCardNumber = (input) => {
    const formattedInput = input.replace(/[^0-9A-Za-z]/g, "").slice(0, 16);

    let formattedNumber = "";
    for (let i = 0; i < formattedInput.length; i++) {
      if (i > 0 && i % 5 === 0) {
        formattedNumber += "-";
      }
      formattedNumber += formattedInput[i];
    }

    return formattedNumber;
  };

  const handleCreditCardNumberChange = (input) => {
    const formattedNumber = formatCreditCardNumber(input);
    setCreditCardNumber(formattedNumber);
  };

  // 2. Handle Text Change
  const handleTextChange = (text) => {
    const previousCursorPosition = inputRef.current.selectionStart;
    setCurrentCursorPosition();

    handleCreditCardNumberChange(text);

    const inputDifferenceDirection =
      text.length > creditCardNumber.length ? 1 : 0;

    let newCursorPosition;
    if (inputDifferenceDirection === 1) {
      console.log("INSIDE IF", previousCursorPosition);
      console.log(text.length, creditCardNumber.length, previousCursorPosition);
      if (text.length > previousCursorPosition) {
        newCursorPosition =
          previousCursorPosition + (text.length - creditCardNumber.length) - 1;
      } else {
        newCursorPosition =
          previousCursorPosition + (text.length - creditCardNumber.length);
      }
      let hyphenVal = [...text][newCursorPosition]?.toString();
      if (hyphenVal === "-") {
        newCursorPosition += 1;
      }
    } else {
      newCursorPosition = previousCursorPosition;
      console.log("INSIDE ELSE", previousCursorPosition);
    }

    setSelection({ start: newCursorPosition, end: newCursorPosition });
  };

  // 1. Keypress
  // const handleKeyPress = ({ nativeEvent }) => {
  //   const { key } = nativeEvent; //, eventCount
  //   setKeyPressed(key);
  // };

  return (
    <View>
      <Text>Credit Card Number:</Text>
      <TextInput
        ref={inputRef}
        style={{ borderWidth: 1, padding: 10 }}
        placeholder="Enter your credit card number"
        value={creditCardNumber}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        selection={selection}
        // onKeyPress={handleKeyPress}
      />
    </View>
  );
};

export default CreditCardInput;
