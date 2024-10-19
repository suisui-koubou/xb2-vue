import { Request, Response, NextFunction } from "express"; 
import _ from 'lodash'; 
import { createAvatar, findAvatarByUserId } from "./avatar.service";
import { connection } from "../app/database/mysql";
import path from 'path'; 
import fs from 'fs'; 

/**
 * 上传头像
 */
export const storeImg = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  // 当前用户id
  const {id: userId} = request.user; 
  // 头像文件信息
  const fileInfo = _.pick(request.file, ['mimetype', 'filename', 'size']); 
  // 准备头像信息
  const avatar = {
    ...fileInfo, 
    userId, 
  }; 

  try {
    const data = await createAvatar(avatar); 
    response.status(201).send(data); 
  } catch (error) {
    next(error); 
  } 

  next(); 
}



/**
 * 头像服务
 */
export const serveAvatar = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  const {userId} = request.params; 

  try {
    const avatar = await findAvatarByUserId(parseInt(userId, 10));
    if (!avatar){
      throw new Error('FILE_NOT_FOUND'); 
    } 
    const {size} = request.query; 

    let filename = avatar.filename; 
    let root = path.join('uploads', 'avatar'); 
    let resized = 'resized'; 
    if (size) {
      const imageSizes = ['large', 'medium', 'small']; 
      // 测试文件大小参数是否正确
      if (!imageSizes.some(item => item == size)){
        throw new Error('FILE_NOT_FOUND'); 
      }
      // 检查文件是否存在
      const fileExist = fs.existsSync(
        path.join(root, resized, `${filename}-${size}`), 
      ); 
      if (!fileExist){
        throw new Error('FILE_NOT_FOUND'); 
      }
      if (fileExist){
        filename = `${filename}-${size}`; 
        root = path.join(root, resized); 
      }
    }
    // 
    response.sendFile(filename, {
      root, 
      headers: {
        'Content-Type': avatar.mimetype, 
      }
    })
  } catch(error){
    next(error); 
  }
}