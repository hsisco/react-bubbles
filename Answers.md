Explain what a token is used for.
- By matching with the specific key in the backend, a token allows a user to access information from the backend because it proves they have the appropriate permissions (headers).

What steps can you take in your web apps to keep your data secure?
- Setting up headers that require a token to access, being able to authorize a user via their token, and only rendering a private route if those permissions are passed.

Describe how web servers work.
- Servers store all the data. When a user makes an API call with an authorized token, the server transfers the data back, or sends a request to another server carrying the data and routes the data back to the user.

Which HTTP methods can be mapped to the CRUD acronym that we use when interfacing with APIs/Servers.
- Create (.post)
- Read (.get)
- Update (.put)
- Delete (.delete)