// Create function Number Formatting with Commas for Thousands
export const numberWithCommas = (num: number) => {
  const formattedNumber = num.toLocaleString('en-US', {
    style: 'decimal', // currency, percent, decimal
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return formattedNumber
}

// Create function Date Formatting for d/m/Y
export const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString('en-GB')
  return formattedDate
}

// Date Formatting for ISO without Milliseconds
export const formatDateToISOWithoutMilliseconds = (date: any) => {
  return date.toISOString().replace(/\.\d{3}Z$/, '');
}
