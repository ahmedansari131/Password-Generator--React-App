import React, { useCallback, useEffect, useRef, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MessageLabel from "./MessageLabel";

export default function PassContainer() {
  const [numeric, setNumeric] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [upperChar, setUpperChar] = useState(false);
  const [lowerChar, setLowerCase] = useState(false);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [messageVisible, setMessageVisible] = useState(0);
  const passRef = useRef(null);

  const generatePassword = useCallback(() => {
    let upperCharStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerCharStr = "abcdefghijklmnopqrstuvwxyz";
    let specialCharStr = "!@#$%&*";
    let numericCharStr = "1234567890";
    let passStr = "";
    let pass = "";

    if (numeric) passStr += numericCharStr;
    if (specialChar) passStr += specialCharStr;
    if (upperChar) passStr += upperCharStr;
    if (lowerChar) passStr += lowerCharStr;

    for (let i = 1; i <= length; i++) {
      let indexOfStr = Math.floor(Math.random() * passStr.length + 1);
      pass += passStr.charAt(indexOfStr);
    }
    setPassword(pass);
  }, [numeric, specialChar, upperChar, lowerChar, length]);

  const copyPass = () => {
    if (password) {
      passRef.current.select();
      window.navigator.clipboard.writeText(password);
      setMessageVisible(2);
    }
  };

  const handleBtnClicked = () => {
    if (numeric || upperChar || lowerChar || specialChar) {
      generatePassword();
    } else {
      setMessageVisible(1);
    }
  };

  useEffect(() => {
    if (messageVisible) {
      setTimeout(() => {
        setMessageVisible(false);
      }, 2000);
    }
  }, [messageVisible]);

  useEffect(() => {
    if (password) generatePassword();
  }, [numeric, upperChar, lowerChar, length, specialChar, generatePassword]);

  return (
    <div className="bg-gray-900 h-max p-10 w-2/4 m-auto border-gray-700 border rounded-xl">
      {messageVisible == 1 && <MessageLabel text="Select the options" bg="red"/>}
      {messageVisible == 2 && <MessageLabel text="Copied" bg="green"/>}
      <h1 className="text-center text-white text-3xl uppercase mb-10 font-medium">
        Password Generator
      </h1>
      <h3 className="text-left text-white text-lg mb-2">
        Generate a secure password
      </h3>
      <div className="ps-input bg-transparent border border-gray-700 mb-6 rounded-md relative">
        <ContentCopyIcon
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 cursor-pointer hover:text-gray-400 transition-colors duration-500"
          onClick={copyPass}
        />
        <input
          type="text"
          readOnly
          value={password}
          className="outline-none border-none w-full py-2 px-4 rounded-md bg-transparent text-white selection:bg-gray-700 selection:text-white"
          placeholder="Password"
          ref={passRef}
        />
      </div>
      <div className="ps-filter-container w-full bg-gray-800 h-full text-white p-4 rounded-md border border-gray-700">
        <div className="flex items-start gap-x-40">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-3 uppercase">
              <input
                defaultChecked={upperChar}
                onChange={() => {
                  setUpperChar((prev) => !prev);
                }}
                type="checkbox"
                name=""
                id="uppercase"
                className="outline-none border-none w-4 h-4"
              />
              <label htmlFor="uppercase">Uppercase</label>
            </div>

            <div className="flex items-center gap-3 lowercase">
              <input
                defaultChecked={lowerChar}
                onChange={() => {
                  setLowerCase((prev) => !prev);
                }}
                type="checkbox"
                name=""
                id="lowercase"
                className="outline-none border-none w-4 h-4"
              />
              <label htmlFor="lowercase">Lowercase</label>
            </div>

            <div className="flex items-center gap-3 capitalize">
              <input
                defaultChecked={numeric}
                onChange={() => {
                  setNumeric((prev) => !prev);
                }}
                type="checkbox"
                name=""
                id="numeric"
                className="outline-none border-none w-4 h-4"
              />
              <label htmlFor="numeric">Numbers</label>
            </div>

            <div className="flex items-center gap-3">
              <input
                defaultChecked={specialChar}
                onChange={() => {
                  setSpecialChar((prev) => !prev);
                }}
                type="checkbox"
                name=""
                id="sp-char"
                className="outline-none border-none w-4 h-4"
              />
              <label htmlFor="sp-char">Special Characters</label>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="pass-label flex gap-x-4 justify-between">
              <label htmlFor="p-range">Password Length</label>
              <input
                type="number"
                id="range-number"
                min={8}
                max={20}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value > 20 ? 20 : e.target.value);
                }}
                className="remove-arr-btns text-white px-2 text-sm bg-transparent w-10 outline-none border border-gray-700 rounded-sm"
              />
            </div>
            <input
              type="range"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              id="p-range"
              min={8}
              max={20}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleBtnClicked}
        className="generate-btn bg-gray-800 px-5 py-2 rounded-md mt-6 font-medium text-white border border-gray-700 hover:bg-gray-700 transition-colors duration-400"
      >
        Generate
      </button>
    </div>
  );
}
