import { wrapAction } from 'nexusdk';
import twilio from 'twilio';

wrapAction(async (properties) => {
  const { data, accounts } = properties;
  const { account_sid, body } = (data || {});
  const { twilio_account } = (accounts || {});
  let { auth_token, from, to } = (twilio_account || {});
  if (!auth_token) ({ auth_token, from, to } = (data || {}));

  const client = new twilio(account_sid, auth_token);

  return await client.messages.create({
    body,
    to,
    from,
  });
});

