---
subtitle: In the event an issue occurs with our system, or with one of the model providers we integrate with, our API will raise a predictable and interpretable error.
description: This page provides a list of the error codes and messages you may encounter when using the Humanloop API.
---

### HTTP error codes

Our API will return one of the following HTTP error codes in the event of an issue:

<AccordionGroup>

<Accordion title="400 Bad request">
Your request was improperly formatted or presented.
</Accordion>

<Accordion title="401 Authentication issue">
Your request was improperly formatted or presented.
</Accordion>

<Accordion title="400 Bad request">
Your API key is incorrect or missing, or your user does not have the rights to access the relevant resource.
</Accordion>

<Accordion title="404 Not found">
The requested resource could not be located.
</Accordion>

<Accordion title="422 Unprocessable entity">
Your request was properly formatted but contained invalid instructions or did not match the fields required by the endpoint.
</Accordion>

<Accordion title="429 Rate limit reached">
You've exceeded the maximum allowed number of requests in a given time period.
</Accordion>

<Accordion title="500 Unknown exception">
An unexpected issue occurred on the server.
</Accordion>

<Accordion title="503 Service unavailable">
The service is temporarily overloaded and you should try again.
</Accordion>

</AccordionGroup>

## Error details

Our `prompt/call` endpoint acts as a unified interface across all popular model providers. The error returned by this endpoint may be raised by the model provider's system. Details of the error are returned in the `detail` object of the response.

```json
{
  "type": "unprocessable_entity_error",
  "message": "This model's maximum context length is 4097 tokens. However, you requested 10000012 tokens (12 in the messages, 10000000 in the completion). Please reduce the length of the messages or completion.",
  "code": 422,
  "origin": "OpenAI"
}
```
