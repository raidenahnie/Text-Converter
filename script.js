document.getElementById('inputType').addEventListener('change', function() {
    let inputType = document.getElementById('inputType').value;
    let outputTypeSelect = document.getElementById('outputType');
    let outputTypeOptions = outputTypeSelect.getElementsByTagName('option');

    // Reset the dropdown options
    for (let i = 0; i < outputTypeOptions.length; i++) {
        outputTypeOptions[i].style.display = '';
    }

    // Adjust the dropdown options based on the selected input type
    switch (inputType) {
        case 'text':
    document.getElementById('outputType').innerHTML = `
        <option value="hex">HEX</option>
        <option value="ascii">ASCII</option>
        <option value="binary">Binary</option>
    `;
    break;
case 'hex':
 document.getElementById('outputType').innerHTML = `
        <option value="text">Text</option>
        <option value="binary">Binary</option>
        <option value="decimal">Decimal</option>
    `;
    break;
        case 'binary':
    document.getElementById('outputType').innerHTML = `
        <option value="text">Text</option>
        <option value="hex">HEX</option>
        <option value="ascii">ASCII</option>
        <option value="decimal">Decimal</option>
    `;
    break;
        case 'ascii':
            document.getElementById('outputType').innerHTML = `
        <option value="text">Text</option>
        <option value="binary">Binary</option>
    `;
    break;
        case 'decimal': document.getElementById('outputType').innerHTML = `
        <option value="hex">HEX</option>
        <option value="ascii">ASCII</option>
        <option value="binary">Binary</option>
    `;
    break;
        default:
            break;
    }
});

document.getElementById('convertBtn').addEventListener('click', function() {
    let inputText = document.getElementById('inputText').value;
    let inputType = document.getElementById('inputType').value;
    let outputType = document.getElementById('outputType').value;
    
    // Show loading animation
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('resultText').value = 'Loading...';
    
    // Simulate delay for loading animation
    setTimeout(function() {
        let resultText;
        switch(inputType) {
            case 'hex':
                resultText = convertFromHex(inputText, outputType);
                break;
            case 'binary':
                resultText = convertFromBinary(inputText, outputType);
                break;
            case 'ascii':
                resultText = convertFromAscii(inputText, outputType);
                break;
            case 'text':
                resultText = convertFromText(inputText, outputType);
                break;
           case 'decimal':
                resultText = convertFromText(inputText, outputType);
                break;
            default:
                resultText = 'Invalid input type';
        }
        document.getElementById('resultText').value = resultText;
    }, 1500); // Simulated delay for loading animation
});


function convertFromHex(text, outputType) {
    // Remove any spaces from the input text
    text = text.replace(/\s/g, '');
    
    // Split the text into pairs of hexadecimal characters
    let hexArray = text.match(/.{1,2}/g);
    
    // Convert each pair of hexadecimal characters to its corresponding ASCII character
    let result = '';
    for (let i = 0; i < hexArray.length; i++) {
        result += String.fromCharCode(parseInt(hexArray[i], 16));
    }
    
    // Return the result based on the output type
    switch(outputType) {
        case 'hex':
            return text; // Return the original hex input
        case 'binary':
            return convertToBinary(result);
        case 'ascii':
            return result; // Return the converted ASCII text
        case 'text':
            return result; // Return the converted text
        case 'decimal':
            return convertToDecimal(result);
        default:
            return 'Invalid output type';
    }
}

function convertFromBinary(text, outputType) {
    // Remove any spaces from the input text
    text = text.replace(/\s/g, '');
    
    // Split the text into groups of 8 binary digits
    let binaryArray = text.match(/.{1,8}/g);
    
    // Convert each group of binary digits to its corresponding ASCII character
    let result = '';
    for (let i = 0; i < binaryArray.length; i++) {
        result += String.fromCharCode(parseInt(binaryArray[i], 2));
    }
    
    // Return the result based on the output type
    switch(outputType) {
        case 'hex':
            return convertToHex(result);
        case 'binary':
            return text; // Return the original binary input
        case 'ascii':
            return result; // Return the converted ASCII text
        case 'text':
            return result; // Return the converted text
        default:
            return 'Invalid output type';
    }
}

function convertFromAscii(text, outputType) {
    // Split the text into individual ASCII values
    let asciiArray = text.split(' ');
    
    // Convert each ASCII value to its corresponding character
    let result = '';
    for (let i = 0; i < asciiArray.length; i++) {
        let asciiValue = parseInt(asciiArray[i]);
        if (isNaN(asciiValue) || asciiValue < 0 || asciiValue > 255) {
            return 'Invalid ASCII value: ' + asciiArray[i];
        }
        result += String.fromCharCode(asciiValue);
    }
    
    // Return the result based on the output type
    switch(outputType) {
        case 'hex':
            return convertToHex(result);
        case 'binary':
            return convertToBinary(result);
        case 'ascii':
            return text; // Return the original ASCII input
        case 'text':
            return result; // Return the converted text
        default:
            return 'Invalid output type';
    }
}

function convertFromText(text, outputType) {
    // Return the result based on the output type
    switch(outputType) {
        case 'hex':
            return convertToHex(text);
        case 'binary':
            return convertToBinary(text);
        case 'ascii':
            return convertToAscii(text);
        case 'text':
            return text; // Return the original text input
        case 'decimal':
            return convertToDecimal(text); // Corrected line to convert text to decimal
        default:
            return 'Invalid output type';
    }
}
function convertToHex(text) {
    let hex = '';
    for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16).toUpperCase() + ' ';
    }
    return hex.trim();
}

function convertToHex(text) {
    let hex = '';
    for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16).toUpperCase() + ' ';
    }
    return hex.trim();
}

function convertToBinary(text) {
    let binary = '';
    for (let i = 0; i < text.length; i++) {
        binary += text.charCodeAt(i).toString(2).padStart(8, '0') + ' ';
    }
    return binary.trim();
}

function convertToAscii(text) {
    let ascii = '';
    let numbers = text.split(' ');
    for (let i = 0; i < numbers.length; i++) {
        ascii += String.fromCharCode(parseInt(numbers[i]));
    }
    return ascii;
}

function convertToDecimal(text) {
    let decimal = '';
    for (let i = 0; i < text.length; i++) {
        decimal += text.charCodeAt(i).toString(10) + ' ';
    }
    return decimal.trim();
         }
