import { Request, Response, NextFunction, request } from 'express';
import { getPosts, createPost, updatePost, getPostById, getPostsTotalCount} from './post.service';
import _ from 'lodash'
import { getTagByName, createTag, postHasTag, createPostTag, deletePostTagImp} from '../tag/tag.service'
import { TagModel } from 'src/tag/tag.model';

/**
 * 内容列表
 */
export const index = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const totalCount = await getPostsTotalCount({
      filter: request.mFilter
    }); 
    // 设置响应头部
    response.header("X-Total-Count", totalCount); 
  } catch(error){
    next(error); 
  }
 
  try {
    const posts = await getPosts({
      sort: request.sortBy,
      filter: request.mFilter,
      pagination: request.pagination
    }); // 拓展 request 的类型(再 types/express.d.ts 添加)
    response.send(posts);
  } catch (error){
    next(error); 
  }
};


/**
 * 创建内容
 */
export const storePost = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  // 准备逐句
  const {title, content} = request.body; 
  const {id: userId} = request.user; 
  // 创建内容
  try{
    const data = await createPost({title, content, userId}); 
    response.status(201).send(data); 
  }catch(error){
    next(error); 
  }
}

/**
 * 更新内容
 */
export const changePost = async(
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  const {postId} = request.params; 
  const newPost = _.pick(request.body, ['title', 'content', 'id']); 

  try{
    console.log("正在修改", postId); 
    const data = await updatePost(parseInt(postId, 10), newPost); 
    response.send(data); 
    next(); 
  }catch(error){
    next(error); 
  }
}


export const storePostTag = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  const {postId} = request.params; 
  const {name} = request.body; 

  let tag: TagModel; 

  try {
    tag = await getTagByName(name); 
  } catch(error){
    return next(error); 
  }

  // 找到标签，验证标签
  if (tag){
    try {
      const postTag = await postHasTag(parseInt(postId, 10), tag.id);
      if (postTag) return next(new Error("POST_ALREADY_HAS_THIS_TAG"));  
    } catch(error){
      return next(error); 
    }
  }

  // 没有标签，创建一个文章-标签的记录
  if (!tag){
    try {
      const data = await createTag({name}); 
      tag = {id: data.insertId}; // 因为返回 data 是 any, 所以 TypeScript 不会报错
    } catch (error){
      return next(error); 
    }
  }

  // 给内容打上标签
  try {
    await createPostTag(parseInt(postId, 10), tag.id); 
    response.sendStatus(201); 
  } catch(error){
    return next(error); 
  } 
}


export const deletePostTag = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  // 准备数据
  const { postId } = request.params; 
  const { tagId } = request.body; 
  // 移除内容标签
  try {
    await deletePostTagImp(parseInt(postId, 10), tagId);
    response.sendStatus(201);  
  } catch(error){
    next(error); 
  } 

}



/**
 * 单个内容
 */
export const showPostById = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {  
  // 准备数据
  const { postId } = request.params; 

  // 调取内容
  try {
    const post = await getPostById(parseInt(postId, 10)); 
    response.status(201).send(post); 
  } catch(error) {
    next(error); 
  }
}

