# Day 16 - Comments 

挑战90天独立开发 #26：资源接口

- 根据postId获取内容
- 文章的评论
- 评论被回复的数量
  - left join 
  - subquery 


## 根据PostId获取内容

```sql
  SELECT 
    posts.id, 
    posts.title, 
    posts.content, 
  FROM posts
  WHERE posts.id = ?
```

## 文章的评论数量

### Aggregate Function 

```sql 
SELECT 
    comment.id, 
    comment.content
FROM 
    comment
LEFT JOIN comment commentReply
    ON commentReply.parentId = comment.id
```

The result 

```
+----+--------------------------------------+
| id | content                              |
+----+--------------------------------------+
|  1 | 太好看了                             |
|  1 | 太好看了                             |
|  1 | 太好看了                             |
|  2 | 小莲太美了                           |
|  3 | 如果是辛美尔的话一定会做             |
|  4 | 好诗                                 |
|  5 | 谢谢                                 |
|  6 | 谢谢捧场                             |
|  7 | 最近在忙啥                           |
|  8 | 小白的开发之路                       |
+----+--------------------------------------+
10 rows in set (0.01 sec)
```

remove dulplicates 
(but very slow)

```sql 
SELECT 
    comment.id, 
    comment.content, 
    COUNT(commentReply.id) AS totalReplies
FROM 
    comment
LEFT JOIN comment commentReply
    ON commentReply.parentId = comment.id
GROUP BY comment.id
```

Get the number of replies of a comment, 

```sql
SELECT 
    comment.id, 
    comment.content, 
    COUNT(DISTINCT commentReply.id) AS totalReplies
FROM 
    comment
LEFT JOIN comment commentReply
    ON commentReply.parentId = comment.id
WHERE comment.id = 1
```


### Subquery 

```sql 
SELECT 
    comment.id,
    comment.content, 
    (
        SELECT 
            COUNT(reply.id)
        FROM 
            comment reply
        WHERE 
            reply.parentId = comment.id
    ) AS totalReplies
FROM comment
WHERE comment.id = 1
```




