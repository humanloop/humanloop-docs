---
subtitle: In the event an issue occurs with our system, or with one of the model providers we integrate with, our API will raise a predictable and interpretable error.
---

## HTTP error codes

Our API will return one of the following HTTP error codes in the event of an issue:

- **400 Bad request:** Your request was improperly formatted or presented.
- **401 Authentication issue:** Your API key is incorrect or missing, or your user does not have the rights to access the relevant resource.
- **404 Not found:** The requested resource could not be located.
- **422 Un-processable entity:** Your request was properly formatted but contained invalid instructions or did not match the fields required by the endpoint.
- **429 Rate limit reached:** You've exceeded the maximum allowed number of requests in a given time period. 
- **500 Unknown exception:** An unexpected issue occurred on the server.
- **503 Service unavailable:** The service is temporarily overloaded and you should try again.
- **504 Server timeout:** The server did not respond in time.
- **529 Overloaded:** The server is currently overloaded and cannot process your request.

<Aside>
## Error details

Our `/chat` and `/completion` endpoints act as a unified interface across all popular model providers. The error returned by these endpoints may be raised by the model provider's system. 

Details of the error are returned in the `detail` object of the response containing fields for the `type`, `message`, `code` and `origin` of the error. 

The `origin` field indicates if the error originated from one of the integrated model providers systems (e.g. OpenAI, Anthropic, Cohere, etc..), or directly from Humanloop.

For example, for our `/chat ` endpoint where we attempt to call OpenAI with an invalid setting for `max_tokens`, the message returned is that provided by OpenAI and the origin is set to OpenAI. 

```json
{    
  "type": "unprocessable_entity_error",
  "message": "This model's maximum context length is 4097 tokens. However, you requested 10000012 tokens (12 in the messages, 10000000 in the completion). Please reduce the length of the messages or completion.",
  "code": 422,
  "origin": "OpenAI"
}

```
</Aside>
