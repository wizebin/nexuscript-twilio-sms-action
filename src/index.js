import { wrapAction } from 'nexusdk';
import twilio from 'twilio';

wrapAction(async (properties, sendMessage) => {
  const { account_sid, auth_token, from, to, body } = properties;

  const client = new twilio(account_sid, auth_token);

  return await client.messages.create({
    body,
    to,
    from,
  });
});

