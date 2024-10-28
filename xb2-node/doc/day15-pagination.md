# Day 15 - Pagination 

The server will not send all posts to the client. 

It sends a part of them. 

## Number of posts 

```sql 
SELECT COUNT(posts.id)
FROM posts
```

It returns 

```
+-----------------+
| COUNT(posts.id) |
+-----------------+
|               4 |
+-----------------+
1 row in set (0.00 sec)
```


## LIMIT and OFFSET clause 

```sql 
SELECT 
    posts.id, 
    posts.title
FROM 
    posts 
LIMIT 2
OFFSET 2 
```

The result 

```
+----+-----------------------+
| id | title                 |
+----+-----------------------+
|  3 | 孤独摇滚              |
|  4 | 人形天使电脑心        |
+----+-----------------------+
2 rows in set (0.00 sec)
```



