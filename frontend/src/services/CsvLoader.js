export class CsvLoader {
    /**
     * Opens a file selection dialog, allows the user to select a CSV file,
     * reads the file, and returns the parsed data as a Promise.
     *
     * @returns {Promise<string[][]>} A Promise that resolves to a 2D array of strings, 
     * where each inner array represents a row from the CSV file, and each string represents a column value.
     *
     * @throws {Error} If no file is selected or an error occurs while reading/parsing the file.
     */
    static selectAndParseCSV() {
        return new Promise((resolve, reject) => {

            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.csv';

            fileInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (!file) {
                    reject(new Error("Keine Datei ausgewählt"));
                    return;
                }

                const reader = new FileReader();

                reader.onload = function (e) {
                    const csvText = e.target.result;
                    try {
                        const data = CsvLoader.parseCSV(csvText);
                        resolve(data);
                    } catch (error) {
                        reject(new Error("Fehler beim Parsen der CSV-Datei: ", error));
                    }
                };

                reader.onerror = function () {
                    reject(new Error("Fehler beim Lesen der Datei"));
                };

                reader.readAsText(file);
            });

            fileInput.click();
        });
    }

    static parseCSV(csvText) {
        /** @type {string[]} */
        const rows = csvText.split('\n');

        /** @type {string[][]} */
        const data = rows.map(row => row.split(';').map(value => value.trim()));

        // not all lines may have the same ammount of entries --> fill missing with empty strings
        const maxNrOfColumns = Math.max(...data.map(row => row.length));
        const filledData = data.map(row => {
            // Fülle die Zeile mit leeren Strings bis zur maxLength
            return [...row, ...Array(maxNrOfColumns - row.length).fill('')];
        });

        return filledData;
    }
}