const EXCHANGE_URL = `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_API_KEY}`;

export const exchangeRateUsdtoIdr = async ({ amount }: { amount: number }) => {  
  try {
    const response = await fetch(`${EXCHANGE_URL}/pair/USD/IDR/${amount}`);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { 
        error: false, 
        message: "Success get exchange rate.", 
        conversionRate: responseJson.conversion_rate, 
        conversionResult: responseJson.conversion_result 
      };
    }

    return { error: true, message: "Failed to get exchange rate. Please try again later." };
  } catch (error) { 
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
    }
  }
};
