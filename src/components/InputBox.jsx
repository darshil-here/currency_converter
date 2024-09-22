import React from "react";

const InputBox = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency,
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) => {
  const isCurrencyOptionsAvailable = currencyOptions.length > 0;

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    // Allow empty string or valid numbers
    if (inputValue === "" || !isNaN(Number(inputValue))) {
      onAmountChange(inputValue);
    }
  };

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label
          htmlFor="amount-input"
          className="text-black/40 mb-2 inline-block"
        >
          {label}
        </label>
        <input
          id="amount-input"
          type="number" // Changed from "number" to "text"
          className="no-spinner outline-none w-full bg-transparent py-1.5"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount}
          onChange={handleAmountChange}
          style={{ appearance: "textfield" }}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        {isCurrencyOptionsAvailable ? (
          <select
            className="no-spinner rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
            value={selectedCurrency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            disabled={currencyDisabled}
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        ) : (
          <p>Loading currencies...</p>
        )}
      </div>
    </div>
  );
};

export default InputBox;
