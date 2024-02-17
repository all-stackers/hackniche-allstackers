from twilio.rest import Client

account_sid = 'AC9bfcbe0ba32fab4c09b5425fddceace8'
auth_token = '17d8540e3563cbba37ba250ca16184e3'
client = Client(account_sid, auth_token)

message = client.messages.create(
  from_='whatsapp:+14155238886',
  body='Your order for Chessy paneer pizza has been confirmed.',
  to='whatsapp:+919004690126'
)

print(message.sid)