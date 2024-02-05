import { useState, useEffect } from "react";

function DropdownYears() {
  const [yearOption, setYearOption] = useState([]);
  var currentYear = new Date().getFullYear();

  useEffect(() => {
    var options = [];
    for (var i = currentYear; i >= 1950; i--) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    setYearOption(options);
  }, []); // Empty array ensures that effect is only run on mount
  //   console.log(yearOption);
  //   console.log(yearOption);
  return (
    <select name="Godina rodjenja" required>
      <option>Godina rođenja</option>
      {yearOption}
    </select>
  );
}
export default DropdownYears;
