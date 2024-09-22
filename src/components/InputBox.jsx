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
  const isCurrencyOptionsAvailable = currencyOptions.length > 0; // Check if options are available

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label htmlFor="" className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          type="number"
          className="outline-none w-full bg-transparent py-1.5"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount}
          onChange={(e) => {
            const value = Math.max(1, Number(e.target.value)); // Ensure the value is at least 1
            onAmountChange(value); // Update the state with the validated value
          }}
          min={1}
          style={{ appearance: "textfield" }}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        {isCurrencyOptionsAvailable ? (
          <select
            className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
            value={selectedCurrency} // Use controlled value
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
          <p>Loading currencies...</p> // You can display a loading state or fallback text
        )}
      </div>
    </div>
  );
};

export default InputBox;
