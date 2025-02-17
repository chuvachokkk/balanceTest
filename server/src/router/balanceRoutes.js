const express = require('express');
const { User, sequelize } = require('../../db/models');
const router = express.Router();

router.post('/update-balance', async (req, res) => {
  const { userId, amount } = req.body;

  console.log('Получены данные:', req.body);

  if (!userId || amount === undefined) {
    return res.status(400).json({ error: 'userId и amount обязательны' });
  }

  const transaction = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { 
      transaction,
      lock: true
    });

    if (!user) {
      console.log('Пользователь не найден');
      await transaction.rollback();
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    console.log('Текущий баланс пользователя:', user.balance);

    const newBalance = user.balance + amount;

    console.log('Новый баланс после операции:', newBalance);

    if (newBalance < 0) {
      console.log('Недостаточно средств на балансе');
      await transaction.rollback();
      return res.status(400).json({ error: 'Недостаточно средств на балансе' });
    }

    user.balance = newBalance;
    await user.save({ transaction });

    await transaction.commit();

    return res.json({ balance: user.balance });
  } catch (err) {
    console.error('Ошибка при обработке транзакции:', err);
    await transaction.rollback();
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
