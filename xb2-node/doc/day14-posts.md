# Day 14 Posts 

## Post and Comments 

### Aggregate Function 

Using the group by aggregate function. 

```sql 
SELECT 
    posts.id,
    posts.title, 
    COUNT(comment.id) AS totalComments 
FROM 
    posts
LEFT JOIN comment
    ON comment.postId = posts.id 
GROUP BY 
    posts.id 
```

```
+----+-----------------------+---------------+
| id | title                 | totalComments |
+----+-----------------------+---------------+
|  1 | 咒术回战              |             1 |
|  2 | 葬送的芙莉莲          |             0 |
|  3 | 孤独摇滚              |             2 |
|  4 | 人形天使电脑心        |             0 |
+----+-----------------------+---------------+
4 rows in set (0.01 sec)
```

### Subquery 

The subquery can achieve the same outcomes computed by aggregate functions. 

```sql 
SELECT 
    posts.id, 
    posts.title, 
    (
        SELECT 
            COUNT(comment.id)
        FROM 
            comment
        WHERE 
            comment.postId = posts.id
    ) AS totalComments
FROM 
    posts
```

```
+------+-----------------------+---------------+
| id   | title                 | totalComments |
+------+-----------------------+---------------+
|    1 | 咒术回战              |             1 |
|    2 | 葬送的芙莉莲          |             0 |
|    3 | 孤独摇滚              |             2 |
|    4 | 人形天使电脑心        |             0 |
+------+-----------------------+---------------+
4 rows in set (0.00 sec)
```


## Posts and Images/Files  

List all files in a post 

```sql 
SELECT 
    * 
FROM 
    posts 
LEFT JOIN file 
    ON file.postId = posts.id 
```

Group files with the same post id 

```sql 
SELECT 
    posts.id, 
    posts.title, 
    JSON_ARRAYAGG(file.id) AS files
FROM 
    posts
LEFT JOIN file 
    ON file.postId = posts.id 
GROUP BY 
    posts.id 
```


```
+----+-----------------------+------------------+
| id | title                 | files            |
+----+-----------------------+------------------+
|  1 | 咒术回战              | [16, 17, 18]     |
|  2 | 葬送的芙莉莲          | [19, 20, 21, 22] |
|  3 | 孤独摇滚              | [23, 24]         |
|  4 | 人形天使电脑心        | [null]           |
+----+-----------------------+------------------+
4 rows in set (0.00 sec)
```


There are duplicated items 
(a post may have many comments/rows)

```sql 
SELECT 
    posts.id, 
    posts.title, 
    JSON_ARRAYAGG(file.id) AS files
FROM 
    posts
LEFT JOIN file 
    ON file.postId = posts.id 
LEFT JOIN comment
    ON comment.postId = posts.id 
GROUP BY 
    posts.id 
```

```
+----+-----------------------+------------------+
| id | title                 | files            |
+----+-----------------------+------------------+
|  1 | 咒术回战              | [16, 17, 18]     |
|  2 | 葬送的芙莉莲          | [19, 20, 21, 22] |
|  3 | 孤独摇滚              | [23, 23, 24, 24] |
|  4 | 人形天使电脑心        | [null]           |
+----+-----------------------+------------------+
4 rows in set (0.00 sec)
```


Distinct files 

```sql 
SELECT 
    posts.id,
    posts.title, 
    GROUP_CONCAT(DISTINCT file.id) AS files 
FROM 
    posts 
LEFT JOIN file 
    ON file.postId = posts.id 
LEFT JOIN comment 
    ON comment.postId = posts.id
GROUP BY 
    posts.id
```

```
+----+-----------------------+-------------+
| id | title                 | files       |
+----+-----------------------+-------------+
|  1 | 咒术回战              | 16,17,18    |
|  2 | 葬送的芙莉莲          | 19,20,21,22 |
|  3 | 孤独摇滚              | 23,24       |
|  4 | 人形天使电脑心        | NULL        |
+----+-----------------------+-------------+
4 rows in set (0.00 sec)
```

Limit the number of files in a post 

(for example, we need to show the first image of a post)

```sql 
SELECT 
    posts.id,
    posts.title, 
    GROUP_CONCAT(DISTINCT file.id) AS files 
FROM 
    posts 
LEFT JOIN (
    SELECT * 
    FROM file 
    WHERE file.postId = posts.id 
    ORDER BY file.id DESC 
    LIMIT 1 
) AS file
    ON file.postId = posts.id
LEFT JOIN comment 
    ON comment.postId = posts.id
GROUP BY 
    posts.id
```

It reports the error 

```
ERROR 1054 (42S22): Unknown column 'posts.id' in 'where clause'
```

Add the keyword `LATERAL` to the subquery 

