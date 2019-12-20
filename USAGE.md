
# iexcloud

## Usage

Use the npm cli to install as a dependancy into your project

```
npm install --save git+https://git@github.com/arjd/iexcloud
```

then in your .env file add the following keys

```
IEXCLOUD_API_VERSION = "beta"
IEXCLOUD_PUBLIC_KEY = "pk_..."
IEXCLOUD_SECRET_KEY = "sk_..."

# use the pk and sk obtained from your iexcloud account
# make sure the .env file is in your .gitignore file
# do not hard code the keys into your application code
# do not upload the keys to github.
# you can easily change the keys if they become compromised
```

To test that everything installed correctly and the .env file is properly setup you can use the following or similar code

```javascript

const  iex = require( 'iexcloud_api_wrapper' )

const quote = async (sym) => {
    const quoteData = await iex.stocks.quote(sym);
    // do something with returned quote data
    console.log(quoteData)
};

quote("WDC");

//  Quote {
//   symbol: 'WDC',
//   companyName: 'Western Digital Corporation',
//   calculationPrice: 'tops',
//   open: 47.56,
//   openTime: 1550154600850,
//   close: 47.69,
//   closeTime: 1550091600563,
//   high: 48.75,
//   low: 47.43,
//   latestPrice: 47.89,
//   latestSource: 'IEX real time price',
//   latestTime: '11:53:07 AM',
//   latestUpdate: 1550163187646,
//   latestVolume: 2660380,
//   iexRealtimePrice: 47.89,
//   iexRealtimeSize: 1,
//   iexLastUpdated: 1550163187646,
//   delayedPrice: 47.925,
//   delayedPriceTime: 1550162368700,
//   extendedPrice: 47.56,
//   extendedChange: -0.33,
//   extendedChangePercent: -0.00689,
//   extendedPriceTime: 1550189098346,
//   previousClose: 47.69,
//   change: 0.2,
//   changePercent: 0.00419,
//   iexMarketPercent: 0.03971124425833904,
//   iexVolume: 105647,
//   avgTotalVolume: 8340178,
//   iexBidPrice: 47.8,
//   iexBidSize: 100,
//   iexAskPrice: 47.89,
//   iexAskSize: 100,
//   marketCap: 13928854390,
//   week52High: 106.96,
//   week52Low: 33.83,
//   ytdChange: 0.25066151071615267 }
```