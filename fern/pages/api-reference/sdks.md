The Humanloop platform can be accessed through the API or through our Python and TypeScript SDKs.

More code snippets are available in the SDK package pages on [PyPI](https://pypi.org/project/humanloop/) and [NPM](https://www.npmjs.com/package/humanloop).


<Aside>
<Tabs>
<Tab title="Python SDK">

```shell title="Installation"
pip install humanloop
```

```python title="Example usage"
from humanloop import Humanloop

# You need to initialize the Humanloop SDK with your API Keys
humanloop = Humanloop(
    api_key="YOUR_HUMANLOOP_API_KEY",
    openai_api_key="YOUR_OPENAI_API_KEY",
)

complete_response = humanloop.complete(
    project="sdk-example",
    model_config={
      "model": "gpt-3.5-turbo",
      "prompt_template": "Answer the question like Paul Graham from YCombinator.\nQuestion: {{question}}\nAnswer: "
    },
    inputs={"question": "How should I think about competition for my startup?"}
)

print(complete_response.body)
print(complete_response.body["project_id"])
print(complete_response.body["data"][0])
print(complete_response.body["provider_responses"])
```

</Tab>
<Tab title="TypeScript SDK">

```shell title="Installation"
npm i humanloop
```

```typescript title="Example usage"
import { Humanloop } from "humanloop"

const humanloop = new Humanloop({
  apiKey: 'YOUR_HUMANLOOP_API_KEY',
  openaiApiKey: "YOUR_OPENAI_API_KEY",
})

const chatResponse = await humanloop.chat({
  "project": "sdk-example",
  "messages": [
    {
      "role": "user",
      "content": "Write me a song",
    }
  ],
  "model_config": {
    "model": "gpt-4",
    "temperature": 1,
  },
})

console.log(chatResponse)
```

</Tab>
</Tabs>
</Aside>
