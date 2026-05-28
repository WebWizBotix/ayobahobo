/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: payfast.js
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-23
 * Last Updated: 2026-05-25
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

function generateSignature(data, passphrase) {
  const fields = [
    'merchant_id',
    'merchant_key',
    'return_url',
    'cancel_url',
    'notify_url',
    'name_first',
    'name_last',
    'email_address',
    'm_payment_id',
    'amount',
    'item_name'
  ];
  
  const queryString = fields
    .map(key => {
      const val = data[key];
      if (val === '' || val === null || val === undefined) {
        return null;
      }
      return `${key}=${encodeURIComponent(String(val).trim()).replace(/%20/g, '+')}`;
    })
    .filter(Boolean)
    .join('&') + (passphrase ? `&passphrase=${encodeURIComponent(passphrase)}` : '');
    
  return md5(queryString);
}

function submitPayment({ amount, itemName, buyerEmail, buyerName }) {
  const nameParts = (buyerName || '').trim().split(/\s+/);
  const name_first = nameParts[0] || '';
  const name_last = nameParts.slice(1).join(' ') || '';
  const orderId = Date.now();

  const data = {
    merchant_id: '34565375',
    merchant_key: 'wzjqtpckgqsck',
    return_url: `https://drop-selling.com/success?item_name=${encodeURIComponent(itemName)}&amount=${amount}&order_id=${orderId}&email=${encodeURIComponent(buyerEmail)}&name=${encodeURIComponent(buyerName || '')}`,
    cancel_url: `https://drop-selling.com`,
    notify_url: `https://drop-selling.com/api/notify`,
    name_first: name_first,
    name_last: name_last,
    email_address: buyerEmail,
    m_payment_id: String(orderId),
    amount: parseFloat(amount).toFixed(2),
    item_name: itemName,
  };
  data.signature = generateSignature(data, 'Dropsellint2026');

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://www.payfast.co.za/eng/process';
  Object.entries(data).forEach(([k, v]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = k;
    input.value = v;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}

console.log("Built by WebWizSystems – Signature: WWZ-AYOBA-SCROLLYTELLING-2026-911");
