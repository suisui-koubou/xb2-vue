import { Request, Response, NextFunction} from "express";
import _ from 'lodash'
import { createFile, findFileById } from './file.service'
import { FileModel } from "./file.model";
import fs from 'fs'
import path from 'path'; 

/**
 * upload files
 */
export const storeFile = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
    // 当前用户(authGuard中间件添加了用户信息)
    const {id: userId} = request.user; 
    const {post: postIdStr} = request.query // 或者 'const postId = request.query.post'

    // 文件信息
    const fileInfo = _.pick(request.file, [
      'originalname', 
      'mimetype', 
      'filename',
      'size'
    ]); 

    try {
      const postId: number = parseInt(postIdStr.toString(), 10); 
      if (Number.isNaN(postId)){ // type number only has NaN and number types. 
        throw new Error("QUERY_STRING_NAN"); 
      }
      const data = await createFile({
          ...fileInfo, 
          userId, 
          postId, 
          ...request.fileMetaData
      }); 
      response.status(201).send(data); 
      // next(); 
    } catch (error){
      next(error); 
    }
}


/**
 * 文件查找功能
 */
export const showFile = async(
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  // 从地址查询字符串(query string)中获取文件id
  const { fileId } = request.params; 
  // 
  try {
    const file = await findFileById(parseInt(fileId, 10)); 
    const { size } = request.query; 

    // 文件名与目录
    let filename = file.filename; 
    let root = 'uploads'; 
    let resized = 'resized'; 

    if (size){
      const imageSizes = ['large', 'medium', 'thumbnail']; 
      if (!imageSizes.some(item => item == size)){
        throw new Error("FILE_NOT_FOUND"); 
      }
    }

    const fileExist = fs.existsSync(
      path.join(root, resized, `${filename}-${size}`), 

    ); 

    if (fileExist){
      file.filename = `${filename}-${size}`; 
      root = path.join(root, resized); 
    }

    // 做出响应
    response.sendFile(file.filename, {
      root, 
      headers:{
        'Content-Type': file.mimetype
      }, 
    })
  } catch(error){
    next(error); 
  }
};


/**
 * 文件信息
 */
export const getMetadata = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  // 文件id
  const { fileId } = request.params; 
  
  try {
    const file = await findFileById(parseInt(fileId, 10)); 
    // 从数据库返回的信息
    const data = _.pick(file, ['id', 'size', 'width', 'height', 'metadata']); 
    response.send(data); 

  } catch(error){
    next(error); 
  }

}