```sql
SELECT 
    posts.id,
    posts.title, 
    GROUP_CONCAT(DISTINCT file.id) AS files 
FROM 
    posts 
LEFT JOIN LATERAL (
    SELECT * 
    FROM file 
    WHERE file.postId = posts.id 
    ORDER BY file.id DESC 
    LIMIT 1 
) AS file
    ON file.postId = posts.id
LEFT JOIN comment 
    ON comment.postId = posts.id
GROUP BY 
    posts.id
```


```
+----+-----------------------+-------+
| id | title                 | files |
+----+-----------------------+-------+
|  1 | 咒术回战              | 18    |
|  2 | 葬送的芙莉莲          | 22    |
|  3 | 孤独摇滚              | 24    |
|  4 | 人形天使电脑心        | NULL  |
+----+-----------------------+-------+
4 rows in set (0.00 sec)
```

Show more information of a file 

```sql 
SELECT 
    posts.id,
    posts.title, 
    CAST(
        IF(
            COUNT(file.id),
            GROUP_CONCAT(
                DISTINCT JSON_OBJECT(
                    'id', file.id,
                    'width', file.width, 
                    'height', file.height
                )
            ),
            NULL
        ) AS JSON
    ) AS files 
FROM 
    posts 
LEFT JOIN LATERAL (
    SELECT * 
    FROM file 
    WHERE file.postId = posts.id 
    ORDER BY file.id DESC 
    LIMIT 1 
) AS file
    ON file.postId = posts.id
LEFT JOIN comment 
    ON comment.postId = posts.id
GROUP BY 
    posts.id
```

```
+----+-----------------------+-------------------------------------------+
| id | title                 | files                                     |
+----+-----------------------+-------------------------------------------+
|  1 | 咒术回战                | {"id": 18, "width": 700, "height": 622}   |
|  2 | 葬送的芙莉莲             | {"id": 22, "width": 764, "height": 1080}  |
|  3 | 孤独摇滚                | {"id": 24, "width": 2048, "height": 1826} |
|  4 | 人形天使电脑心           | NULL                                      |
+----+-----------------------+-------------------------------------------+
4 rows in set (0.00 sec)
```


Show a list of files 

```sql 
SELECT 
    posts.id,
    posts.title, 
    CAST(
        IF(
            COUNT(file.id),
            CONCAT(
                '[', 
                GROUP_CONCAT(
                    DISTINCT JSON_OBJECT(
                        'id', file.id,
                        'width', file.width, 
                        'height', file.height
                    ) ORDER BY file.id DESC
                ), 
                ']'
            ),
            NULL
        ) AS JSON
    ) AS files 
FROM 
    posts 
LEFT JOIN LATERAL (
    SELECT * 
    FROM file 
    WHERE file.postId = posts.id 
    ORDER BY file.id DESC 
    LIMIT 2
) AS file
    ON file.postId = posts.id
LEFT JOIN comment 
    ON comment.postId = posts.id
GROUP BY 
    posts.id
```

regenerate a list 

```
+----+-----------------------+----------------------------------------------------------------------------------------+
| id | title                 | files                                                                                  |
+----+-----------------------+----------------------------------------------------------------------------------------+
|  1 | 咒术回战              | [{"id": 18, "width": 700, "height": 622}, {"id": 17, "width": 1280, "height": 853}]    |
|  2 | 葬送的芙莉莲          | [{"id": 22, "width": 764, "height": 1080}, {"id": 21, "width": 1659, "height": 1037}]  |
|  3 | 孤独摇滚              | [{"id": 24, "width": 2048, "height": 1826}, {"id": 23, "width": 3456, "height": 2160}] |
|  4 | 人形天使电脑心        | NULL                                                                                   |
+----+-----------------------+----------------------------------------------------------------------------------------+
4 rows in set (0.00 sec)
```


## Order Posts by Dates and Comments


### Order By Most Comments 


```sql
SELECT 
    posts.id,
    posts.title, 
    (
        SELECT COUNT(comment.id)
        FROM comment
        WHERE comment.postId = posts.id
    ) AS totalComments 
FROM 
    posts
ORDER BY 
    totalComments DESC 
```


## Post and User 

```sql
SELECT 
    posts.id,
    posts.title,
    user.name
FROM posts 
LEFT JOIN user
    ON post.userId = user.id 
WHERE user.name = ‘李白’
```


## Post and Tags 

```sql 
SELECT 
    posts.id,
    posts.title, 
    JSON_ARRAYAGG(tag.name) AS tags
FROM 
    posts
LEFT JOIN post_tag ON post_tag.postId = posts.id 
LEFT JOIN tag ON post_tag.tagId = tag.id 
GROUP BY posts.id 
```


