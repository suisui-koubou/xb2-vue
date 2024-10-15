import { connection } from "../app/database/mysql";
import { FileModel } from "./file.model";
import path from 'path'; 
import Jimp from "jimp";

/**
 * 储存文件信息
 */
export const createFile = async (
    file: FileModel
) => {
    // 准备查询
    const statement = `
        INSERT INTO file 
        SET ?
    `; 
    // 执行查询(MySQL connection), [data] 代表从数据中取 data 这一部分。
    const [data] = await connection.promise().query(statement, file); 
    return data; 
}; 


/**
 * 按照 fileId 查找文件
 */
export const findFileById = async (
    fileId: number
) => {
    const statement = `
        SELECT *
        FROM file
        WHERE id = ?
    `;

    const [ data ] = await connection.promise().query(statement, fileId); 
    
    // 一般 select 返回的是数组，但是只有一个匹配。
    return data[0]; 
}


export const imageResizer = async (
    image: Jimp, 
    file: Express.Multer.File
) => {
    const { imageSize } = image['_exif']; 
    const filePath = path.join(file.destination, 'resized', file.filename); 
    // 大尺寸
    if (imageSize.width > 1280){
        image.resize(1280, Jimp.AUTO)
             .quality(85)
             .write(`${filePath}-large`); 
    }
    // 中尺寸
    if (imageSize.width > 640){
        image.resize(640, Jimp.AUTO)
                .quality(85)
                .write(`${filePath}-medium`); 
    }
    // 小尺寸
    if (imageSize.width > 320){
        image.resize(320, Jimp.AUTO)
                .quality(85)
                .write(`${filePath}-thumbnail`); 
    }


}