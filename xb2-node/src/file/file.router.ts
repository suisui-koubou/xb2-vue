import express from 'express'
import * as fileController from './file.controller'
import { authGuard } from '../auth/auth.middleware';
import { fileInterceptor, fileProcessor } from './file.middleware';

const router = express.Router(); 

router.post('/files', 
    authGuard, 
    fileInterceptor, 
    fileProcessor, 
    fileController.storeFile
); 


router.get('/files/show/:fileId/', authGuard, fileController.showFile); 

router.get('/files/metadata/:fileId', authGuard, fileController.getMetadata);

/**
 * export router 
 */
export default router; 

