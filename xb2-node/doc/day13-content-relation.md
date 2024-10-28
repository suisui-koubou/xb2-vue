# Day 13 - Content Relation 

## Post and User 

Show articles with users...

```sql 
SELECT 
    posts.id, 
    posts.title,
    user.id as userId, 
    user.name as userName
FROM posts LEFT JOIN user
ON posts.userId = user.id 
```

Or return user info as an object 

```sql 
SELECT 
    posts.id, 
    posts.title,
    JSON_OBJECT(
        'id', user.id,
        'name', user.name
    ) AS user
FROM posts LEFT JOIN user
ON posts.userId = user.id 
```

## Post and File

A file may have multiple files/images.

```sql
SELECT 
    posts.id,
    posts.title,
    file.id as fileId,
    file.originalname as fileOriginalName
FROM posts LEFT JOIN file 
ON file.postId = posts.id 
```

How about group by id ?

```sql
SELECT 
    posts.id,
    posts.title,
    file.id as fileId,
    file.originalname as fileOriginalName
FROM posts LEFT JOIN file 
ON file.postId = posts.id 
GROUP BY posts.id
```

报错: 
> ERROR 1055 (42000): Expression #3 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'xb2_node.file.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
>

在严格模式下，出现在 SELECT 列表里面的项必须也出现在 GROUP BY 列表里面。

```sql
SELECT 
    posts.id,
    posts.title,
    file.id as fileId,
    file.originalname as fileOriginalName
FROM posts LEFT JOIN file 
ON file.postId = posts.id 
GROUP BY posts.id, file.id, file.originalname
```



Group images in an array (aggregate array)?

```sql
SELECT 
    posts.id,
    posts.title,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', file.id,
            'originalname', file.originalname
        )
    ) AS files
FROM posts LEFT JOIN file 
ON file.postId = posts.id 
GROUP BY posts.id
```

filter null items

```sql
SELECT 
    posts.id,
    posts.title,
    JSON_ARRAYAGG(
        IF(
            file.id, 
            JSON_OBJECT(
                'id', file.id,
                'originalname', file.originalname
            ),  
            NULL 
        )
    ) AS files
FROM posts
LEFT JOIN file ON file.postId = posts.id 
GROUP BY 
    posts.id
``` 


How about a full articles?

```sql
SELECT 
    posts.id,
    posts.title,
    JSON_OBJECT(
        'id', user.id,
        'name', user.name
    ) AS user, 
    JSON_ARRAYAGG(
        IF(
            file.id, 
            JSON_OBJECT(
                'id', file.id,
                'originalname', file.originalname
            ),  
            NULL 
        )
    ) AS files
FROM posts
LEFT JOIN file ON file.postId = posts.id 
LEFT JOIN user ON post.userId = user.id 
GROUP BY posts.id
```


## Comment and User 


```sql 
SELECT 
    comment.id, 
    comment.content, 
    posts.id AS postId, 
    posts.title AS postTitle, 
    user.id AS userId, 
    user.name AS userName
FROM 
    comment 
LEFT JOIN 
    user ON comment.userId = user.id 
LEFT JOIN
    posts ON comment.postId = posts.id 
```

## Post and Tag 

```sql
SELECT 
    posts.id,
    posts.title,
    tag.name AS tagName
FROM 
    posts
LEFT JOIN 
    post_tag ON posts.id = post_tag.postId
LEFT JOIN
    tag ON post_tag.tagId = tag.id 
```

```sql
SELECT 
    posts.id,
    posts.title,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', tag.id,
            'name', tag.name
        )
    ) AS tags
FROM 
    posts
LEFT JOIN 
    post_tag ON posts.id = post_tag.postId
LEFT JOIN
    tag ON post_tag.tagId = tag.id 
GROUP BY 
    posts.id
```

```sql
SELECT 
    posts.id,
    posts.title,
    JSON_ARRAYAGG(
        IF(
            tag.id,
            JSON_OBJECT(
                'id', tag.id,
                'name', tag.name
            ), 
            NULL
        )
    ) AS tags
FROM 
    posts
LEFT JOIN 
    post_tag ON posts.id = post_tag.postId
LEFT JOIN
    tag ON post_tag.tagId = tag.id 
GROUP BY 
    posts.id
```


## Post and Comments 

```sql
SELECT * 
FROM posts
LEFT JOIN comment
ON comment.postId = posts.id
```

再试试合并 comments 

```sql
SELECT 
    posts.id, 
    posts.title, 
    COUNT(comment.id) AS totalComments 
FROM posts
LEFT JOIN comment
ON comment.postId = posts.id
GROUP BY 
    posts.id
```


子查询

```sql
SELECT 
    post.id,
    post.title,
    (
        SELECT 
            COUNT(comment.id)
        FROM 
            comment
        WHERE 
            comment.postId = post.id
    ) AS totalComments
FROM post
```  



