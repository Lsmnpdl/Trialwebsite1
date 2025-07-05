document.addEventListener('DOMContentLoaded', function() {
    const conversionSelect = document.getElementById('conversion-select');
    const inputSections = document.querySelectorAll('.input-section');
    const convertBtn = document.getElementById('convert-btn');
    const resultDiv = document.getElementById('result');
    
    // Show/hide input sections based on conversion type
    conversionSelect.addEventListener('change', function() {
        inputSections.forEach(section => section.style.display = 'none');
        
        if (this.value === 'temp') {
            document.getElementById('temp-input').style.display = 'block';
        } else if (this.value === 'feet-to-meter') {
            document.getElementById('feet-input').style.display = 'block';
        } else if (this.value === 'meter-to-feet') {
            document.getElementById('meter-input').style.display = 'block';
        }
    });
    
    // Initial setup
    document.getElementById('temp-input').style.display = 'block';
    
    // Conversion logic
    convertBtn.addEventListener('click', function() {
        const conversionType = conversionSelect.value;
        let result = '';
        
        if (conversionType === 'temp') {
            const celsius = parseFloat(document.getElementById('celsius').value);
            if (isNaN(celsius)) {
                alert('Please enter a valid number for Celsius');
                return;
            }
            const fahrenheit = (celsius * (180/100)) + 32;
            result = `${celsius}°C = ${fahrenheit.toFixed(2)}°F`;
        } 
        else if (conversionType === 'feet-to-meter') {
            const feet = parseFloat(document.getElementById('feet').value) || 0;
            const inches = parseFloat(document.getElementById('inches').value) || 0;
            
            if (feet === 0 && inches === 0) {
                alert('Please enter at least one value (feet or inches)');
                return;
            }
            
            const meter = (feet + (inches / 12)) * 0.3048;
            result = `Distance = ${meter.toFixed(2)} meters`;
        } 
        else if (conversionType === 'meter-to-feet') {
            const meter = parseFloat(document.getElementById('meter').value);
            if (isNaN(meter)) {
                alert('Please enter a valid number for meters');
                return;
            }
            
            const feet = meter * (1/0.3048);
            const integerPart = Math.floor(feet);
            const fractionalPart = feet - integerPart;
            const inches = fractionalPart * 12;
            
            result = `
                <p>Distance: ${integerPart} feet + ${inches.toFixed(2)} inches</p>
                <p>Decimal feet: ${feet.toFixed(4)} feet</p>
                <p>Integer part: ${integerPart}</p>
                <p>Inches part: ${inches.toFixed(2)}</p>
            `;
        }
        
        resultDiv.innerHTML = result;
        resultDiv.style.display = 'block';
    });
});
