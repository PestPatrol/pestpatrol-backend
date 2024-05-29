const app = require('./app/web');
const dotenv = require('dotenv');

dotenv.config();

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
