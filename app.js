const fs = require('fs');

const uniqueIntegers = (inputFile, outputFile) => {
  const integers = new Array(2048);
  for (let i = 0; i < 2048; i++) integers[i] = false;

  const isWhiteSpace = (char) => /\s/.test(char);

  const trimLine = (str) => {
    let firstInteger = 0;
    let lastInteger = str.length - 1;
    while (firstInteger <= lastInteger && isWhiteSpace(str[firstInteger])) firstInteger++;
    while (lastInteger >= firstInteger && isWhiteSpace(str[lastInteger])) lastInteger--;
    return str.substring(firstInteger, lastInteger + 1);
  };

  const isValidInteger = (str) => /^-?\d+$/.test(str);

  const parseIntenger = (str) => {
    let result = 0;
    let isNegative = str[0] === '-';
    for (let i = isNegative ? 1 : 0; i < str.length; i++) {
      result = result * 10 + (str[i].charCodeAt(0) - 48);
    }
    return isNegative ? -result : result;
  };

  const handleLine = (line) => {
    const trimmedSpace = trimLine(line);
    if (isValidInteger(trimmedSpace)) {
      const num = parseIntenger(trimmedSpace);
      if (num >= -1023 && num <= 1023) {
        integers[num + 1023] = true;
      }
    }
  };

  const writeToFile = () => {
    let result = '';
    for (let i = 0; i < 2048; i++) {
      if (integers[i]) {
        const num = i - 1023;
        result += (num < 0 ? '-' : '') + (num < 0 ? -num : num) + '\n';
      }
    }
    fs.writeFileSync(outputFile, result);
  };

  const handleFile = () => {
    const data = fs.readFileSync(inputFile, 'utf8');
    let line = '';
    for (const element of data) {
      if (element === '\n') {
        handleLine(line);
        line = '';
      } else {
        line += element;
      }
    }
    if (line.length > 0) {
      handleLine(line);
    }
    writeToFile();
    console.log('Sorting file complete.');
  };

  handleFile();
};

uniqueIntegers("./sample_input/sample_input_for_students/sample_04.txt", "./sample_input/sample_input_for_students/outputFile.txt");