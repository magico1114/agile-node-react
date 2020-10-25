# agile-node-react

### Installation
```console
cd server
npm i
```
###  Running the server
```console
npm run dev
```
The server will be start at `http://localhost:3000`

## Running Client UI
Open your preferred Browser and go to `http://localhost:3000` to see the list of transactions


## API Usage

GET /transactions

   Response example:
   ```
   [
       {
            "id": "20191206184233379339.34",
            "effectiveDate": "Fri, 25 Oct 2020 18:42:33 GMT",
            "amount": 100,
            "type": "credit"
        },
        {
            "id": "20191206184242812237.86",
            "type": "debit"
            "amount": 30,
            "effectiveDate": "Fri, 25 Oct 2020 18:42:42 GMT",
        }
   ]
   ```
 
POST  /transaction

  Request format:
  ```
  {
    "type": String [credit, debit],
    "amount": Number
  }
  ```

