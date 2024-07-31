export default async function decorate(block) {
  // Clear existing content
  block.innerHTML = '';

  // Fetch JSON data from the Google Drive URL
  const url = 'https://main--aem-eds-practice--gowrishangari.hlx.page/countries.jsonhttps://main--aem-eds-practice--gowrishangari.hlx.page/countries.json'; // Replace with your Google Drive file ID
  let jsonData;
  try {
    const response = await fetch(url);
    jsonData = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }

  // Create a table element
  const table = document.createElement('table');
  table.className = 'custom-table'; // Add a class for CSS styling

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // Assuming jsonData is an array of objects
  if (jsonData.length > 0) {
    const headers = Object.keys(jsonData[0]); // Use keys of the first object as headers
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    jsonData.forEach(item => {
      const row = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = item[header];
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
  } else {
    console.error('No data available');
  }

  // Append the table to the block
  block.appendChild(table);
}

// Add CSS for the table (add this to your CSS file or inside a <style> tag)
const style = document.createElement('style');
style.textContent = `
  .custom-table {
    width: 100%;
    border-collapse: collapse;
  }
  .custom-table th, .custom-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .custom-table th {
    background-color: #f2f2f2;
    text-align: left;
  }
  .custom-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .custom-table tr:hover {
    background-color: #ddd;
  }
`;
document.head.appendChild(style);
