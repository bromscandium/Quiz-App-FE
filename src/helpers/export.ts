/**
 * Download a Blob as a file
 */
export const downloadBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

/**
 * Download data as JSON file
 */
export const downloadJSON = (data: any, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  downloadBlob(blob, filename);
};

/**
 * Download data as CSV file
 */
export const downloadCSV = (
  data: Record<string, any>[],
  filename: string,
  headers?: string[]
) => {
  if (!data.length) return;

  const keys = headers ?? Object.keys(data[0]);
  const csvContent =
    keys.join(',') +
    '\n' +
    data
      .map((row) =>
        keys
          .map((key) => {
            const value = row[key] ?? '';
            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            const stringValue = String(value).replace(/"/g, '""');
            return stringValue.includes(',') ||
              stringValue.includes('"') ||
              stringValue.includes('\n')
              ? `"${stringValue}"`
              : stringValue;
          })
          .join(',')
      )
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, filename);
};
