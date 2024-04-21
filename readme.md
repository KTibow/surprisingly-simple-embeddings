# surprisingly simple embeddings

these days, if you research embeddings, all you hear about is language models. these embeddings are great but usually require 5mb or even 100mb of a download to run locally.

turns out we had this figured out a while ago. just

1. tokenize your text
2. assign each token a vector
3. average these vectors based on how common the token is
4. use the average vector as your embedding

here, we use glove's 25d twitter-based token embeddings, but we remove uncommon tokens. that way, when we compress the embeddings, it's under 0.5mb.
