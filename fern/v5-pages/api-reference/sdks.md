---
description: Learn how to integrate Humanloop into your applications using our Python and TypeScript SDKs or REST API.
image: https://humanloop.com/assets/docs/social-image.png
---

The Humanloop platform can be accessed through the API or through our Python and TypeScript SDKs.

<Cards>
  <Card
    title="Node/TypeScript ↗"
    icon="fa-brands fa-node"
    icon="fa-brands fa-js"
    href="https://www.npmjs.com/package/humanloop"
  />
  <Card
    title="Python ↗"
    icon="fa-brands fa-python"
    href="https://pypi.org/project/humanloop/"
  />
  
</Cards>

### Usage Examples

<Tabs>

<Tab title="TypeScript SDK">

```shell title="Installation"
npm install humanloop@0.8.0-beta12
```

```typescript title="Example usage"
import { HumanloopClient, Humanloop } from "humanloop";

const humanloop = new HumanloopClient({ apiKey: "YOUR_API_KEY" });

// Check that the authentication was successful
console.log(await humanloop.prompts.list());
```

</Tab>

<Tab title="Python SDK">

```shell title="Installation"
pip install humanloop==0.8.0b17
```

```python title="Example usage"
from humanloop import Humanloop
hl = Humanloop(api_key="<YOUR Humanloop API KEY>")

# Check that the authentication was successful
print(hl.prompts.list())
```

</Tab>
</Tabs>
