'use strict';
class TableTemplate {
    static fillIn(tID, dict, colName = null) {
        const MainTable = document.getElementById(tID);

        let tbody = MainTable.querySelector('tbody');
        if (!tbody) {
            tbody = document.createElement('tbody');
            MainTable.appendChild(tbody);
        }

        // Find all header cells and replace template strings with dictionary values
        const headerRow = MainTable.rows[0];
        Array.from(headerRow.cells).forEach(cell => {
            cell.textContent = this.replaceTemplates(cell.textContent, dict);
        });

        // If columnName is specified, find the index of the column
        let columnIndex = -1;

        if (colName) {
            const cellsArray = Array.from(headerRow.cells);

            for (const [index, cell] of cellsArray.entries()) {
                if (cell.textContent == colName) {
                    columnIndex = index;
                    break;
                }
            }
        }
        // Iterate through the rows in the specified column and replace templates
        let tempp=tbody.rows.length
        for (let i = 0; i <tempp ; i++) {
            const row = tbody.rows[i];
            const cell = row.cells[columnIndex];
            cell.textContent = this.replaceTemplates(cell.textContent, dict);
        }

        MainTable.style.visibility = 'visible';
    }
    static replaceTemplates(text, dict) {
        return text.replace(/{{\s*([^{}]+)\s*}}/g, (match, property) => {
            if (dict.hasOwnProperty(property)) {
                return dict[property];
            } else {
                return '';
            }
        });
    }
}