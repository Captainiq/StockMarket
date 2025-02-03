document.addEventListener("DOMContentLoaded", function() {
    // Load the Excel file
    fetch('stocks.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Get the stock names from the first column
            const stockNames = json.map(row => row[0]).filter(Boolean);

            // Display the stock names in the list
            const stockList = document.getElementById('stock-list');
            stockNames.forEach(stock => {
                const li = document.createElement('li');
                li.textContent = stock;
                stockList.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading the Excel file:', error));
});