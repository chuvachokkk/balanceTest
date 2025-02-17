const axios = require('axios');

const sendRequests = async () => {
  const requests = [];
  for (let i = 0; i < 10000; i++) {
    requests.push(
      axios.post('http://localhost:3000/update-balance', {
        userId: 1,
        amount: -2,
      })
    );
  }

  try {
    const results = await Promise.allSettled(requests);
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Успешных запросов: ${successful}`);
    console.log(`Неудачных запросов: ${failed}`);
  } catch (error) {
    console.error('Ошибка при отправке запросов:', error);
  }
};

sendRequests();
