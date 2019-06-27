npm install graphql express-graphql moment

# Query Examples

## Example 1

{customers(populate: [{type: "facilitys"}]){CustomerID,name:Description,facilitys}}


## Example 2

{
    users(populate: [{type: "tweets"}], limit: 1)
    {
        id,
        myname:name,
        tweets
    }
}

## Example 3 
{
    users(populate: [{type: "tweets",criteria:{limit:2}}], limit: 1)
    {
        id,
        myname:name,
        tweets
    }
}

## Example 4
{
    users(populate: [{type: "tweets",criteria:{where:{id:20},limit:2}}], limit: 1)
    {
        id,
        myname:name,
        tweets
    }
}