
/**
 * 查询片段
 */
export const sqlFragment = {
    user: `
      JSON_OBJECT(
        'id', user.id, 
        'name', user.name, 
        'avatar', IF(COUNT(avatar.id), true, null)
      ) AS user
    `, 

    leftJoinUser: `
    LEFT JOIN user
      ON user.id = posts.userId
    LEFT JOIN avatar
      ON user.id = avatar.userId
    `, 

    totalComments:`
    (
        SELECT 
            COUNT(comment.id)
        FROM 
            comment
        WHERE 
            comment.postId = posts.id
    ) AS totalComments
    `, 
    
    leftJoinOneFile:`
      LEFT JOIN LATERAL (
        SELECT * 
        FROM file 
        WHERE file.postId = posts.id 
        ORDER BY file.id DESC 
        LIMIT 2
      ) AS file ON file.postId = posts.id
    `, 

    file: `
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
    `, 


    leftJoinTag: `
      LEFT JOIN 
        post_tag ON post_tag.postId = posts.id 
      LEFT JOIN
        tag ON post_tag.tagId = tag.id 
    `, 


    tags: `
    CAST(
        IF(
            COUNT(tag.id),
            CONCAT(
                '[', 
                GROUP_CONCAT(
                    DISTINCT JSON_OBJECT(
                        'id', tag.id,
                        'name', tag.name
                    )
                ), 
                ']'
            ),
            NULL
        ) AS JSON
    ) AS tags 
    `, 


   totalLikes: `        
      (
        SELECT COUNT(user_like_post.userId)
        FROM user_like_post
        WHERE user_like_post.postId = posts.id
      ) AS totalLikes`, 
  
  innerJoinUserLikePost: `
    INNER JOIN user_like_post 
     ON user_like_post.postId = posts.id
  `, 

  
      
}