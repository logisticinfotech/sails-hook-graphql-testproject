npm install graphql express-graphql moment

# Query Examples

## Example 1

{
    customers(populate: [{type: "facilitys"}])
    {
        CustomerID,
        name:Description,facilitys

    }
}


## Example 2

{
    users(populate: [{type: "tweets"}], limit: 1)
    {
        id,
        myname:name,
        tweets
    }
}
