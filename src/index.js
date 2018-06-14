import { wrapAction } from 'nexusdk';
import twilio from 'twilio';

wrapAction(async (properties) => {
  const { twilio_account, account_sid, body } = properties;
  let { auth_token, from, to } = (twilio_account || {});
  if (!auth_token) ({ auth_token, from, to } = properties);

  const client = new twilio(account_sid, auth_token);

  return await client.messages.create({
    body,
    to,
    from,
  });
});

