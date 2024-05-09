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
        case 'hex':
            for (let i = 0; i < outputTypeOptions.length; i++) {
                let value = outputTypeOptions[i].value;
                if (value !== 'text' && value !== 'decimal' && value !== 'binary') {
                    outputTypeOptions[i].style.display = 'none';
                }
            }
            break;
        case 'binary':
            for (let i = 0; i < outputTypeOptions.length; i++) {
                let value = outputTypeOptions[i].value;
                if (value !== 'text' && value !== 'hex' && value !== 'decimal' && value !== 'ascii') {
                    outputTypeOptions[i].style.display = 'none';
                }
            }
            break;
        case 'text':
            for (let i = 0; i < outputTypeOptions.length; i++) {
                let value = outputTypeOptions[i].value;
                if (value !== 'hex' && value !== 'ascii' && value !== 'binary') {
                    outputTypeOptions[i].style.display = 'none';
                }
            }
            break;
        case 'ascii':
            for (let i = 0; i < outputTypeOptions.length; i++) {
                let value = outputTypeOptions[i].value;
                if (value !== 'text' && value !== 'binary') {
                    outputTypeOptions[i].style.display = 'none';
                }
            }
            break;
        case 'decimal':
            for (let i = 0; i < outputTypeOptions.length; i++) {
                let value = outputTypeOptions[i].value;
                if (value !== 'hex' && value !== 'binary') {
                    outputTypeOptions[i].style.display = 'none';
                }
            }
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
    // Split the text into individual ASCII characters
    let asciiArray = text.split('');
    
    // Convert each ASCII character to its hexadecimal representation
    let result = '';
    for (let i = 0; i < asciiArray.length; i++) {
        let decimal = asciiArray[i].charCodeAt(0);
        switch(outputType) {
            case 'hex':
                result += decimal.toString(16).toUpperCase() + ' ';
                break;
            case 'binary':
                result += decimal.toString(2) + ' ';
                break;
            case 'ascii':
                result += asciiArray[i];
                break;
            case 'text':
                result += asciiArray[i];
                break;
            default:
                return 'Invalid output type';
        }
    }
    return result.trim();
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
            return convertToDecimal(text);
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
    for (let i = 0; i < text.length; i++) {
        ascii += text.charCodeAt(i) + ' ';
    }
    return ascii.trim();
}

function convertToDecimal(text) {
    let decimal = '';
    for (let i = 0; i < text.length; i++) {
        decimal += text.charCodeAt(i) + ' ';
    }
    return decimal.trim();
}