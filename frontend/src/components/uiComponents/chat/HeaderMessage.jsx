import React from 'react';
import { useTranslation } from 'react-i18next';

const HeaderMessage = ({ channelName = '', countMessage = 0 }) => {
  const { t } = useTranslation();
  console.log('channelName', countMessage);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>{`# ${channelName}`}</b></p>
      <span className="text-muted">
        {t('messages.messageCount.message', { count: countMessage })}
      </span>
    </div>
  );
};

export default HeaderMessage;
