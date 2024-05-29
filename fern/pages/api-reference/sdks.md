The Humanloop platform can be accessed through the API or through our Python and TypeScript SDKs.

<Cards>
  <Card
    title="Python ↗"
    icon="fa-brands fa-python"
    href="https://pypi.org/project/humanloop/"
  />
  <Card
    title="JavaScript/TypeScript ↗"
    description="Coming soon"
    icon="fa-brands fa-js"
    target="_blank"
    href="https://www.npmjs.com/package/humanloop"
  />
</Cards>

### Usage Examples

<Tabs>
<Tab title="Python SDK">

```shell title="Installation"
pip install humanloop
```

```python title="Example usage"
from humanloop import Humanloop

humanloop = Humanloop(
    api_key="YOUR_API_KEY",
    openai_api_key="YOUR_OPENAI_API_KEY",
)

chat_response = humanloop.chat(
    project="sdk-example",
    messages=[
        {
            "role": "user",
            "content": "Explain asynchronous programming.",
        }
    ],
    model_config={
        "model": "gpt-3.5-turbo",
        "max_tokens": -1,
        "temperature": 0.7,
        "chat_template": [
            {
                "role": "system",
                "content": "You are a helpful assistant who replies in the style of {{persona}}.",
            },
        ],
    },
    inputs={
        "persona": "Jeff Dean",
    },
    stream=False,
)
print(chat_response)
```

</Tab>
<Tab title="TypeScript SDK">

```shell title="Installation"
npm i humanloop
```

```typescript title="Example usage"
import { Humanloop } from "humanloop";

const humanloop = new Humanloop({
  apiKey: "YOUR_HUMANLOOP_API_KEY",
  openaiApiKey: "YOUR_OPENAI_API_KEY",
});

const chatResponse = await humanloop.chat({
  project: "sdk-example",
  messages: [
    {
      role: "user",
      content: "Write me a song",
    },
  ],
  model_config: {
    model: "gpt-4",
    temperature: 1,
  },
});

console.log(chatResponse);
```

</Tab>
</Tabs>
