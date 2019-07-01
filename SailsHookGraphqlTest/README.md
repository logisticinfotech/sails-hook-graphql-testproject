npm install graphql express-graphql moment

# Query Examples

## Example 1

{
    customers(populate: [{type: "facilitys"}]){
        CustomerID,
        name:Description,
        facilitys
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

## Example 5 (find specific name )
{
  users(where:{name:"Elijah Homenick"}){
    id
    name
    username
    
  }
}



## Example 6 (find specific name )
{
  users(where:{id: { gt: "40", lte: "45" }}){
    id
    name
    username
    
  }
}
# You can use associate for get specific data 


## Example 7 sort asc desc using fields name
{
  users(sort: "name DESC" ){
    id
    name
    username
    
  }
}

## Example 8 skip first 10 item
{
  users(skip:10){
    id
    name
    username
    
  }
}

## Example 9
{
  users(skip:10,limit:2){
    id
    name
    username
    
  }
}

## Example 10
{
  users(aggregate:["count"],where:{id: { gt: "40", lte: "45" }}){
    count
  }
}

## Example 11 get sum of specific fields
{
  users(aggregate:["sum","id"], where:{id: { gt: "40", lte: "45" }}){
   sum:count
  }
}

## Example 12 (get average of specific where condition)
{
  users(aggregate:["average","id"], where:{id: { gt: "40", lte: "45" }}){
   average:count
  }
}