The Humanloop API uses API keys for authentication. Visit your
[API Keys](https://app.humanloop.com/account/api-keys) page to retrieve the
API key you'll use in your requests.

This key allows full access and control over your projects, so keep this secret
and take care to not expose it in any client-side code.

To use your API key, include it under the `X-API-KEY` header in your HTTP request.

```bash
curl https://api.humanloop.com/v5/projects -H 'X-API-KEY: YOUR_API_KEY'
```

If you're using the Python SDK, initialize the client with your API key before
using other SDK methods:

```python
from humanloop import Humanloop
humanloop = Humanloop(api_key="YOUR_API_KEY")
```

If you're using the TypeScript SDK, initialize the client with your API key before
using other SDK methods:

```js
import { Humanloop } from "humanloop";
const humanloop = new Humanloop({apiKey: "YOUR_API_KEY"});
```
