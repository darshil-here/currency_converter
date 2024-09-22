import { useState, useEffect } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState();

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };
  useEffect(() => {
    if (currencyInfo[to]) {
      // Check if the exchange rate exists before performing the calculation
      setConvertedAmount(amount * currencyInfo[to]);
    } else {
      setConvertedAmount(0); // Set to 0 or some other default value if not available
    }
  }, [amount, to, currencyInfo]);

  return (
    <div className="bg-gradient-to-r from-neutral-300 to-stone-400 w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-lg p-6 flex flex-col items-center">
        <h1 className="font-spaceGrotesk font-normal text-2xl sm:text-3xl md:text-3xl text-center mb-4">
          CURRENCY CONVERTER
        </h1>
        <div className="w-full max-w-md border border-gray-60 rounded-lg p-4 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                className="border border-gray-60"
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={setFrom}
                selectedCurrency={from}
                onAmountChange={setAmount}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1">
              <InputBox
                className="border border-gray-60"
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={setTo}
                selectedCurrency={to}
                amountDisabled={true}
              />
            </div>
          </form>
        </div>
      </div>

      <footer className="mx-6 absolute bottom-7 text-sm text-black font-light mb-4 text-center">
        made by{" "}
        <a
          className="underline underline-offset-4"
          href="https://github.com/darshil-here"
        >
          darshil
        </a>{" "}
        with two cups of coffees & ❤️
      </footer>
    </div>
  );
}

export default App;
