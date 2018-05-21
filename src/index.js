import { wrapAction } from 'nexusdk';
import twilio from 'twilio';

wrapAction((properties, sendMessage) => {
  const { account_sid, auth_token, from, to, body } = properties;

  const client = new twilio(account_sid, auth_token);

  return client.messages.create({
    body,
    to,
    from,
  });
});

