## BTC-Checker

This is a Bitcoin average price checker.

It checks if bitcoin averange price in PLN changed more than X PLN at every minute past every hour from 8 through 22.

It uses `simple_averange` API from: http://bitcoinaverage.pl/naszeapi/ 

## Configuration

Edit `./mailerConfigExample.json` and save as `./mailerConfig.json` if you want to receive mails with BTC price report.

```
{
  "host": "smtp.example.com",
  "port": 587,
  "secure": false,
  "auth": {
    "user": "user@example.com",
    "pass": "secretUserPassword"
  },
  "sendFromName": "BTC Checker",
  "sendTo": "sendToAddress@mail.com"
}


```

## Installation and run

Install dependencies
```
npm install
```

Run application
```
npm run start
```

## Todo
* Frontend :)

