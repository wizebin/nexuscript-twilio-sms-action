import { wrapAction } from 'nexusdk';
import twilio from 'twilio';
import { get, getTypeString } from 'objer';

function formatNumber(number) {
  const typeString = getTypeString(number);
  if (typeString === 'string') {
    const justNumbers = number.replace(/\D/g, '');
    if (justNumbers.length === '12223334444'.length) {
      return `+${justNumbers}`;
    } else if (justNumbers.length === '2223334444'.length) {
      return `+1${justNumbers}`;
    }
    throw new Error(`Malformed phone number ${number} ${justNumbers}`);
  }
  throw new Error(`Somehow passed phone number is not a string but is instead ${typeString}`);
}

wrapAction(async (properties) => {
  const { account_sid, auth_token, from } = get(properties, ['accounts', 'twilio_account', 'auth']) || {};
  const { to, body } = get(properties, ['data']) || {};

  const client = new twilio(account_sid, auth_token);

  return await client.messages.create({
    body,
    to: formatNumber(to),
    from: formatNumber(from),
  });
});

