const getMessageCountLabel = (count, t) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return t('messages.messagesMany');
  }

  if (lastDigit === 1) {
    return t('messages.messagesOne');
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return t('messages.messagesFew');
  }

  return t('messages.messagesMany');
};

export default getMessageCountLabel;
