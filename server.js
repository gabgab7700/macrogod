const express = require('express');
const pdfMake = require('pdfmake');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-pdf', (req, res) => {
  const wishes = req.body.wishes;

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [20, 20, 20, 20],
    content: [],
    styles: {
      wish: {
        fontSize: 12,
        margin: [0, 0, 0, 10],
      },
    },
  };

  // Function to calculate the number of columns and rows
  const calculateLayout = (wishes) => {
    const wishWidthCm = 8.5;
    const wishHeightCm = 6;
    const pageWidthCm = 21;
    const pageHeightCm = 29.7;

    const columns = Math.floor(pageWidthCm / wishWidthCm);
    const rows = Math.floor(pageHeightCm / wishHeightCm);

    return { columns, rows };
  };

  const { columns, rows } = calculateLayout(wishes);
  let currentRow = 0;
  let currentCol = 0;

  // Organize wishes into a grid
  const grid = [];
  let rowIndex = 0;
  let colIndex = 0;

  wishes.forEach((wish, index) => {
    if (!grid[rowIndex]) {
      grid[rowIndex] = [];
    }

    grid[rowIndex][colIndex] = { text: wish, style: 'wish', width: 'auto' };
    colIndex++;

    if (colIndex >= columns) {
      colIndex = 0;
      rowIndex++;
    }
  });

  // Add the grid to the content
  grid.forEach(row => {
    docDefinition.content.push({
      columns: row,
      columnGap: 5
    });
  });

  const fonts = {
    Roboto: {
      normal: path.join(__dirname, 'fonts', 'Roboto-Regular.ttf'),
      bold: path.join(__dirname, 'fonts', 'Roboto-Medium.ttf'),
      italics: path.join(__dirname, 'fonts', 'Roboto-Italic.ttf'),
      bolditalics: path.join(__dirname, 'fonts', 'Roboto-MediumItalic.ttf')
    }
  };

  const pdfDoc = new pdfMake({ fonts: fonts }).createPdfKitDocument(docDefinition);
  const chunks = [];

  pdfDoc.on('data', (chunk) => {
    chunks.push(chunk);
  });

  pdfDoc.on('end', () => {
    const result = Buffer.concat(chunks);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="wish-card.pdf"');
    res.send(result);
  });

  pdfDoc.end();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
